//  let query = 
//     status == "STUDENT" 
//     ?
//     query = `MERGE (x:${data.get('status')} {firstname: "${data.get('firstName')}",lastname :"${data.get('lastName')}",
//       matricule : "${data.get('identification')}", grade : "${data.get('grade')}",email :"${data.get('email')}", password :"${data.get('password')}"})`
//     :
//     query = `MERGE (x:${data.get('status')} {firstname: "${data.get('firstName')}",lastname :"${data.get('lastName')}", 
//     salary :"${data.get('salary')}",acronym : "${data.get('identification')}",email :"${data.get('email')}", password :"${data.get('password')}"})`

const ReviewPage = () =>{
    return(
        <div style = {{textAlign : "center"}}>
            TO COMPLETE ...
        </div>
    )
}

export default ReviewPage;