import React from 'react'
import {Tabs} from "antd"
import Dashboard from '../../Utils/Dashboard';
import AllHotels from '../../Utils/AllHotels';
import AllRooms from '../../Utils/AllRooms';
import AllUsers from '../../Utils/AllUsers';

const { TabPane } = Tabs;

export default function AdminPanel() {
    return (
        <div>
             <Tabs defaultActiveKey="1" tabPosition='left' style={{height:'800px'}}>
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
