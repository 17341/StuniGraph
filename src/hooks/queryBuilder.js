import CoursesDict from "../utils/CoursesDict";

const queryBuilder = (values) =>{
    //console.log(values)
    let query = "";
    let courses_list = values.courses
    let relationship = "HAS";
    
    if (values.status === "STUDENT"){
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}",email : "${values.email}", password : "${values.password}",
                 lastname :"${values.last_name}", matricule : "${values.identification}", grade : "${values.grade}"})`
        values.customPAE ? courses_list = values.courses : courses_list = CoursesDict[values.grade].map(course => {return course.code});
    }
    else if(values.status === "TEACHER") {
        query = `MERGE (x:${values.status.toUpperCase()} {firstname: "${values.first_name}",email : "${values.email}", password : "${values.password}", 
                 lastname :"${values.last_name}", acronym : "${values.identification}", salary :"${values.salary}"})`
        relationship = "TEACHS"
    }
    else{}

    courses_list.map(elem => {
        let name
        let credits
        let hours
        let classroom
        Object.keys(CoursesDict).map( grade => CoursesDict[grade]
            .map( course => { if(course.code ==elem) { name = course.name;credits = course.credits; hours = course.hours; classroom = course.classroom } }) )
        query = query + ` MERGE (_${elem}:COURSE {code : "${elem}", name : "${name}", credits : "${credits}", hours : "${hours}", classroom : "${classroom}"})
                          MERGE (x)-[:${relationship}]->(_${elem})`
    })                   
    return query
}

export default queryBuilder;

