

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app, { userRef } from "../firebase/firebase";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import bcrypt from 'bcryptjs';

const auth = getAuth(app);


const SignUp = () => {
  const navigate = useNavigate()
  const [form, setform] = useState({
    name:'',
    mobile:"",
    password:""
  })
  const [otpsent, setotpsent] = useState(false)
  const [otp, setotp] = useState("")
  const [loading,setloading] = useState(false)
  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      'size': 'invisible',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('Recaptcha solved');
      }
    });
  }
  const requestOtp = () => {
    setloading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setotpsent(true);
        setloading(false);
      }).catch((error) => {
        swal({
          text: error.message,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      })
}

  const verifyotp = async() => {
    try {
      setloading(true);
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef,{
        name:form.name,
        password:hash,
        mobile:form.mobile
      })
      window.confirmationResult.confirm(otp).then((result) => {
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setloading(false);
        navigate('/login')
      })
    } catch (error) {
      console.log(error);
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  }

  return (
    <div className="w-full flex flex-col items-center mt-9">
      <h1 className="text-xl font-bold">SignUp</h1>
      {otpsent ? 
      <>
        <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">OTP</label>
              <input
              value={otp}
              onChange={(e)=>setotp(e.target.value)}
              id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
            </div>
      </div>
        {loading ? <TailSpin color="white" height={25}/>:
          <div className="p-2 w-full">
            <button
            onClick={verifyotp}
            className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              Verify
            </button>
          </div>
        }
      </>
      :
      <>
      <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">Name</label>
              <input
              value={form.name}
              type="text"
              onChange={(e)=>setform({...form,name:e.target.value})}
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
            </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">Mobile Number</label>
              <input
              value={form.mobile}
              type={"number"}
              onChange={(e)=>setform({...form,mobile:e.target.value})}
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
            </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">Password</label>
              <input
              type="password"
              value={form.password}
              onChange={(e)=>setform({...form,password:e.target.value})} 
              id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
            </div>
      </div>
      {loading ? <TailSpin color="white" height={25}/> :
      <div className="p-2 w-full">
        
            <button
            onClick={requestOtp}
            className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              Request OTP
            </button>
          </div>
      }
          </>
      }
          <p>Have a account <Link to={'/login'}><span className="text-blue-500">Login</span></Link> </p>
          <div id="recaptcha-container"></div>
    </div>
  )
}

export default SignUp