const MongoClient = require('mongodb').MongoClient;

const sourceUri = "mongodb://xxx:xxx@mongodb.dev.xx.xx:27017/xx"

const client = new MongoClient(sourceUri, { useNewUrlParser: true });


async function searchForFieldsWithDots() {
  try {
    await client.connect();

    const db = client.db("xx");
    const collections = await db.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collection = db.collection(collectionInfo.name);
      const documents = await collection.find({}).toArray();

      for (const document of documents) {
        checkForFieldsWithDots(document);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function checkForFieldsWithDots(obj) {
  for (const field in obj) {
    if(Array.isArray(obj[field])){
      for(let i=0;i<obj[field].length;i++){
        checkForFieldsWithDots(obj[field][i])
      }
    }
    else if(typeof(obj[field])=='object'){
      checkForFieldsWithDots(obj[field])
      }
    else if(field === "" ) {
      console.log(`Empty string. in obj ${JSON.stringify(obj, null, 2)}`);
    }
  }
}

searchForFieldsWithDots();