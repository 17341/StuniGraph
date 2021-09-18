const sendQuery = (query, read = false) =>{
    (async() => {
        const neo4j = require('neo4j-driver')
        
        const uri = 'neo4j+s://172b9f24.databases.neo4j.io';
        const user = 'neo4j';
        const password = 'ynouCqeLqW6bYVIgndyceZj1ot9Zbv9ua3pxArR3D7s';
        
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
        const session = driver.session()

        try {
            if (read){
                
                const readResult = await session.readTransaction(tx =>
                    tx.run(query)
                )
                readResult.records.forEach(record => {
                    console.log(record)
                })
            }
            else {
                const result = await session.writeTransaction(tx =>
                    tx.run(query)
                )
                result.records.forEach(record => {
                    console.log(record)
                })
            }
        } catch (error) {
            console.error('Something went wrong: ', error)
        } finally {
            await session.close()
        }  
        await driver.close()
    })();
}   
export default sendQuery;