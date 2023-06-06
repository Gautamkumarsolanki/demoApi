import {initializeApp} from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
    authDomain: "evfi-prod.firebaseapp.com",
    databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "evfi-prod",
    storageBucket: "evfi-prod.appspot.com",
    messagingSenderId: "758735537136",
    appId: "1:758735537136:web:f0cec73edea6123e55d335"
};

const app = initializeApp(firebaseConfig);
export default app;