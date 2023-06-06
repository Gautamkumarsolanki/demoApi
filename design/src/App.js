import { initializeApp } from "firebase/app";
import { useState } from 'react';

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

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
const auth = getAuth(app);

function App() {
  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: function (response) {
        submitPhoneNumberAuth();
      }
    }, auth);
  }
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(1);
  const submitPhoneNumberAuth = () => {
    let phone = document.getElementById('phone').value;
    phone = "+91" + phone;
    configureCaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setVisible(1)
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("Wrong");
      })
  }
  const submitCode = () => {
    let code = document.getElementById("codes").value;
    console.log(code);
    window.confirmationResult.confirm(code)
      .then((result) => {
        let user = result.user;
        console.log(user.uid);
        // get the uid encrypt with jwt send to save in the database
        window.alert("user verified successfully");
        setVisible(2);
      })
      .catch((error) => {
        console.log("error");
      })
  }
  return (
    <>
      <div className="flex container mx-auto justify-center">
        <div className="relative top-24 justify-between flex flex-col shadow-md shadow-gray-600 bg-gray-800 h-100 w-96 rounded-lg border-yellow-400 p-8">
          <img alt="img.." className="border-2 ml-28 border-yellow-500 rounded-lg p-2 w-12 h-12 ml-32" src={require('./light.png')} />
          <div className={`space-y-10 ${(visible === 2) ? "hidden" : "block"}`}>
            <p className="text-white text-2xl font-bold">&nbsp;&nbsp;&nbsp;Start Your Journey With<br /><span className="m-28 text-yellow-300">&nbsp;&nbsp;EVFI</span></p>
            <div className={`flex flex-col space-y-4  ${(visible === 0) ? "block" : "hidden"}`}>
              <label htmlFor="name" className="text-white space-y-2">Enter phone number </label>
              <div className="flex flex-row ">
                <div className="rounded-lg border-2 border-gray-800 rounded-r-none p-0.5 text-lg bg-slate-50 h-8 w-10">
                  +91
                </div>
                <input onChange={(e) => {
                  setPhone(e.target.value)
                }} className="tracking-widest pl-2 text-xl w-72 border-2 border-gray-800 border-l-0 rounded-lg rounded-l-none h-8 focus:border-2 focus:border-yellow-500 outline-none text-lg" maxLength="10" id="phone" name="phone" type="tel" ></input>
              </div>
              <div className="ml-3" id="recaptcha-container"></div>
              <button onClick={(e) => {
                submitPhoneNumberAuth();
              }} className="text-gray m-24 text-lg hover:bg-amber-400 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-yellow-400 font-semibold rounded-full h-8 w-32 bg-yellow-400">Get OTP</button>
            </div>

            <div className={`flex flex-col space-y-4 ${(visible === 1) ? "block" : "hidden"} `}>
              <p className="text-slate-100 text-sm">Enter 6-digit OTP that has been sent to +91***{phone[7] + "" + phone[8] + "" + phone[9]}</p>
              <input id="codes" className="ml-24 h-8 w-28 text-xl rounded-md tracking-widest pl-4" type="text" maxLength={6} minLength={6} name="code" />
              <p className="text-slate-100 text-sm">Did't receive the OTP? <button type="button" className="text-yellow-400 text-sm">RESEND OTP</button></p>
              <div className="flex ml-8 pt-4 space-x-4">
                <button type="button" onClick={() => {
                  setVisible(0)
                }} className="text-gray text-lg hover:bg-amber-400 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-yellow-400 font-semibold rounded-full h-8 w-28 bg-yellow-400">Go Back</button>
                <button onClick={() => submitCode()} type="button" className="text-gray text-lg hover:bg-amber-400 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-yellow-400 font-semibold rounded-full h-8 w-28 bg-yellow-400">Submit OTP</button>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
{/* <div className={`flex flex-col space-y-4 ${(visible===2)?"block":"hidden"}`}>
            <h1 className="text-slate-100 text-2xl">Register</h1>
                <label className="text-slate-100" htmlFor="username">Name&nbsp;</label>
                <input className="rounded-lg" name="username" type="text"/>
                <label className="text-slate-100" htmlFor="email">Email&nbsp;</label>
                <input className="rounded-lg" name="email" type="text"/>
                <label className="text-slate-100" htmlFor="demo">Demo&nbsp;</label>
                <input className="rounded-lg" name="demo" type="text"/>
                <button className="text-gray text-lg hover:bg-amber-400 focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-yellow-400 font-semibold rounded-full h-10 w-28 bg-yellow-400">Submit</button>
                <button className="text-slate-100">Skip for now</button>
          </div> */}