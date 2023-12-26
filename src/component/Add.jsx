import { useContext, useState } from "react"
import { TailSpin } from "react-loader-spinner"
import { addDoc } from "firebase/firestore"
import { moviesRef } from "../firebase/firebase"
import swal from "sweetalert"
import { Appstate } from "../App"
import { useNavigate } from "react-router-dom"


const Add = () => {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()
    const [form, setform] = useState({
        name:'',
        year:'',
        description:'',
        image:'',
        rating:0,
        rated:0
    })
    const [loading,setloading] = useState(false)

    const addMovie = async() => {
      setloading(true)
      if(useAppstate.login){
      try {
      await addDoc(moviesRef,form)
      swal({
        title:'Movie Added Successfully',
        icon:'success',
        buttons: false,
        timer: 2000
      })
      setform({
        name:'',
        year:'',
        description:'',
        image:''
      })
    
    } catch (error) {
      swal({
        title: error,
        icon:'error',
        buttons: false,
        timer: 2000
      })
    }
  }else{
    navigate('/login')
  }
    setloading(false)
      
    }
  return (
    <div>
  <section className="text-gray-600 body-font relative">
    <div className="container px-5 py-8 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add New Movie 🤓</h1>
        
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-50">Name</label>
              <input
              value={form.name}
              onChange={(e)=>setform({...form,name:e.target.value})}
              type="text" id="name" name="name" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-sm text-gray-50">Year</label>
              <input 
              value={form.year}
              onChange={(e)=>setform({...form,year:e.target.value})}
              type="email" id="email" name="email" className="w-full bg-gray-100  rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">Image URL</label>
              <input 
              value={form.image}
              onChange={(e)=>setform({...form,image:e.target.value})}
              id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-9 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
            </div>
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-50">Description</label>
              <textarea 
              value={form.description}
              onChange={(e)=>setform({...form,description:e.target.value})}
              id="message" name="message" className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
            </div>
          </div>
          <div className="p-2 w-full">
            <button
            onClick={addMovie}
            className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              {loading ? <TailSpin height={25} color="white"/>:'Submit'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</div>

  )
}

export default Add