import { Form, Input, Button, Checkbox } from 'antd';
import firebase from "../../Config/Firebase/index"
import { useNavigate , Link} from 'react-router-dom';
import "../../Style/SignupStyle/signup.css"
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
        <h1>Sign Up</h1>
      <Form.Item
        label="Username"
        name="username"
        className='inp'
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
        label="Email Address"
        name="emailaddress"
        className='inp'
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
        className='inp'
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
        <h2>If you already have an account <Link to="/login">login</Link> </h2>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register;