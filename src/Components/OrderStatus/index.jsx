import React, { useRef, useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {  Space, Table, Tag , Input, Modal} from 'antd';
import {  SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './index.css';

const OrderStatus = () => {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData ] = useState([]);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Order',
      dataIndex: 'order_number',
      key: 'order_number',
      width: '20%',
      ...getColumnSearchProps('order_number'),
    },
    {
      title: 'Date',
      dataIndex: 'createdat',
      key: 'createdat',
      width: '20%',
      render: (createdat) => (
        <span> {createdat.split('T')[0]} </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...getColumnSearchProps('status'),
        render: (status) => (
            <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>
        )
      },
      {
        title: 'Review',
        dataIndex: 'Review',
        key: 'Review',
      },
  ];


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getSingleOrder = async (e) => {
    e.preventDefault();
    try {
      const { data: { data: orderDetails , message: msg } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/single-order`
      , { email, orderNumber });
      // message.success(msg)
      setData((prev) => [...prev, orderDetails]);
      console.log(data, 'ordre data')
      setIsModalVisible(true);
    } catch(err){
      console.error(err);
    }
  };
  
  return (
    <Container fluid style={{ marginTop: '3%' }} className="checkOrderContainer">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Account</Breadcrumb.Item>
      
    </Breadcrumb>
    <p>To track your order please enter your Order ID in the box below and press the "Check" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
    <Form style={{ marginTop: "2%" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Order Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Order Number" value={orderNumber} onChange={(e) => setOrderNo(e.target.value)} required/>
      </Form.Group>
      <Button variant="primary" type="submit" style={{ backgroundColor: '#0F6AD0'}} onClick={(e) =>  getSingleOrder(e)}>
        Check
      </Button>
    </Form>
    <Modal title="All Orders" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
        <div className="orderTableResult">
          <Table columns={columns} dataSource={data} />
        </div>
    </Modal>


    </Container>
  );
}

export default OrderStatus;