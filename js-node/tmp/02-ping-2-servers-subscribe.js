// subscribe to "ping" message

import { connect, StringCodec } from "nats";

const servers = [
  {},
  { servers: ["localhost:4442", "localhost:4223"] }
];

console.log("Connecting to the first server...");
// to create a connection to a nats-server:
const natsConnection01 = await connect(servers[0]);

console.log("Connecting to the second server...");
const natsConnection02 = await connect(servers[1]);


// create a codec
const stringCodec = StringCodec();
// create a simple subscriber and iterate over messages
// matching the subscription
const subscriber01 = natsConnection01.subscribe("ping");

(async () => {
  for await (const message of subscriber01) {
    console.log(`[${subscriber01.getProcessed()}]: ${stringCodec.decode(message.data)}`);
  }
  console.log("subscription closed");
})();


const subscriber02 = natsConnection02.subscribe("ping");

(async () => {
  for await (const message of subscriber02) {
    console.log(`[${subscriber02.getProcessed()}]: ${stringCodec.decode(message.data)}`)
  }
  console.log("subscription closed");
})();
