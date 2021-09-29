let response;
let result;
async function sendQuery(query, read = false) {
  const neo4j = require("neo4j-driver");

  const uri = "bolt://d2acb154.databases.neo4j.io";
  const user = "neo4j";
  const password = "WvmsXdVKVexZbLvbgv_qqykN8aU97-Rp0LCgbAlhZhc";

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
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
