const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

const connectionsTable = "connections-table";

const deleteConnection = connection =>
  ddb
    .delete({
      TableName: connectionsTable,
      Key: { connection }
    })
    .promise();

const addConnection = connection =>
  ddb
    .put({
      TableName: connectionsTable,
      Item: {
        connection
      }
    })
    .promise();

const dbAvailableConnections = () => ddb.scan({ TableName: connectionsTable }).promise();

export const connections = {
  delete: deleteConnection,
  add: addConnection,
  list: dbAvailableConnections
};
