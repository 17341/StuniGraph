const queryBuilder = (values) =>{
    let query = "";
    if (values.status === "Student"){
        query = `MERGE (s:${values.status.toUpperCase()} {firstname: "${values.first_name}", lastname :"${values.last_name}", matricule : "${values.identification}"}) 
                MERGE (g:GRADE {name : "${values.grade}"})
                MERGE (s)-[r:IS_IN]->(g)`
    }
    else if(values.status === "Teacher") {

    }
    else{}

    return query
}

export default queryBuilder;

