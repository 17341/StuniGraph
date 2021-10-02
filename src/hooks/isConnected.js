import { useState } from "react";
import sendQuery from "./sendQuery"

const IsConnected = (status, email,password) => {
    const [connected, setConnected] = useState()
    let query = `MATCH (x:${status} {email : "${email}", password : "${password}", connected : "true"}) RETURN x`
    sendQuery(query, true).then(function (res) {
        if (res.length === 0) {
            setConnected(false)
        } else if (res.length  !== 0) {
            setConnected(true)
        } else {
            console.log("Error : Try again");
        }
    });
    return connected
}

export default IsConnected;
