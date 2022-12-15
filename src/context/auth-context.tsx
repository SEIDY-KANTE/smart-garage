import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import IUser from '../models/User/IUser';
import User from '../models/User/User';
import { auth } from '../store/Auth/firebase';
import {
  getUser,
  loginUser,
  logoutUser,
  saveUser,
  signupUser,
} from '../store/Auth/auth';
import { ErrorMessages } from '../components/Auth/ErrorMessages';

interface IAuthContext {
  currentUser: IUser | null;
  isLoggedIn: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  isLoggedIn: false,
  error: null,
  login: (email, password) => {},
  signup: (email, password, username) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: FC<{ children: ReactNode }> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningup, setIsSigningup] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userID, setUserID] = useState('');
  const [signupInfo, setSignUpInfo] = useState({ email: '', username: '' });

  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(ErrorMessages.invalidCredentials);
      setIsLoggedIn(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    await signupUser(email, password);
    setSignUpInfo({ email, username });
    setIsSigningup(true);
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const retrieveUser = async () => {
    try {
      getUser(userID)
        .then((snapshot: any) => {
          const { email, username, isAdmin, isAuthorized } =
            snapshot?.docs[0]?.data();

          const loggedInUser = new User({
            uid: userID,
            username,
            email,
            isAdmin,
            isAuthorized,
          });

          setCurrentUser(loggedInUser);
          setIsLoggedIn(true);
          console.log('Logged in user: ', loggedInUser);
        })
        .catch((error) => {
          console.log(error);
          console.log("Couldn't get user data");
          setError(ErrorMessages.invalidCredentials);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user: any) => {
      if (user) {
        const userID = user.uid;
        setUserID(userID);

        if (!isSigningup) {
          retrieveUser();
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscriber();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isSigningup) return;

    saveUser(userID, signupInfo.email, signupInfo.username);

    retrieveUser();
  }, [isSigningup]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        error,
        login,
        signup,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
