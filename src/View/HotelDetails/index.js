import React, { useEffect, useState } from 'react'
import firebase from "../../Config/Firebase/index"
import { useParams } from "react-router-dom"
import { Button, Menu, Card } from 'antd';
import AppFooter from "../../Utils/Footer/index"
import 'antd/dist/antd.css'
import {useNavigate} from "react-router-dom"
import "../../Style/HotelDetail/index.css"
import loader from "../../loader.gif"
import Navbar from "../../Utils/Navbar/index"
import HotelDetailBan from '../../Utils/HotelDetailBan';
export default function HotelDetails() {
    const navigate = useNavigate()
    const [navBackground,setNavBackground] = useState()
    const [hotelDetail, setHotelDetail] = useState()
    const [roomDetail, setRoomDetail] = useState()
    const params = useParams();
    console.log(params.id)
    useEffect(() => {
        firebase.database().ref('/hotels/' + params.id).on('value', snapshot => {
            const data = snapshot.val();
            console.log(data)
            setHotelDetail(data)
        })
        firebase.database().ref('/rooms/' + params.id).on('value', snapshot => {
            const data = snapshot.val();
            const newDetails = []
            Object.keys(data).map((key) => { newDetails.push({ ...data[key], docId: key }) })
            setRoomDetail(newDetails)
            console.log(newDetails)
        })
    }, [])
    const bookRoom = (roomId,hotelId) =>{
        navigate('/order',{state:{roomId:roomId,hotelId:hotelId}})
    }
    const changeBackground = () => {
        if (window.scrollY >= 66) {
          setNavBackground(true)
        } else {
          setNavBackground(false)
        }
      }
    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
      })
    if (!hotelDetail) {
        return <img src={loader} />
    }
    return (
        <div style={{backgroundColor:'#F8F8F8'}}>
            <Navbar navBackground={navBackground} setNavBackground={setNavBackground} />
            <HotelDetailBan />
            <Menu mode="horizontal" style={{width:'500px',border:'1px solid #ebebeb',margin:'0 auto',marginTop:'100px'}}>
                <Menu.Item>
                    <a href="#roomdetails">
                    Rooms Details
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a href="#hoteldetails">
                    Hotel Detials
                    </a>
                </Menu.Item>
            </Menu>
            <div>
                <img src={hotelDetail.image} width="500px" alt="hotelImg" style={{marginTop:'100px'}} />
                <div className="rh">
                <h2>Rooms available at {hotelDetail.name}</h2>
                <h2>Book Online or call : {hotelDetail.phoneNumber}</h2>
                </div>
                <h1 style={{marginTop:'100px'}} id="roomdetails">Room Details</h1>
                { roomDetail && roomDetail.map(item =>{
                    return(
                        <div>
                        <div className="rmdt">
                        <img src={hotelDetail.image} height="200px" width="300px" alt="hotelImg" />
                        <div className="rt">
                        <h1>{item.roomName}</h1>
                            <h2>No of beds in room {item.noOfbed}</h2>
                            <h3>Room No : {item.roomNo}</h3>
                        </div>
                        <div className='rt'>
                            <h3>Price : {item.pricePerDay} per day</h3>
                            <Button className="rbtn" onClick={()=>bookRoom(item.docId,params.id)}>Book</Button>
                        </div>
                        </div>
                    </div>
                    )
                })
                 
                }
             <div className="hotelDetails">
                 <h1 id="hoteldetails">About {hotelDetail.name}</h1>
                 <p>{hotelDetail.description}</p>
             </div>
            </div>
            <AppFooter />
        </div>
    )
}
