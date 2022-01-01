import React from 'react'
import firebase from "../../Config/Firebase/index"
import { Form, Input, Button} from 'antd';
import {useNavigate,Link} from "react-router-dom"
import "../../Style/LogInStyle/login.css"
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
              navigate('/home')
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
            <div className="sbn">
                    <div className="sbn-inner">
                        <div className="grt">
                            <h1 className="grt-inner">Welcome to Our Restaurant </h1>
                        </div>
                        <div className="sbo">
                            <h4 className="sbo-inner">Here you will get more special than you ever think in very efficient amount !</h4>
                        </div>
                    </div>

                </div>
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
     
        <h1>Log In</h1>
      <Form.Item
        label="Email Address"
        name="emailaddress"
        rules={[
          {
            required: true,
            message: 'Please input your emailaddress!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
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
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <h2>If you haven't any account <Link to="/">signup</Link> </h2>
      </Form.Item>
    </Form>
        </div>
    )
}
