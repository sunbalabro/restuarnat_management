import { Form, Input, Button, Checkbox } from 'antd';
import firebase from "../../Config/Firebase/index"
import { useNavigate , Link} from 'react-router-dom';
import "../../Style/SignupStyle/signup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
    firebase.auth().createUserWithEmailAndPassword(values.emailaddress,values.password).then((data)=>{
        console.log("successfully created user ==>" + data)
        firebase.database().ref('/users/').push({
            userName: values.username,
            email: values.emailaddress,
            password: values.password
        })
        form.resetFields()
        navigate('/login')
    }).catch((err)=>{
        console.log(err)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <div className="signup">
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
        <h1>Sign Up</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input
        className='inp' placeholder='Enter your username' />
      </Form.Item>
      <Form.Item
        name="emailaddress"
        rules={[
          {
            required: true,
            message: 'Please input your emailaddress!',
          },
        ]}
      >
        <Input
        className='inp' placeHolder="Enter your email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
        className='inp' placeHolder="Enter your password" />
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
      
        <h3>If you already have an account <Link to="/login">login</Link> </h3>
     
    </Form>
    </div>
  );
};

export default Register;