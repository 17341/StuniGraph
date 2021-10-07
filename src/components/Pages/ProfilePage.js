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
  const [hours, setHours] = useState(0);
  const [credits, setCredits] = useState(0);

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
      let totalCredits = 0
      let totalHours = 0
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
                totalCredits += parseInt(course.credits)
                totalHours +=  parseInt(course.hours)
              }
            }
          });
        });
      });
      setHours(totalHours)
      setCredits(totalCredits)
      setValues(data);
    });
  }, []);

  return connected ? (
    <>
      {properties ? (
        <>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>
              {" "}
              Name : {properties.firstname} {properties.lastname}{" "}
            </h4>
            <h4>Matricule : {properties.matricule}</h4>
            <h4>Email : {properties.email}</h4>
            <h4>Grade : {properties.grade}</h4>
            <h4>Year : 20{properties.matricule.slice(0, 2)}</h4>
            <Avatar sx={{ bgcolor:"blue" }}>
              {properties ? properties.firstname.slice(0, 1) : "U"}
            </Avatar>
          </div>
          <h2 align="center">My Courses</h2>
          <Table columns={columns} dataSource={values} size="small" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: "30px",
            }}
          >
            <h4>Total Hours : {hours} hours </h4>
            <h4>Total Credits : {credits} credits </h4>
          </div>
          <h2 align="center">Where am I ? </h2>
          <ViewPage
            query={`MATCH (n: ${Cookies.get("status")} {email : "${Cookies.get(
              "email"
            )}"})-[r]->(m) RETURN *`}
            filterButton={false}
          />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
