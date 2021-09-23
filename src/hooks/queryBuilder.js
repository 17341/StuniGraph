const courses = require('../utils/Courses');

const queryBuilder = (values) =>{
    let query = "";
    let courses_list = values.courses;
    let relationship = "HAS";

    if (values.status === "Student"){
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}",
                    lastname :"${values.last_name}", matricule : "${values.identification}"}) 
                MERGE (g:GRADE {name : "${values.grade}"}) MERGE (x)-[:IS_IN]->(g)`
        values.customPAE ? courses_list = values.courses : courses_list = courses.default.CoursesDict[values.grade]
    }
    else if(values.status === "Teacher") {
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}", 
                 lastname :"${values.last_name}", acronym : "${values.identification}", salary :"${values.salary}"})`
        relationship = "TEACHS"
    }
    else{}

    courses_list.map(elem => {
        query = query + ` MERGE (_${elem}:COURSE {code : "${elem}", name : "${courses.default.CoursesCodes[elem]}"})
                          MERGE (x)-[:${relationship}]->(_${elem})`
    })

    return query
}

export default queryBuilder;

