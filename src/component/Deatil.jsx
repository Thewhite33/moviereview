import ReactStars from "react-stars"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Review from "./Review";


const Deatil = () => {
  const {id} = useParams();
  const [data,setdata] = useState({
    title:'',
    year:'',
    image:'',
    description:'',
    rating:0,
    rated:0,

  })

  useEffect(()=>{
    async function getData(){
      const _doc = doc(db,"movies",id);
      const _data = await getDoc(_doc)
      setdata(_data.data())
    }

    getData()
  },[])
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center">
      <img
      className="h-96 block md:sticky top-24"
      src={data.image}/>
      <div className="md:ml-4 ml-0 w-full md:w-1/2">
        <h1 className="text-3xl font-bold">{data.name} <span className="text-xl text-gray-500">({data.year})</span></h1>
        <ReactStars
                        size={20}
                        half={true}
                        value={data.rating/data.rated}
                        edit={false}/>

        <p className="mt-3 font-semibold">
        {data.description}
        </p>
        <Review id={id} prevRating={data.rating} userRated={data.rated}/>
      </div>
    </div>
  )
}

export default Deatil


