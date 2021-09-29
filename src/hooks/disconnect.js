import sendQuery from "./sendQuery"

export default function connect(status,email) {
    let query = `MATCH (x:${status} {email : "${email}"}) SET x.connected = 'false' RETURN x`
    sendQuery(query)
}
