import React from "react";
import { NeoGraph} from "../NeoGraph";

const NEO4J_URI = "bolt://172b9f24.databases.neo4j.io/browser/";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "ynouCqeLqW6bYVIgndyceZj1ot9Zbv9ua3pxArR3D7s";

const ViewPage= () => {
  return (
    <div >
      <h1>React Neovis Example</h1>
      <NeoGraph
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        backgroundColor={"#b2beb5"}
      />
    </div>
  );
};

export default ViewPage;