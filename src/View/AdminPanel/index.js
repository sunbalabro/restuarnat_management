import React from 'react'
import {Button, Tabs} from "antd"
import Dashboard from '../../Utils/Dashboard';
import AllHotels from '../../Utils/AllHotels';
import AllRooms from '../../Utils/AllRooms';
import AllUsers from '../../Utils/AllUsers';
import { useNavigate } from 'react-router-dom';
import firebase from "../../Config/Firebase/index"

const { TabPane } = Tabs;
export default function AdminPanel() {
  const navigate = useNavigate()
  const logoutAdmin = () =>{
    firebase.auth().signOut()
    navigate("/")
  }
  const logout = <Button onClick={logoutAdmin}>Logout</Button>
    return (
        <div>
             <Tabs tabBarExtraContent={logout} defaultActiveKey="1" tabPosition='left' style={{height:'800px'}}>
     <TabPane tab={<img src="https://cdn-icons-png.flaticon.com/512/906/906343.png" width="230px"/>}  disabled >
    </TabPane>               
    <TabPane tab="Dashboard" key="1">
      <Dashboard />
    </TabPane>
    <TabPane tab="All Hotels" key="2">
      <AllHotels />
    </TabPane>
    <TabPane tab="All Rooms" key="3">
      <AllRooms />
    </TabPane>
    <TabPane tab="All Users" key="4">
      <AllUsers />
    </TabPane> 
  </Tabs>
        </div>
    )
}
