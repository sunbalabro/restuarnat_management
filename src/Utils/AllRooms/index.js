import React,{useEffect,useState} from 'react'
import firebase from "../../Config/Firebase/index"
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import AddRoom from '../AddRoom';
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
export default function AllRooms() {
    const [roomsData,setRoomsData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

    useEffect(()=>{
          firebase.database().ref('/rooms/').on('value',(snapshot)=>{
            const newData = []
              const data = snapshot.val()
              const roomKeys = Object.keys(data)
              for (let i = 0; i < roomKeys.length; i++) {
                  firebase.database().ref('/rooms/'+roomKeys[i]).on('value',(snapshot)=>{
                      const data = snapshot.val()
                      Object.keys(data).map((key) => { newData.push({ ...data[key], docId: key , hotelKey: roomKeys[i]}) })
                    })
                    
                  }
                  console.log(newData)
                  setRoomsData(newData)
              console.log(roomsData)
          })
    },[])
    
    
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
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newhotelData = [...roomsData];
      const index = newhotelData.findIndex((item) => key === item.docId);

      if (index > -1) {
        const item = newhotelData[index];
        newhotelData.splice(index, 1, { ...item, ...row });
        console.log(newhotelData)
        setRoomsData(newhotelData);
        setEditingKey('');
        console.log(row)
        firebase.database().ref('/rooms/' + item.hotelKey +'/'+ item.docId).update({
          breakfastIncluded: row.breakfastIncluded,
          luxury: row.luxury,
          noOfbed: row.noOfbed,
          pricePerDay: row.pricePerDay,
          roomNo: row.roomNo,
          roomName: row.roomName
        }).then(()=> console.log("data has been successfully updated")).catch(err => console.log(err))
      } else {
        newhotelData.push(row);
        setRoomsData(newhotelData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Breakfast Included',
      dataIndex: 'breakfastIncluded',
      width: '15%',
      editable: true,
    },
    {
      title: 'Luxury',
      dataIndex: 'luxury',
      width: '15%',
      editable: true,
    },
    {
      title: 'No of bed',
      dataIndex: 'noOfbed',
      width: '10%',
      editable: true,
    },
    {
      title: 'Price Per Day',
      dataIndex: 'pricePerDay',
      width: '15%',
      editable: true,
    },
    {
      title: 'Room Name',
      dataIndex: 'roomName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNo',
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
            <h1>All Rooms</h1>
            <Form form={form} component={false}>
        <Button onClick={() => showModal()}>Add Room</Button>
        <AddRoom isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} roomsData={roomsData} handleCancel={handleCancel} />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={roomsData}
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
