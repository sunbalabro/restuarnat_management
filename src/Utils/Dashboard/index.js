import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import firebase from "../../Config/Firebase/index"
import "../../Style/DashboardStyle/index.css"
import adminPic from "../../Assets/admin.png"
export default function Dashboard() {

    useEffect(() => {
        firebase.database().ref('/hotels/').on('value', (snapshot) => {
            const hoteldata = snapshot.val()
            setNoOfhotels(Object.keys(hoteldata).length)
        })
        firebase.database().ref('/users/').on('value', (snapshot) => {
            const usersdata = snapshot.val()
            setNoOfUser(Object.keys(usersdata).length)
        })
        const adminId = "-akjnkajhfasdasd"
        firebase.database().ref('/users/' + adminId).on('value', (snapshot) => {
            const admindata = snapshot.val()
            const data = []
            console.log(admindata)
            data.push(admindata)
            setAdminData(data)
        })
    }, [])

    const [noOfhotels, setNoOfhotels] = useState(null)
    const [noOfUsers, setNoOfUser] = useState(null)
    const [adminData, setAdminData] = useState([])

    console.log(adminData)
    return (
        <div className="Dashboard">
            <h1 className="head">Dashboard</h1>
            <div className='dash'>
            

            <Card hoverable style={{ width: '400px' }}>
                <h1>Profile Information</h1>
                <img src={adminPic} alt="admin" />
                {
                    adminData.map((item) => {
                        return (
                            <>

                                <h3>Name : {item.userName}</h3>
                                <h3>Email : {item.email}</h3>
                            </>
                        )
                    })

                }
            </Card>
            <div style={{marginTop:"50px"}}>
                <h1>Details of hotels and users</h1>
                <div className="dscr">
                <Card style={{ width: 300, margin: '20px' }} hoverable >
                    <h1>No of Hotels</h1>
                    <h1>{noOfhotels}</h1>
                </Card>
                <Card style={{ width: 300, margin: '20px' }} hoverable >
                    <h1>No of Users</h1>
                    <h1>{noOfUsers}</h1>
                </Card>
                </div>
               
            </div>

            </div>
            
        </div>
    )
}
