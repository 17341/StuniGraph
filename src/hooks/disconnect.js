import sendQuery from "./sendQuery"

export default function connect(status,email,password) {
    let query = `MATCH (x:${status}{email : "${email}", password : "${password}"}) SET x.connected = 'false' RETURN x`
    sendQuery(query)
}
