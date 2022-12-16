import { auth, db } from '../firebase';

export const loginUser = async (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signupUser = async (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const logoutUser = async () => {
  auth.signOut();
};

export const getUser = (id: string) => {
  return db.collection('users').where('userID', '==', id).get();
};

export const saveUser = async (
  userID: string,
  email: string,
  username: string
) => {
  await db
    .collection('users')
    .add({
      email,
      isAdmin: false,
      isAuthorized: false,
      userID,
      username,
    })
    .then(() => {
      console.log('user added' + userID);
    })
    .catch((err) => {
      console.log(err);
    });
};
