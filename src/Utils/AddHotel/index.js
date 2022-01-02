import React,{useState} from 'react'
import firebase from "../../Config/Firebase/index"
import { Modal ,Form, Input, Button, Checkbox} from 'antd';


export default function AddHotel({isModalVisible,handleCancel,setIsModalVisible}) {

  var storageRef = firebase.storage().ref();
  const [imageUrl,setImageUrl] = useState()
  const [file,setFile] = useState()
  
  const onFinish = (values,file) => {
    
    var uploadTask = storageRef.child(`images/${Math.floor(Math.random()*99999999)}.jpg`).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const iurl = downloadURL
          setImageUrl(downloadURL)
        });
      }
    );
    setIsModalVisible(false);
    console.log('Success:', values);
    firebase.database().ref('/hotels/').push({
      name: values.name,
      address: values.address,
      email: values.email,
      description: values.description,
      phoneNumber: values.phoneNumber,
      rating: values.rating,
      website: values.website,
      image: imageUrl
    }).then(()=> console.log("data has been successfully sents "))
    .catch(err=>{
      console.log(err)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleImage = (e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }
    return (
        <div>
             <Modal title="Add hotel Details" visible={isModalVisible}   footer={null} onCancel={handleCancel}>
             <Form
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
        label="Hotel Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your hotelname!',
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
            message: 'Please input your Address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: 'Please input your phone Number!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={[
          {
            required: true,
            message: 'Please input your website!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rating"
        name="rating"
        rules={[
          {
            required: true,
            message: 'Please input your rating!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[
          {
            required: true,
            message: 'Please put image!',
          },
        ]}
      >
       <input type="file" placeholder='choose an image ' onChange={(e)=>handleImage(e)}  />
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
      </Modal>
        </div>
    )
}
