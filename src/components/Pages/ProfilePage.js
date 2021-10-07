import sendQuery from "../../hooks/sendQuery";
import IsConnected from "../../hooks/isConnected";
import Cookies from "js-cookie";
import ViewPage from "./ViewPage";
import { Table, Tag, Space } from "antd";
import LoadingPage from "./LoadingPage";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CoursesDict from "../../utils/CoursesDict";

const ProfilePage = () => {
  const [name, setName] = useState("Unknown");
  const [properties, setProperties] = useState();
  const [values, setValues] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        let code;
        Object.keys(CoursesDict).forEach((key) => {
          CoursesDict[key].forEach((course) => {
            if (course.name === text) {
              code = course.code;
            }
          });
        });
        return (
          <a
            href={`https://plus.ecam.be/public/fiche/2021/${code}`}
            target="_blank"
            rel="noreferrer"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    //add classroom
    {
      title: "Hours",
      key: "hours",
      dataIndex: "hours",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => (
    //     <Space size="middle">
    //       <button>Delete</button>
    //     </Space>
    //   ),
    // },
  ];

  let connected = IsConnected(
    Cookies.get("status"),
    Cookies.get("email"),
    Cookies.get("password")
  );

  let query = `MATCH (s:${Cookies.get("status")} {email : "${Cookies.get(
    "email"
  )}"})`;
  query +=
    Cookies.get("status") == "STUDENT"
      ? ` OPTIONAL MATCH (s)-[:HAS]->(c:COURSE) RETURN c.code,s`
      : ` OPTIONAL MATCH (s)-[:TEACHS]->(c:COURSE) RETURN c.code,s`;

  useEffect(() => {
    sendQuery(query).then(function (res) {
      setProperties(res[0]["_fields"][1].properties);
      let i = 0;
      let data = [];
      let courses = [];
      res.forEach((elem) => {
        Object.keys(CoursesDict).forEach((key) => {
          CoursesDict[key].forEach((course) => {
            if (course.code === elem["_fields"][0]) {
              i += 1;
              if (!courses.includes(course.code)) {
                courses.push(course.code);
                data.push({
                  key: i,
                  name: course.name,
                  code: course.code,
                  credits: course.credits,
                  hours: course.hours,
                });
              }
            }
          });
        });
      });
      setValues(data);
    });
  }, []);

  return connected ? (
    <>
      {properties ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "30px"
          }}
        >
          <h3>
            Name : {properties.firstname} {properties.lastname}
          </h3>
          <h3>Grade : {properties.grade}</h3>
          <h3>Year : 20{properties.matricule.slice(0, 2)}</h3>
          <h3>Matricule : {properties.matricule}</h3>
          <h3>Email : {properties.email}</h3>
          <Avatar>{properties ? properties.firstname.slice(0, 1) : "U"}</Avatar>
        </div>
      ) : (
        <LoadingPage />
      )}
      <h2 align="center">Courses Taken</h2>
      <Table columns={columns} dataSource={values} size="small" />
      <h2 align="center">Graph Vizualisation</h2>
      <ViewPage
        query={`MATCH (n: ${Cookies.get("status")} {email : "${Cookies.get(
          "email"
        )}"})-[r]->(m) RETURN *`}
        filterButton={false}
      />
    </>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
