// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD3GEhswTLoA8rIimbmnqZ2CPy7YSJLGnY',
  authDomain: 'crypto-portfolio-687d3.firebaseapp.com',
  projectId: 'crypto-portfolio-687d3',
  storageBucket: 'crypto-portfolio-687d3.appspot.com',
  messagingSenderId: '927067212519',
  appId: '1:927067212519:web:b5d0791c7705423d163042',
  measurementId: 'G-53C6P1XZK7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
