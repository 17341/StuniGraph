import { Table, Tag, Space } from "antd";
import CoursesDict from "../../utils/CoursesDict";

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
            code = course.code
          }
        })
      })
      return <a href={`https://plus.ecam.be/public/fiche/2021/${code}`} target="_blank" rel="noreferrer" >{text}</a>
    }
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
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <button>Delete</button>
      </Space>
    ),
  },
];

const ReviewPage = () => {
  const values = JSON.parse(window.localStorage.getItem("registerQuery"));
  let data = [];

  if (!values.customPAE && values.status === "STUDENT") {
    let i = 0;
    //console.log(values);
    CoursesDict[values.grade].forEach((course) => {
      i += 1;
      data.push({
        key: i,
        name: course.name,
        code: course.code,
        credits: course.credits,
        hours: course.hours,
      });
    });
  } else {
    let i = 0;
    values.courses.forEach((elem) => {
      Object.keys(CoursesDict).forEach((key) => {
        CoursesDict[key].forEach((course) => {
          if (course.code === elem) {
            //console.log(course);
            i += 1;
            data.push({
              key: i,
              name: course.name,
              code: course.code,
              credits: course.credits,
              hours: course.hours,
            });
          }
        });
      });
    });
  }
  //console.log(data);

  return (
    <div style={{ textAlign: "center" }}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ReviewPage;
