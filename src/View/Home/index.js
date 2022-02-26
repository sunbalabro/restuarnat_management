import React, { useEffect, useState } from 'react'
import firebase from "../../Config/Firebase/index"
import { Button, Card } from 'antd';
import 'antd/dist/antd.css'
import Navbar from "../../Utils/Navbar/index"
import "../../Style/HomeStyle/home.css"
import { useNavigate } from 'react-router-dom';
import HomeBan from '../../Utils/HomeBan';
import HomeBlog from '../../Utils/HomeBlog';
import AppFooter from '../../Utils/Footer';
const { Meta } = Card;
export default function Home({user}) {
    const navigate = useNavigate()
    const [hotelsData, setHotelsData] = useState([])
    const [navBackground,setNavBackground] = useState()

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
    const changeBackground = () => {
        if (window.scrollY >= 66) {
          setNavBackground(true)
        } else {
          setNavBackground(false)
        }
      }
    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
      })
   const handleClick = (docId) =>{
        const curUser = firebase.auth().currentUser
        if(curUser !== null){
            navigate(`/hotel/${docId}/hoteldetail`)
        }else{
          alert("Login please")
      }
   }
   console.log(user)
    return (
        <>
        <Navbar navBackground={navBackground} setNavBackground={setNavBackground} user={user} />
            <HomeBan />
            <HomeBlog />
            <div className='fh'>
            <h1 className='al'>Featured Hotels</h1>
        <div className="htcr">
            {
                hotelsData.map((item) => {
                    return (
                        <div>
                            <Card
                                hoverable
                                style={{ width: 340 , margin:'30px' }}
                                cover={<img alt="example" src={item.image} />}
                            >
                                <Meta title={item.name} description={item.email} />
                                <Button style={{marginTop:'20px'}} onClick={()=>handleClick(item.docId)}>Check Details</Button>
                            </Card>,
                        </div>
                    )
                })
            }

        </div>    
            </div>
          <AppFooter />            
        </>
    )
}
