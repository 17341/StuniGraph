import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";
import FilterQueryBuilder from "../hooks/filterQueryBuilder";

const NeoGraph = (props) => {
  const {
    containerId,
    style,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    query,
    filters,
  } = props;
  let newQuery = query;
  const visRef = useRef();

  useEffect(() => {
    if (filters !== null) {
      newQuery = FilterQueryBuilder(filters);
    }

    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      // hierarchical : true,
      // hierarchical_sort_method :"directed",
      // encrypted : "ENCRYPTION_ON",
      // trust : "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
      labels: {
        STUDENT: {
          caption: "firstname",
          title_properties: ["firstname", "lastname", "matricule"],
        },
        TEACHER: {
          caption: "acronym",
          title_properties: ["firstname", "lastname", "acronym", "salary"],
        },
        GRADE: {
          caption: "name",
        },
        COURSE: {
          caption: "code",
        },
        DATE: {
          caption: "year",
        },
      },
      relationships: {
        BELONGS_TO: {
          thickness: "weight",
          caption: false,
        },
        HAS: {
          thickness: "weight",
          caption: false,
        },
        IS_IN: {
          //thickness: "weight",
          caption: false,
        },
        TEACHS: {
          // thickness: "weight",
          caption: false,
        },
        REGISTER_IN: {
          //thickness: "weight",
          caption: false,
        },
      },
    };
    const vis = new Neovis(config);
    vis.updateWithCypher(newQuery);
    vis.render();
  }, [neo4jUri, neo4jUser, neo4jPassword, query, filters]);

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
  query: PropTypes.string.isRequired,
};

export { NeoGraph };
