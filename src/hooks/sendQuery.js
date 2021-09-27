let response;
let result;
async function sendQuery(query, read = false) {
  const neo4j = require("neo4j-driver");

  const uri = "bolt://localhost:7687/neo4j";
  const user = "neo4j";
  const password = "1234";

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    if (read) {
      result = await session.readTransaction((tx) => tx.run(query));
    } else {
      result = await session.writeTransaction((tx) => tx.run(query));
    }
    result.records.length !== 0 ? (response = "Found") : (response = "New");
  } catch (error) {
    console.error("Something went wrong: ", error);
    response = "Error";
  } finally {
    await session.close();
  }
  await driver.close();
  return response;
}

export default sendQuery;
