import React, { useState, useEffect } from "react";
import { Form, Button, Select, TreeSelect, InputNumber } from "antd";
import Courses from "../utils/Courses";
import CoursesDict from "../utils/CoursesDict";
import sendQuery from "../hooks/sendQuery";

const { Option } = Select;

const Filter = ({ setFilters }) => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState("STUDENT");
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState("grade");
  const handleClick = (e) => {
    setFilters(e);
  };
  const handleChange = (e) => {
    if (e[0]) {
      if (e[0].name[0] === "status") setStatus(e[0].value);
    }
  };

  let readQuery = `MATCH (x:${status}) return x`;

  const update = () => {
    sendQuery(readQuery, true).then(function (res) {
      if (res) {
        setData(
          res.map((elem) => {
            if (elem) return elem["_fields"][0].properties;
          })
        );
      }
    });
  };

  useEffect(() => {
    form.resetFields();
    update();
  }, [status]);

  return (
    <>
      <Form
        form={form}
        layout="inline"
        style={{
          borderRadius: "20px",
          boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
          padding: "20px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
        onFinish={handleClick}
        onFieldsChange={handleChange}
        initialValues={{ status: status,type : filterType }}
      >
        <Form.Item
          label="Status"
          name="status"
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
        >
          <Select>
            <Option value="STUDENT">Student</Option>
            <Option value="TEACHER">Teacher</Option>
          </Select>
        </Form.Item>
        {status === "STUDENT" ? (
          <>
            <Form.Item
              label="Filter by"
              name="type"
              labelCol={{ span: 20 }}
              wrapperCol={{ span: 20 }}
              style={{ marginLeft: 30, width: 100 }}
            >
              <Select onChange={(e) => setFilterType(e)}>
                <Option value="grade">Grade</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            {filterType === "grade" ? (
              <Form.Item
                label="Grade"
                name="grade"
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
                style={{ marginLeft: 40, width: 100 }}
              >
                <Select showSearch mode="multiple">
                  {Object.keys(CoursesDict).map((key) => (
                    <Option value={key}>{key}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                label="User"
                name="email"
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
                style={{ marginLeft: 40, width: 300 }}
              >
                <Select showSearch placeholder="Choose a user" mode="multiple">
                  {data.map((key) => (
                    <Option value={key.email}>
                      {key.firstname} {key.lastname} (
                      {key.matricule ? key.matricule : key.acronym})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </>
        ) : (
          <>
            <Form.Item
              label="Salary"
              name="salary"
              labelCol={{ span: 20 }}
              wrapperCol={{ span: 20 }}
              style={{ marginLeft: 30, width: 220 }}
            >
              <Select showSearch mode="multiple" disabled>
                <Option value={[1000]}>Under 1000 €</Option>
                <Option value={[1000, 2000]}>Between 1000-2000 €</Option>
                <Option value={[3000, 4000]}>Between 2000-3000 €</Option>
                <Option value={[3000, 4000]}>Between 3000-4000 €</Option>
                <Option value={[5000, 10000]}>Between 5000-10000 €</Option>
                <Option value={[10000]}>Over 10000 €</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="User"
              name="email"
              labelCol={{ span: 20 }}
              wrapperCol={{ span: 20 }}
              style={{ marginLeft: 30, width: 300 }}
            >
              <Select showSearch placeholder="Choose a user" mode="multiple">
                {data.map((key) => (
                  <Option value={key.email}>
                    {key.firstname} {key.lastname} (
                    {key.matricule ? key.matricule : key.acronym})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}
        {/* <Form.Item
          label="Courses"
          name="courses"
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          style={{ marginLeft: 30, width: 300 }}
        >
          <TreeSelect multiple showSearch treeData={Courses} disabled />
        </Form.Item> */}
        <Form.Item
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          style={{ marginLeft: "50px" }}
        >
          <Button
            style={{ borderRadius: "20px" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          style={{ marginLeft: "50px" }}
        >
          <Button
            onClick={() => {
              form.resetFields();
              setFilters([]);
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Filter;
