const MongoClient = require('mongodb').MongoClient;

const sourceUri = "mongodb://xxxx:xxxx@xx.xx.xx.one:27017/xx"

const client = new MongoClient(sourceUri, { useNewUrlParser: true });


async function storeCollectionsInStandaloneDBs() {
  try {
    await client.connect();

    const sourceDb = client.db("xx");
    const collections = await sourceDb.listCollections().toArray();

    for (const collectionInfo of collections) {
      if(collectionInfo.name!=="task_log") continue
      console.log(collectionInfo.name)
      const sourceCollection = sourceDb.collection(collectionInfo.name);
      const documents = await sourceCollection.find({}).toArray();
      if(documents.length ==0) continue
      uri = "mongodb://xx.xx.xx.xx:27018/xx"
      const targetClient = new MongoClient(uri, { useNewUrlParser: true });
      await targetClient.connect();

      const targetDb = targetClient.db("taskDB1");
      const targetCollection = targetDb.collection(collectionInfo.name);
      await targetCollection.insertMany(documents).then(()=>{
          console.log("inserted")
      }).catch((err)=>{
        console.log(err)
      })

      await targetClient.close();
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
storeCollectionsInStandaloneDBs()
// searchForFieldsWithDots();
// client.connect(err => {
//   if (err) console.log(err);

//   const db = client.db("taskDb");

//   db.listCollections().toArray((err, collections) => {
//     collections.forEach(collectionInfo => {
//       const collection = db.collection(collectionInfo.name);

//       collection.find({}).forEach(document => {
//         for (const field in document) {
//           if (field.endsWith(".")) {
//             console.log(`Field "${field}" in document "${document._id}" in collection "${collectionInfo.name}" ends with a dot.`);
//           }
//         }
//       });
//     });

//     client.close();
//   });
// });

// sourceClient.connect().then(()=>{
//   let db = sourceClient.db("xx");
//   const collection = client.db("xx").collection("devices");
//   collection.find({}).toArray(function(err, docs) {
//     docs.forEach(function(doc) {
//       Object.keys(doc).forEach(function(key) {
//         if (key.endsWith('.')) {
//           console.log("Field name with a dot: " + key);
//         }
//       });
//     });
// }).catch((err)=>{
//   console.log("error here connection:",err)
// })


// async function checkData(dataCollection){
//   for (let key in dataCollection) {
//     if (key.endsWith(".")) {
//        console.log("*************************************Key : ",key)
//     }
//     if(Array.isArray(dataCollection[key])){
//       for(let i=0;i<dataCollection[key].length;i++){
//         checkData(dataCollection[key][i])
//       }
//     }
//     else if(typeof(dataCollection[key])=='object'){
//         checkData(dataCollection[key])
//       }
//     }
// }

