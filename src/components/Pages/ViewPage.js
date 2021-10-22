import { React, useState } from "react";
import { NeoGraph } from "../NeoGraph";
import Filter from "../Filter";
import { Button } from "antd";
import { BsFilter } from "react-icons/bs";

const credentials = require('../../utils/Credentials.json')

const ViewPage = ({ query, filterButton = true }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [color, setColor] = useState("black");
  const [filters, setFilters] = useState(null);

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
      {showFilter ? <Filter setFilters = {setFilters}/> : ""}
      <NeoGraph
        containerId={"id1"}
        neo4jUri={credentials.uri}
        neo4jUser={credentials.user}
        neo4jPassword={credentials.password}
        style={{
          height: `600px`,
        }}
        query={query}
        filters =  {filters}
      />
    </div>
  );
};

export default ViewPage;
