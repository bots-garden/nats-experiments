// subscribe to "ping" message

import { connect, StringCodec } from "nats";

const servers = [
  {},
  { servers: ["localhost:4442"] },
]

console.log("Connecting to the first server...")
// to create a connection to a nats-server:
const nc = await connect(servers[0]);


// create a codec
const sc = StringCodec();
// create a simple subscriber and iterate over messages
// matching the subscription
const sub = nc.subscribe("ping");
(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
  console.log("subscription closed");
})();

