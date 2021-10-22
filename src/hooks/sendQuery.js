let response;
let result;
const credentials = require('../utils/Credentials.json')
async function sendQuery(query, read = false) {
  const neo4j = require("neo4j-driver");
  const driver = neo4j.driver(credentials.uri, neo4j.auth.basic(credentials.user, credentials.password));
  const session = driver.session();

  try {
    if (read) {
      result = await session.readTransaction((tx) => tx.run(query));
    } else {
      result = await session.writeTransaction((tx) => tx.run(query));
    }
    response = result.records;
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
