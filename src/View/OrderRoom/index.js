import React,{useEffect,useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import {useLocation,useNavigate} from "react-router-dom"
import firebase from "../../Config/Firebase/index"
import Navbar from "../../Utils/Navbar/index"
import HomeBan from '../../Utils/HomeBan';
import "../../Style/OrderStyle/index.css"
export default function  OrderRoom() {
    const navigate = useNavigate()
    const [navBackground,setNavBackground] = useState()

    const [form] = Form.useForm();
    const location = useLocation()
    console.log(location.state)
    const onFinish = (values) => {
        console.log('Success:', values);
        firebase.database().ref('/userbooking/').push({
            userName: values.username,
            userCnic: values.cnic,
            userAddress: values.address,
            userContactNo: values.contactNumber,
            noOfperson: values.noOfperson,
            noOfDay: values.noOfdays,
            roomId: location.state.roomId,
            hotelId: location.state.hotelId             
        })  
        form.resetFields()
       navigate('/home')
    };
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
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
      };
    return (
    <div style={{backgroundColor:'#F8F8F8'}}>
          <Navbar navBackground={navBackground} setNavBackground={setNavBackground} />
          <HomeBan /> 
          <h1 style={{marginTop:'200px'}}>Order Details</h1>
             <Form className='order'
             form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CNIC"
        name="cnic"
        rules={[
          {
            required: true,
            message: 'Please input your cnic!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contact Number"
        name="contactNumber"
        rules={[
          {
            required: true,
            message: 'Please input your contact number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="No of days to stay"
        name="noOfdays"
        rules={[
          {
            required: true,
            message: 'Please input your no of days to stay!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label=" No of person"
        name="noOfperson"
        rules={[
          {
            required: true,
            message: 'Please input your number of person!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}
