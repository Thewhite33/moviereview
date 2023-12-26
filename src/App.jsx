import { Route, Routes } from "react-router-dom"
import Card from "./component/Card"
import Header from "./component/Header"
import Add from "./component/Add"
import Deatil from "./component/Deatil"
import { createContext, useState } from "react"
import Login from './component/Login'
import Signup from './component/Signup'

const Appstate = createContext()


const App = () => {
  const [login, setlogin] = useState(false)
  const [username, setusername] = useState("")
  return (
    <Appstate.Provider value={{login,username,setlogin,setusername}}>
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Card/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/detail/:id" element={<Deatil/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/signup" element={<Signup/>}/> 
      </Routes>
    </div>
    </Appstate.Provider>
  )
}

export default App
export {Appstate}