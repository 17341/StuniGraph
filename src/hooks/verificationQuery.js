const verificationQuery =  (values, login = false) => {
    let subQuery 
    let query

    login ? subQuery = `(s:${values.status} { email : "${values.email}", password :"${values.password}"})` 
    : subQuery = `(s:${values.status} { email : "${values.email}"})`

    query = `MATCH ${subQuery}
        RETURN
        CASE s.email
            WHEN s.email IS NULL THEN 0
            ELSE 1
        END AS result`
            
    //console.log(query)
    return query
}
    
export default verificationQuery;