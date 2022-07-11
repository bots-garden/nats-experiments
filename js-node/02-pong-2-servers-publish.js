import { connect, StringCodec } from "nats";

// to create a connection to a nats-server:
const servers = [
  {},
  { servers: ["localhost:4442", "localhost:4223"] },
];

// create a codec
const stringCodec = StringCodec();

await servers.forEach(async (server) => {
  console.log("Connecting to the server...");
  const natsConnection = await connect(server);
  console.log(`👋 connected to ${natsConnection.getServer()} (${natsConnection.info.server_name})`);
  //console.log(`🌍`, natsConnection.info);

  natsConnection.publish("ping", stringCodec.encode("👋"));
  natsConnection.publish("ping", stringCodec.encode("hello"));
  natsConnection.publish("ping", stringCodec.encode("world"));
  natsConnection.publish("ping", stringCodec.encode("🌍"));

  await natsConnection.drain();
})





