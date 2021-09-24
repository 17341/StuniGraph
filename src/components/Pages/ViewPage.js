import React from "react";
import { NeoGraph} from "../NeoGraph";

const NEO4J_URI = "bolt://localhost:7687/neo4j";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "1234";

const ViewPage= () => {
  return (
    <div >
      <NeoGraph
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        backgroundColor={"#f7faf8"}
      />
    </div>
  );
};

export default ViewPage;