import { getDocs, query, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { userRef } from "../firebase/firebase"
import bcrypt from 'bcryptjs';
import { Appstate } from "../App"
import { TailSpin } from "react-loader-spinner"


const Login = () => {

  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()

  const [form, setform] = useState({
    mobile:"",
    password:""
  })
  const [loading, setloading] = useState(false)
  const login = async() => {
    setloading(true)
    try {
      const q = query(userRef,where('mobile','==',form.mobile))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc)=>{
        const _data = doc.data()
        const isuser = bcrypt.compareSync(form.password,_data.password)
        if(isuser){
          useAppstate.setlogin(true)
          useAppstate.setusername(_data.name)
          swal({
            text: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate('/')
        }else{
          swal({
            text: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          })
        }
      })

      
    } catch (error) {
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
      <h1 className="text-xl font-bold">Login</h1>
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
               className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
            </div>
      </div>
      {loading ? <TailSpin color="white" height={25}/> :
      <div className="p-2 w-full">
            <button
            onClick={login}
            className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              Login
            </button>
          </div>}
          <p>Don&apos;t have a account <Link to={'/signup'}><span className="text-blue-500">SignUp</span></Link> </p>
    </div>
  )
}

export default Login