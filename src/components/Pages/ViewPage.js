import { React, useState } from "react";
import { NeoGraph } from "../NeoGraph";
import Filter from "../Filter";
import { Button } from "antd";
import { BsFilter } from "react-icons/bs";

const NEO4J_URI = "bolt://d2acb154.databases.neo4j.io";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "WvmsXdVKVexZbLvbgv_qqykN8aU97-Rp0LCgbAlhZhc";

// const NEO4J_URI = "bolt://localhost:7687/neo4j";
// const NEO4J_USER = "neo4j";
// const NEO4J_PASSWORD = "1234";

const ViewPage = ({ query, filterButton = true }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [color, setColor] = useState("black");

  return (
    <div>
      {filterButton ? (
        <Button
          style={{
            marginBottom: "20px",
          }}
          onClick={() => {
            if (showFilter) {
              setShowFilter(false);
              setColor("black");
            } else {
              setShowFilter(true);
              setColor("red");
            }
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
                color: color,
              }}
            />
          }
        ></Button>
      ) : (
        ""
      )}
      {showFilter ? <Filter /> : ""}
      <NeoGraph
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        style={{
          height: `600px`,
        }}
        query={query}
      />
    </div>
  );
};

export default ViewPage;
