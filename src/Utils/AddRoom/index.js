import React, { useState, useEffect } from 'react'
import firebase from "../../Config/Firebase/index"
import { Modal, Form, Input, Button, Radio, Space,  Select } from 'antd';
const { Option } = Select;
export default function AddRoom({ setIsModalVisible, handleCancel, isModalVisible, roomsData }) {
  const [hotelsData,setHotelsData] = useState([])
  useEffect(() => {
    firebase.database().ref('/hotels').on('value', snapshot => {
      const data = snapshot.val()
      const newData = []
      console.log(data)
      Object.keys(data).map((key) => { newData.push({ ...data[key], docId: key }) })
      setHotelsData(newData)
    })
  }, [])
  const onFinish = (values, file) => {

    setIsModalVisible(false);
    console.log('Success:', values);
    firebase.database().ref('/rooms/' + values.hotel).push({
      roomName: values.roomName,
      roomNo: values.roomNo,
      pricePerDay: values.pricePerDay,
      breakfastIncluded: values.breakfast,
      luxury: values.luxury,
      noOfbed: values.noOfbed,
    }).then(() => console.log("data has been successfully sents "))
      .catch(err => {
        console.log(err)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onChangeBreakFast = e => {
    console.log('radio checked', e.target.value);
    setbreakfast(e.target.value)
  };

  const [breakfast, setbreakfast] = useState(null)
  const onChangeLuxury = e => {
    console.log('radio checked', e.target.value);
    setluxury(e.target.value)
  };
  const [luxury, setluxury] = useState(null)
 const handleChange=(value)=> {
    console.log(`selected ${value}`);
    setSelectedHotel(value)
  }
  const [selectedHotel,setSelectedHotel] = useState('')
  return (
    <div>
      <Modal title="Add hotel Details" visible={isModalVisible} footer={null} onCancel={handleCancel}>
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
            label="Room Name"
            name="roomName"
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
            label="Room No"
            name="roomNo"
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
            label="No Of Bed"
            name="noOfbed"
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
            label="Price Per Day"
            name="pricePerDay"
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
            label="Break fast included"
            name="breakfast"
            rules={[
              {
                required: true,
                message: 'Please input your website!',
              },
            ]}
          >
            <Radio.Group onChange={onChangeBreakFast} value={breakfast}>
              <Space direction="vertical">
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Luxury"
            name="luxury"
            rules={[
              {
                required: true,
                message: 'Please input your rating!',
              },
            ]}
          >
            <Radio.Group onChange={onChangeLuxury} value={luxury}>
              <Space direction="vertical">
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Choose a hotel"
            name="hotel"
            rules={[
              {
                required: true,
                message: 'Please input your rating!',
              },
            ]}>
          <Select style={{ width: 180 }} onChange={handleChange}>
      {
        hotelsData && hotelsData.map(item =>{
          return(
            <Option value={item.docId}>{item.name}</Option>
          )
        })
      }
    </Select>
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
