import { React, useState } from "react";
import { NeoGraph} from "../NeoGraph";
import Filter from "../Filter";
import { Button } from "antd";
import { BsFilter } from "react-icons/bs";

const NEO4J_URI = "bolt://localhost:7687/neo4j";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "1234";

const ViewPage= () => {
  const [showFilter, setShowFilter] = useState(false)
  const [color, setColor] = useState("black")

  return (
    <div >
      <Button
            style={{
              marginBottom: "20px"
            }}
            onClick={() => {
              if (showFilter){setShowFilter(false);setColor("black")} 
              else {setShowFilter(true); setColor("red")}
            }}
            shape="circle"
            icon={
              <BsFilter
                style={{
                  fontSize: "110%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "6px",
                  color : color
                }}
              />
            }
      ></Button>
      {showFilter ? <Filter/> : ""}
      <NeoGraph
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        style={{
          width: `1000px`,
          height: `800px`,
          borderRadius: "20px",
          boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
          padding: '20px',
          backgroundColor: 'white'
      }}
      />
    </div>
  );
};

export default ViewPage;