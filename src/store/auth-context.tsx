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
import { auth } from './Auth/firebase';
import { getUser, loginUser } from './Auth/auth';
import { ErrorMessages } from '../components/Auth/ErrorMessage';

interface IAuthContext {
  currentUser: IUser | null;
  isLoggedIn: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
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
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Logging in...');
    console.log(email, password);
    try {
      await loginUser(email, password);
    } catch (error) {
      setError(ErrorMessages.invalidCredentials);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    await login(email, password);
  };

  const logout = () => {
    // setIsLoggedIn(false);
    // setUser(null);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setIsLoggedIn(true);

        const userID = user.uid;
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
            console.log('Logged in user: ', loggedInUser);
          })
          .catch((error) => {
            console.log(error);
            console.log("Couldn't get user data");
            setError(ErrorMessages.invalidCredentials);
          });
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    return () => subscriber();
  }, [auth]);

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
