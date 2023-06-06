import {getAuth,signInWithPhoneNumber,RecaptchaVerifier} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
  authDomain: "evfi-prod.firebaseapp.com",
  databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "evfi-prod",
  storageBucket: "evfi-prod.appspot.com",
  messagingSenderId: "758735537136",
  appId: "1:758735537136:web:f0cec73edea6123e55d335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
auth.languageCode='it';
window.recaptchaVerifier=new RecaptchaVerifier("recaptcha-container",{
    size:"normal",
    callback:function(response){
        submitPhoneNumberAuth();
    }
})
signInWithPhoneNumber(auth,"+919142264415")