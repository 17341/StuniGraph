const courses = require('../utils/Courses');

const queryBuilder = (values) =>{
    console.log(values)
    let query = "";
    let courses_list = values.courses;
    let relationship = "HAS";

    if (values.status === "Student"){
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}",
                 lastname :"${values.last_name}", matricule : "${values.identification}", grade : "${values.grade}"})`
        values.customPAE ? courses_list = values.courses : courses_list = courses.default.CoursesDict[values.grade]
    }
    else if(values.status === "Teacher") {
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}", 
                 lastname :"${values.last_name}", acronym : "${values.identification}", salary :"${values.salary}"})`
        relationship = "TEACHS"
    }
    else{}

    // let listGrade = ["1BA","2BA","3BE","3BM","3BS","4MEM",'4MAU','4MCO','4MGE','4MIS','4MBA','4MEO','4MIN',
    // '5MEM','5MAU','5MIN','5MCO','5MGE','5MIS','5MBA','5MEO','5MIC']

    courses_list.map(elem => {
        // let grade = Object.keys(courses.default.CoursesDict).find(key => courses.default.CoursesDict[key].includes(elem))
        // if (listGrade.includes(grade)) {
        //     console.log("testtt")
        //     query = query + ` MERGE (_${grade}:GRADE {name : "${grade}"})`
        //     listGrade.splice(listGrade.indexOf(grade),1)
        // }
        query = query + ` MERGE (_${elem}:COURSE {code : "${elem}", name : "${courses.default.CoursesCodes[elem]}"})
                          MERGE (x)-[:${relationship}]->(_${elem})`
                          //MERGE (_${elem})-[:BELONGS_TO]->(_${grade})
    })

    // if (values.status === "Student") query = query + `MERGE (x)-[:IS_IN]->(_${values.grade})` 
                          
    return query
}

export default queryBuilder;

