// subscribe to "ping" message

import { connect, StringCodec } from "nats";

const servers = [
  {},
  { servers: ["localhost:4442", "localhost:4223"] }
];

// create a codec
const stringCodec = StringCodec();

await servers.forEach(async (server) => {
  console.log("Connecting to the server...");
  const natsConnection = await connect(server);
  console.log(`👋 connected to ${natsConnection.getServer()} (${natsConnection.info.server_name})`)
  //console.log(`🌍`, natsConnection.info)

  // create a simple subscriber and iterate over messages
  // matching the subscription
  const subscriber = natsConnection.subscribe("ping");

  (async () => {
    for await (const message of subscriber) {
      console.log(`${natsConnection.info.server_name}:[${subscriber.getProcessed()}]: ${stringCodec.decode(message.data)}`);
    }
    console.log("subscription closed");
  })();

});
