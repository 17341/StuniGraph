import CoursesDict from "../utils/CoursesDict";

const queryBuilder = (values) => {
  let query = "";
  let courses_list = values.courses;
  let relationship = "HAS";
  let customPAE = values.customPAE;

  if (values.status === "STUDENT") {
    query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${
      values.first_name
    }",email : "${values.email}", password : "${values.password}",
                 lastname :"${values.last_name}", matricule : "${
      values.identification
    }", grade : "${values.grade}", connected :"true"}) MERGE (d:DATE {year : "20${values.identification.substring(0,2)}"})`;
    customPAE
      ? (courses_list = values.courses)
      : (courses_list = CoursesDict[values.grade].map((course) => {
          return course.code;
        }));
  } else if (values.status === "TEACHER") {
    query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${
      values.first_name
    }",email : "${values.email}", password : "${values.password}", 
                 lastname :"${values.last_name}", acronym : "${
      values.identification
    }", salary :"${values.salary}", connected :"true"})`;
    relationship = "TEACHS";
  } else {
  }
  let listGrade = [
    "1BA",
    "2BA",
    "3BE",
    "3BM",
    "3BS",
    "3BC",
    "4MEM",
    "4MAU",
    "4MCO",
    "4MGE",
    "4MIS",
    "4MBA",
    "4MEO",
    "4MIN",
    "5MEM",
    "5MAU",
    "5MIN",
    "5MCO",
    "5MGE",
    "5MIS",
    "5MBA",
    "5MEO",
    "5MIC",
  ];

  courses_list.forEach((elem) => {
    let name;
    let credits;
    let hours;
    let classroom;
    let grade;
    Object.keys(CoursesDict).forEach((key) => {
      if (listGrade.includes(key)) {
        query = query + ` MERGE (_${key}:GRADE {name : "${key}"})`;
        listGrade.splice(listGrade.indexOf(key), 1);
      }
      CoursesDict[key].forEach((course) => {
        if (course.code === elem) {
          grade = key;
          name = course.name;
          credits = course.credits;
          hours = course.hours;
          classroom = course.classroom;
        }
      });
    });
    query =
      query +
      ` MERGE (_${elem}:COURSE {code : "${elem}", name : "${name}", credits : "${credits}", hours : "${hours}", classroom : "${classroom}"})
                          MERGE (x)-[:${relationship}]->(_${elem}) MERGE (_${elem})-[:BELONGS_TO]->(_${grade})`;
  });
  if (values.status === "STUDENT")
    query = query + `MERGE (x)-[:IS_IN]->(_${values.grade}) MERGE (x)-[:REGISTER_IN]->(d)`;
  return query;
};

export default queryBuilder;
