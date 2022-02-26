import React, { useEffect, useState } from 'react'
import firebase from "../../Config/Firebase/index"
import "../../Style/AllHotels/index.css"
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import AddHotel from '../AddHotel';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default function AllHotels() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [hotelsData, setHotelsData] = useState()

  useEffect(() => {
    firebase.database().ref('/hotels/').on('value', (snapshot) => {
      const data = snapshot.val()
      const newData = []
      console.log(data)
      Object.keys(data).map((key) => { newData.push({ ...data[key], docId: key }) })
      setHotelsData(newData)
      console.log(hotelsData)
    })
  }, [])

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.docId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.docId);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newhotelData = [...hotelsData];
      const index = newhotelData.findIndex((item) => key === item.docId);

      if (index > -1) {
        const item = newhotelData[index];
        newhotelData.splice(index, 1, { ...item, ...row });
        console.log(newhotelData)
        setHotelsData(newhotelData);
        setEditingKey('');
        console.log(row)
        firebase.database().ref('/hotels/' + item.docId).update({
          address: row.address,
          name: row.name,
          email: row.email,
          website: row.website,
          phoneNumber: row.phoneNumber,
          rating: row.rating
        })
      } else {
        newhotelData.push(row);
        setHotelsData(newhotelData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      width: '20%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '20%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: '6%',
      editable: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.docId)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className='allHotels'>
      <h1>All Hotels</h1>
      <h2>Deails Of All Hotels</h2>

      <Form form={form} component={false}>
        <Button onClick={() => showModal()}>Add Hotel</Button>
        <AddHotel isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handleCancel={handleCancel} />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={hotelsData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}

        />
      </Form>
    </div>
  )
}
