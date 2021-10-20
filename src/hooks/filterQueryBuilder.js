const FilterQueryBuilder = (filters) => {
  console.log(filters);
  let query = "";
  if (filters.length !== 0) {
    query = `MATCH (x:${filters.status})-[r]->(m) `;
    
    if (filters.grade) {
      if (filters.grade.length > 1) {
        query += " WHERE";
        filters.grade.forEach((element) => {
          query += ` x.grade = '${element}' or`;
        });
        query = query.slice(0, -2);
      } else if (filters.grade.length === 1) {
        query += `WHERE x.grade = '${filters.grade[0]}'`;
      }
    }

    if (filters.email) {
      if (filters.email.length > 1) {
        query += " WHERE";
        filters.email.forEach((element) => {
          query += ` x.email = '${element}' or`;
        });
        query = query.slice(0, -2);
      } else if (filters.email.length === 1) {
        query += `WHERE x.email = '${filters.email[0]}'`;
      }
    }

    query += " RETURN *";
  } else {
    query = `MATCH (n)-[r]->(m) RETURN *`;
  }
  console.log(query);
  return query;
};
export default FilterQueryBuilder;
