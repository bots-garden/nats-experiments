/*
nats-server --port 4222 --name alcor --jetstream
nats-server --port 4223 --name actarus --jetstream
*/
import { connect } from "nats"
const servers = [
  {},
  { servers: ["localhost:4442", "localhost:4223"] },
]

await servers.forEach(async (v) => {
  try {
    const nc = await connect(v)
    console.log(`connected to ${nc.getServer()}`)

    console.log(nc.info)

    // this promise indicates the client closed
    const done = nc.closed()
    // do something with the connection

    // close the connection
    await nc.close();
    // check if the close was OK
    const err = await done
    if (err) {
      console.log(`error closing:`, err)
    }
  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(v)}`)
  }
});

