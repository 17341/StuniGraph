const verificationQuery =  (values) => {
    let type = "STUDENT";
    let id = "matricule"
    if (values.status === "Teacher") {type = "TEACHER"; id = "acronym"}

    return `MATCH (s:${type} { ${id} : "${values.identification}"})
            RETURN
            CASE s.${id}
                WHEN s.${id} IS NULL THEN 0
                ELSE 1
            END AS result`
}
    
export default verificationQuery;