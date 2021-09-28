import { useState } from "react";
import sendQuery from "./sendQuery"

const IsConnected = (status, email) => {
    const [connected, setConnected] = useState()
    let query = `MATCH (x:${status} {email : "${email}", connected : "true"}) RETURN x`
    sendQuery(query, true).then(function (res) {
        if (res === "New") {
            setConnected(false)
        } else if (res === "Found") {
            setConnected(true)
        } else {
            console.log("Error : Try again");
        }
    });
    return connected
}

export default IsConnected;
