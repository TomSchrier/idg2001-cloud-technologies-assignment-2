// MQTT broker
var mosca = require('mosca');
var settings = { port: 8080 };
var broker = new mosca.Server(settings);
var colors = require('colors');

// MongoDB
var mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@cluster0.j7zur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
broker.on('ready', () => {
  console.log('🟢 Broker is ready.'.green);
});

broker.on("published", (packet) => {
  message = packet.payload.toString();

  console.log(`The broker received this: ${message.blue}`);

  mongo.connect(url, (error, client) => {
    var myCol = client.db('messagesdb').collection('messages'); // DB name and collection name
    myCol.insertOne(
      {
        message: message,
      },
      () => {
        console.log('Data is saved to MongoDB'.green);
        client.close();
      }
    );
  });
});