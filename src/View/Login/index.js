import React from 'react'
import firebase from "../../Config/Firebase/index"
import { Form, Input, Button} from 'antd';
import {useNavigate,Link} from "react-router-dom"
import "../../Style/LogInStyle/login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons'
export default function LogIn() {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Success:', values);
      firebase.auth().signInWithEmailAndPassword(values.emailaddress,values.password).then((data)=>{
          console.log("successfully login user ==>" + data)
          form.resetFields()
          if(values.emailaddress === "admin@gmail.com" && values.password === "admin786"){
              navigate('/adminpanel')
          }else{
              navigate('/')
          }
      }).catch((err)=>{
          console.log(err)
      })
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">

             <Form
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
      <FontAwesomeIcon icon={faDharmachakra} style={{fontSize:'90px'}} /> 
        <h1>Log In</h1>
      <Form.Item
        name="emailaddress"
        rules={[
          {
            required: true,
            message: 'Please input your emailaddress!',
          },
        ]}
      >
        <Input placeholder='Enter you email' className='inp' />
      </Form.Item>

      <Form.Item
        name="password"
        defaultValue="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder='Enter your password' className='inp' />
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
      
        <h3>If you haven't any account <Link to="/register">signup</Link> </h3>
     
    </Form>
        </div>
    )
}
