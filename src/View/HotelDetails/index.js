import React, { useEffect, useState } from 'react'
import firebase from "../../Config/Firebase/index"
import { useParams } from "react-router-dom"
import { Button, Menu } from 'antd';
import 'antd/dist/antd.css'
import {useNavigate} from "react-router-dom"
import "../../Style/HotelDetail/index.css"
import loader from "../../loader.gif"
export default function HotelDetails() {
    const navigate = useNavigate()
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
    if (!hotelDetail) {
        return <img src={loader} />
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    Rooms Details
                </Menu.Item>
                <Menu.Item>
                    Hotel Detials
                </Menu.Item>
            </Menu>
            <div>
                <img src={hotelDetail.image} width="500px" alt="hotelImg" style={{marginTop:'100px'}} />
                <h2>Rooms available at {hotelDetail.name}</h2>
                <h2>Book Online or call : {hotelDetail.phoneNumber}</h2>
                <h1 style={{marginTop:'100px'}}>Room Details</h1>
                { roomDetail && roomDetail.map(item =>{
                    return(
                        <div>
                        <div className="rmdt" hoverable="true" >
                        <img src={hotelDetail.image} width="200px" alt="hotelImg" />
                        <div className="rt">
                        <h1>{item.roomName}</h1>
                            <h2>No of beds in room {item.noOfbed}</h2>
                            <h3>Room No : {item.roomNo}</h3>
                            <Button onClick={()=>bookRoom(item.docId,params.id)}>Book</Button>
                        </div>
                        </div>
                    </div>
                    )
                })
                 
                }

            </div>
        </div>
    )
}
