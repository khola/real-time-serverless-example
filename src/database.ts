const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

const connectionsTable = "connections-table";

const deleteConnection = async connection =>
  ddb
    .delete({
      TableName: connectionsTable,
      Key: { connection: connection }
    })
    .promise();

const addConnection = async connection =>
  ddb
    .put({
      TableName: connectionsTable,
      Item: {
        connection
      }
    })
    .promise();

const dbAvailableConnections = async () =>
  await ddb.scan({ TableName: connectionsTable }).promise();

export const connections = {
  delete: deleteConnection,
  add: addConnection,
  list: dbAvailableConnections
};
