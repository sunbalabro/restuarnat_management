import {useState,useEffect} from "react"
import './App.css';
import 'antd/dist/antd.css'
import firebase from "./Config/Firebase/index"
import AppRouter from './Config/Router';

function App() {
  const [userData,setUserData] = useState()
  useEffect(()=>{
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
      console.log("user ===>" + user)
      setUserData(true)
        }else{
          setUserData(false)
        }
      })
  },[])
  return (
    <div className="App">
      <AppRouter user={userData} />
    </div>
  );
}

export default App;
