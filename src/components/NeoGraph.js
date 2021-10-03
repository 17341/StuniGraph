import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

const NeoGraph = (props) => {
  const { containerId, style, neo4jUri, neo4jUser, neo4jPassword } = props;

  const visRef = useRef();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      // hierarchical : true,
      // hierarchical_sort_method :"directed",
      encrypted : "ENCRYPTION_ON",
      trust : "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
      labels: {
        STUDENT: {
          caption: "firstname",
        },
        TEACHER: {
          caption: "acronym",
        },
        GRADE: {
          caption: "name",
        },
        COURSE: {
          caption: "code",
        },
      },
      relationships: {
        BELONGS_TO: {
          thickness: "weight",
          caption: true,
        },
        HAS: {
          thickness: "weight",
          caption: true,
        },
        IS_IN: {
          thickness: "weight",
          caption: true,
        },
        TEACHS: {
          thickness: "weight",
          caption: true,
        },
      },
      initial_cypher: "MATCH (n)-[r]->(m) RETURN *",
    };
    const vis = new Neovis(config);
    vis.render();
  }, [neo4jUri, neo4jUser, neo4jPassword]);

  return (
    <>
      <div id={containerId} ref={visRef} style={style} />
    </>
  );
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

export { NeoGraph };
