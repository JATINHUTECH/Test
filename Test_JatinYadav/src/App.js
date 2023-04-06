import React, { useState } from "react";
import "./App.css";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Row,
  Switch,
  Col,
  DatePicker
} from "antd";
import moment from "moment";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  //open Modal
  const showModal = () => {
    console.log("hi");
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  //open edit Modal

  const handleOkEdit = () => {
    setOpenEditModal(false);
  };

  const handleCancelEdit = () => {
    setOpenEditModal(false);
  };

  //Disable enable user
  const handleDisable = (checked, record) => {
    console.log("Form values DISABLE", checked, record);
    const newData = dataSource.map((item) => {
      if (item.name === record.name) {
        return {
          ...item,
          status: checked ? "Active" : "Not Active",
        };
      }
      return item;
    });
    console.log("Form values:", newData);
    setDataSource(newData);
  };

  //add User onfinish
  const onFinish = (values) => {
    console.log("Form values:", values, values.dob.format("DD-MM-YYYY"),);
    setOpenModal(false);
    setDataSource([...dataSource, { ...values, status: "Active", dob: values.dob.format("DD-MM-YYYY") }]);
    form.resetFields();
  };

  //Edit Modal onfinish
  const onFinishEdit = (values) => {
    console.log(values)
    const index = dataSource.findIndex((record) => record.key === editRecord.key);
    console.log('index', index)
    const updatedRecord = {
      ...dataSource[index],
      ...values,
      dob: values.dob.format("DD-MM-YYYY"),
    };
    const updatedDataSource = [...dataSource.slice(0, index), updatedRecord, ...dataSource.slice(index + 1),];
    setDataSource(updatedDataSource);
    setOpenEditModal(false);
    form.resetFields();
  }


  const handleEdit = (record) => {
    console.log(record, 'record')
    formEdit.setFieldsValue({
      name: record.name,
      lastname: record.lastname,
      mobile: record.mobile,
      email: record.email,
      dob: moment(record.dob, "DD-MM-YYYY")
    });

    setEditRecord(record);
    setOpenEditModal(true);

  };

  //Json
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "surinder Kumnar",
      mobile: 9988998811,
      dob: "13/10/1995",
      email: "surinder.Kumar@hutechsolution.com",
      status: "Active",
    },
    {
      key: "2",
      name: "Rohit Sharma",
      mobile: 9988998812,
      dob: "13/10/1990",
      email: "rohit.sharma@hutechsolution.com",
      status: "Active",
    },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Dob",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === "Active"}
          onChange={(checked) => handleDisable(checked, record)}
          checkedChildren="Active"
          unCheckedChildren="Not Active"
          size="middle"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
        </Space>
      ),
    },
  ];

  function checkAlphabets(event) {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    } else {
      return false;
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div style={{ margin: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button type="primary" style={{}} onClick={showModal}>
            Add User
          </Button>
        </div>
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowClassName={(record) =>
              record.status === "Not Active" ? "disabled-row" : ""
            }
          />
        </div>
      </div>
      <Modal
        title="Add Modal"
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" name="userForm">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="name"
                label="First Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ name: caps });
                  }}
                  required
                  placeholder="Enter First Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="lastname"
                label="Last Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ lastname: caps });
                  }}
                  placeholder="Enter Last Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone Number",
                    pattern: /^[0-9\b]+$/,
                  },
                  { whitespace: true },
                ]}
              >
                <Input maxLength={10} placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email Id",
                    type: "email",
                  },
                  {
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>
            </Col>



            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}

              >
                <DatePicker
                  placeholder="Choose Date"
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      {/* //------editModal */}
      <Modal
        title="Edit Modal"
        visible={openEditModal}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={null}
        width={850}
      >
        <Form form={formEdit} onFinish={onFinishEdit} layout="vertical" name="userForm" initialValues={editRecord}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="name"
                label="First Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}

                rules={[
                  {
                    required: true,
                    message: "Please enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input

                  maxLength={20}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ name: caps });
                  }}
                  required
                  placeholder="Enter First Name"
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="lastname"
                label="Last Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ lastname: caps });
                  }}
                  placeholder="Enter Last Name"
                />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone Number",
                    pattern: /^[0-9\b]+$/,
                  },

                ]}
              >
                <Input maxLength={10} placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email Id",
                    type: "email",
                  },
                  {
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>
            </Col>



            <Col xs={24} sm={24} md={8}>
              {" "}
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}

              >
                <DatePicker
                  placeholder="Choose Date"
                  format="DD-MM-YYYY"

                />
              </Form.Item>
            </Col>

          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default App;
