import { auth, db } from './firebase';

export const loginUser = async (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const getUser = (id: string) => {
  return db.collection('Users').where('userID', '==', id).get();
};
