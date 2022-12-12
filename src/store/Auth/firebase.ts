import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDfpht_Rk1IdzDt9FdoA3Dc10-kkOkOmhg',
  authDomain: 'smart-garage-iot.firebaseapp.com',
  projectId: 'smart-garage-iot',
  storageBucket: 'smart-garage-iot.appspot.com',
  messagingSenderId: '76294785745',
  appId: '1:76294785745:web:e6990656535c5db770d3f0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
