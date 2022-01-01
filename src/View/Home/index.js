import React, { useEffect, useState } from 'react'
import firebase from "../../Config/Firebase/index"
import { Button, Card } from 'antd';
import 'antd/dist/antd.css'
import Navbar from "../../Utils/Navbar/index"
import "../../Style/HomeStyle/home.css"
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
export default function Home() {
    const navigate = useNavigate()
    const [hotelsData, setHotelsData] = useState([])
    useEffect(() => {

        const getHotelsfromDatabase = () => {
            firebase.database().ref('/hotels').on('value', (snapshot) => {
                const data = snapshot.val();
                const newData = []
                console.log(data)
                Object.keys(data).map((key) => { newData.push({ ...data[key], docId: key }) })
                setHotelsData(newData)
                console.log(newData)
            });
        }
        getHotelsfromDatabase()
    }, [])

   const handleClick = (docId) =>{
       navigate(`/hotel/${docId}/hoteldetail`)
   }
    return (
        <>
        <Navbar />
            <h1>All Hotels</h1>
        <div className="htcr">
            {
                hotelsData.map((item) => {
                    return (
                        <div>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={item.image} />}
                            >
                                <Meta title={item.name} description={item.email} />
                                <Button onClick={()=>handleClick(item.docId)}>Check Details</Button>
                            </Card>,
                        </div>
                    )
                })
            }

        </div>
        </>
    )
}
