import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";


const Card = () => {
    const [data,setdata] = useState([])
    const [loaidng,setloading] = useState(false)
    useEffect(() => {
        async function getData(){
            setloading(true)
            const _data = await getDocs(moviesRef)
            _data.forEach((doc) => {
                setdata((prev) => [...prev,{...(doc.data()),id:doc.id}])
            })
            setloading(false)

        }
        getData()
    },[])
  return (
    <div className="flex flex-wrap space-x-[38px] p-3 mt-2 ">
        {loaidng ? <div className="flex justify-center items-center min-h-screen"><TailSpin height={40} color="white"/></div> :
            data.map((e,i) => {
                return(
                    // eslint-disable-next-line react/jsx-key
                    <Link to={`/detail/${e.id}`}>
                    <div key={i} className="bg-slate-600 rounded-md font-medium p-2 hover:-translate-y-2 shadow-lg mt-6 transition-all duration-500 cursor-pointer">
                        <img src={e.image} alt=""  className="h-60 md:h-72"/>
                        <h1><span className="text-green-300">Name:</span>{e.name}</h1>
                        <h1><span className="text-green-300 mr-1">Rating:</span>{e.rating}</h1>
                        <ReactStars
                        size={20}
                        half={true}
                        value={e.rating/e.rated}
                        edit={false}/>
                        <h1><span className="text-green-300 ">Year:</span>{e.year}</h1>
                    </div>
                    </Link>
                );
            })
    }
    </div>
    
  )
}

export default Card