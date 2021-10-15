import {
  Select,
  Form,
  Button,
  message,
} from "antd";
import { useState, useEffect } from "react";
import sendQuery from "../../hooks/sendQuery";
import verificationQuery from "../../hooks/verificationQuery";


const { Option } = Select;

const DeletePage = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState("STUDENT");
  const [data, setData] = useState([]);

  let readQuery = `MATCH (x:${status}) return x`;

  const update = () => {
    form.resetFields();
    sendQuery(readQuery, true).then(function (res) {
      if (res) {
        setData(
          res.map((elem) => {
            if (elem) return elem["_fields"][0].properties;
          })
        );
      }
    });
  } 

  useEffect(() => {
   update()
  }, [status]);

  const handleFinish = (values) => {
    sendQuery(verificationQuery(values)).then(function (res) {
      if (res.length === 0) {
        message.warning({
          content: "User not found",
          style: { marginTop: "6vh" },
        });
      } else if (res.length !== 0) {
        sendQuery(`MATCH (x:${values.status} {email : "${values.email}"}) detach delete x`)
        update()
        form.resetFields();
        message.success({
          content: "Deleted",
          style: { marginTop: "6vh" },
        });
      } else {
        message.error({
          content: "Error : Try again",
          style: { marginTop: "6vh" },
        });
      }
    });
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          status: status,
        }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <h2 align="center">Delete</h2>
        <Form.Item label="Status" name="status" required>
          <Select
            onSelect={(e) => {
              setStatus(e);
            }}
          >
            <Option value="STUDENT">Student</Option>
            <Option value="TEACHER">Teacher</Option>
          </Select>
        </Form.Item>
        <Form.Item label="User" name="email" required>
          <Select
            showSearch
            placeholder="Choose a user"
          >
            {data.map((key) => (
              <Option value={key.email}>
                {key.firstname} {key.lastname} (
                {key.matricule ? key.matricule : key.acronym})
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Delete
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeletePage;
