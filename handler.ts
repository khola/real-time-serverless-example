import { connections } from "./src/database";
import { socket } from "./src/socket";

const success = {
  statusCode: 200,
  body: ""
};

export const connect = async event => {
  await connections.add(event.requestContext.connectionId);
  return success;
};

export const disconnect = async event => {
  await connections.delete(event.requestContext.connectionId);
  return success;
};

export const message = async event => {
  const dbAvailableConnections = await connections.list();
  const pushMessagesToConnections = dbAvailableConnections.Items.map(item =>
    socket.send(event, item.connection, connections.add)
  );
  await Promise.all(pushMessagesToConnections);
  return success;
};
