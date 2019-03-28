const AWS = require("aws-sdk");

const callbackUrl = event =>
  event.requestContext.domainName + "/" + event.requestContext.stage;

const sendMessageToClient = (event, connectionId, deleteConnection) =>
  new Promise(resolve => {
    const apiGwConnection = new AWS.ApiGatewayManagementApi({
      apiVersion: "2029",
      endpoint: callbackUrl(event)
    });
    console.log(event);
    apiGwConnection.postToConnection(
      {
        ConnectionId: connectionId,
        Data: event.body
      },
      (err, data) => {
        console.log(err, data);
        if (err && err.statusCode && err.statusCode === 410) {
          deleteConnection(connectionId).then(response => resolve(response));
        } else {
          resolve(data);
        }
      }
    );
  });

export const socket = { send: sendMessageToClient };
