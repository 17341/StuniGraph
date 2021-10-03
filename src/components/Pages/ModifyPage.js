import {
  Select,
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
  TreeSelect,
  message,
} from "antd";
import { useState, useEffect } from "react";
import sendQuery from "../../hooks/sendQuery";
import verificationQuery from "../../hooks/verificationQuery";
import CoursesDict from "../../utils/CoursesDict";
import Courses from "../../utils/Courses";

const { Option } = Select;

const ModifyPage = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState("STUDENT");
  const [selected, setSelected] = useState();
  const [customizePAE, setCustomizePAE] = useState(false);
  const [data, setData] = useState([]);
  // const [options, setOptions] = useState({});
  const [render, setRender] = useState(false);

  let readQuery = `MATCH (x:${status}) return x`;
  
  useEffect(() => {
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
  }, [status]);

  useEffect(() => {
    // data.map((elem) => {
    //   elem["courses"] = [];
    //   if (elem.email === selected) {
    //     let query = `MATCH (s:${status} {email : "${selected}"})`;
    //     query +=
    //       status == "STUDENT"
    //         ? ` OPTIONAL MATCH (s)-[:HAS]->(c:COURSE) RETURN c.code`
    //         : ` OPTIONAL MATCH (s)-[:TEACHS]->(c:COURSE) RETURN c.code`;

    //     sendQuery(query, true).then(function (res) {
    //       if (res) {
    //         elem["courses"] = res.map((key) => {
    //           return key["_fields"][0];
    //         });
    //       }
    //     });
    //   }
    //   setOptions(elem)
    // });
    form.resetFields(["customPAE"]);
    setCustomizePAE(false);

    if (selected) setRender(true);
  }, [selected]);

  const handleFinish = (values) => {
    sendQuery(verificationQuery(values)).then(function (res) {
      if (res.length === 0) {
        message.warning({
          content: "User not found",
          style: { marginTop: "6vh" },
        });
      } else if (res.length !== 0) {
        let relationship = values.status == "STUDENT" ? "HAS" : "TEACHS";
        let query = `MATCH (x:${values.status} {email : "${values.email}"})`;
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            if (key === "courses") {
              sendQuery(
                `${query} MATCH (x)-[r:${relationship}]->(c:COURSE) delete r`
              );
              values[key].forEach((elem) => {
                query += ` MERGE (_${elem}:COURSE {code : "${elem}"}) MERGE (x)-[:${relationship}]->(_${elem})`;
              });
            }
            if (key === "grade") {
              query += ` SET x.grade = "${values.grade}"`;
            }
            if (key === "password") {
              query += ` SET x.password = "${values.password}"`;
            }
            if (key === "salary") {
              query += ` SET x.salary = "${values.salary}"`;
            }
          }
        });
        sendQuery(query);
        message.success({
          content: "Modified",
          style: { marginTop: "6vh" },
        });
        setRender(false);
        setCustomizePAE(false);
        form.resetFields(["email", "customPAE"]);
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
        <Form.Item label="Status" name="status" required>
          <Select
            onSelect={(e) => {
              setStatus(e);
              e !== status ? setRender(false) : setRender(true);
            }}
          >
            <Option value="STUDENT">Student</Option>
            <Option value="TEACHER">Teacher</Option>
          </Select>
        </Form.Item>
        <Form.Item label="User" name="email" required>
          <Select
            onSelect={(e) => {
              setSelected(e);
              e !== selected ? setRender(false) : setRender(true);
            }}
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
        {render ? (
          <>
            {/* <Form.Item label="First Name" name="first_name" required>
              <Input defaultValue={options.firstname} disabled />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name" required>
              <Input defaultValue={options.lastname} disabled />
            </Form.Item>
            <Form.Item label="Email" name="email" required>
              <Input defaultValue={options.email} disabled />
            </Form.Item> */}

            <Form.Item label="Password" name="password" required>
              <Input.Password /*defaultValue={options.password}*/ />
            </Form.Item>

            {status === "STUDENT" ? (
              <>
                <Form.Item label="Grade" name="grade" required>
                  <Select showSearch /*defaultValue={options.grade}*/>
                    {Object.keys(CoursesDict).map((key) => (
                      <Option value={key}>{key}</Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* <Form.Item label="Matricule" name="identification" required>
                  <InputNumber defaultValue={options.matricule} disabled />
                </Form.Item> */}
                <Form.Item
                  label="Customize PAE"
                  valuePropName="checked"
                  name="customPAE"
                >
                  <Switch onChange={(e) => setCustomizePAE(e)} />
                </Form.Item>

                {customizePAE ? (
                  <Form.Item label="Courses" name="courses" required>
                    <TreeSelect
                      multiple
                      showSearch
                      treeData={Courses}
                      /*defaultValue={options.courses}*/
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <Form.Item label="Courses" name="courses" required>
                  <TreeSelect
                    multiple
                    showSearch
                    treeData={Courses}
                    /*defaultValue={options.courses}*/
                  />
                </Form.Item>
                {/* <Form.Item label="Acronym" name="identification" required>
                  <Input defaultValue={options.acronym} disabled />
                </Form.Item> */}
                <Form.Item label="Salary" name="salary">
                  <InputNumber /*defaultValue={options.salary}*/ />
                </Form.Item>
              </>
            )}
            <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default ModifyPage;
