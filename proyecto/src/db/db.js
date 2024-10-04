const cassandra = require('cassandra-driver');
const host = process.env.CASSANDRA_HOST || "127.0.0.1";
// Configura la conexión a la base de datos de Cassandra
const client = new cassandra.Client({
  contactPoints: [host], // Cambia a la dirección de tu nodo de Cassandra
  localDataCenter: 'datacenter1', // Cambia al nombre de tu datacenter,
  keyspace: "proyecto_bases2"
});

module.exports = { client };