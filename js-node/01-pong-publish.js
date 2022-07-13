import { connect, StringCodec } from "nats";

// to create a connection to a nats-server:
const servers = [
  {},
  { servers: ["localhost:4442"] },
]

console.log("Connecting to the first server...")
// to create a connection to a nats-server:
const nc = await connect(servers[0]);


// create a codec
const sc = StringCodec();

nc.publish("ping", sc.encode("Hello 👋"));
nc.publish("ping", sc.encode("Morgen 😃"));

// we want to insure that messages that are in flight
// get processed, so we are going to drain the
// connection. Drain is the same as close, but makes
// sure that all messages in flight get seen
// by the iterator. After calling drain on the connection
// the connection closes.
await nc.drain();
