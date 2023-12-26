import { useContext, useEffect, useState } from "react"
import ReactStars from "react-stars"
import { db, reviewsRef } from "../firebase/firebase"
import { TailSpin, ThreeDots } from "react-loader-spinner"
import swal from "sweetalert"
import { addDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { Appstate } from "../App"
import { useNavigate } from "react-router-dom"



const Review = ({id,prevRating,userRated}) => {

    const useAppstate = useContext(Appstate)
    const navigate = useNavigate()
    const [rating,setrating] = useState(0)
    const [loading,setloading] = useState(false)
    const [form, setform] = useState("")
    const [reviewloading, setreviewloading] = useState(false)
    const [data,setdata] = useState([])
    const [newadded, setnewadded] = useState(0)

    useEffect(()=>{
        async function getData(){
            setreviewloading(true)
            setdata([])
            let q = query(reviewsRef,where('movieid','==',id))
            const querysnapshot = await getDocs(q)

            querysnapshot.forEach((doc)=>{
                setdata((prev) => [...prev,doc.data()])
            })
            setreviewloading(false)

        }
        getData()
    },[newadded])

    const sendreview = async() => {
        setloading(true)
        if(useAppstate.login){
        try {
            await addDoc(reviewsRef,{
                movieid: id,
                name:useAppstate.username,
                rating:rating,
                thought:form,
                timestamp: new Date().getTime()
            })
            const ref = doc(db,"movies",id)
            await updateDoc(ref,{
                rating:prevRating + rating,
                rated: userRated+1
            })

            setrating(0)
            setform("")
            setnewadded(newadded + 1)
            swal({
                title:'Review Sent',
                icon:'success',
                buttons: false,
                timer: 2000
              })
        } catch (error) {
            console.log(error);
            swal({
                title:error.message,
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
    <div className="mt-4 py-2 border-t-2 border-gray-700 w-full">
        <ReactStars
            size={25}
            half={true}
            value={rating}
            onChange={(rate)=>setrating(rate)}/>
        <input
        value={form}
        onChange={(e)=>setform(e.target.value)} 
        className="w-full p-2 outline-none bg-gray-800 text-white"
        type="text" placeholder="Share your thoughts" />
        <button onClick={sendreview} className="bg-green-500 w-full flex justify-center p-2 mt-3">
            {loading ? <TailSpin color="white" height={20}/>:'Submit'}
        </button>

        {reviewloading ? <div className="mt-6 flex justify-center"><ThreeDots color="white" height={10}/></div> :
        <div className="mt-4">
            {data.map((e,i)=>{
                return(
                    <div key={i} className="bg-gray-800 mt-2 p-2 w-full border-b border-gray-500">
                        <div className="flex justify-between">
                            <p className="text-blue-300 ">{e.name}</p>
                            <p className="ml-2">({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={e.rating}
                            edit={false}/>
                        <p>{e.thought}</p>
                        
                    </div>
                )
            })}
        </div>
        }
    </div>
  )
}

export default Review