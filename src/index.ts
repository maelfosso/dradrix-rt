import dotenv from "dotenv";
import { server } from "./app";
import { WhatsAppMessageReceivedListener } from "./events/listeners/whatsapp-message-received-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log('Starting ....');
  dotenv.config();

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if (!process.env.NATS_SERVERS) {
    throw new Error('NATS_SERVERS must be defined');
  }

  const PORT = process.env.PORT || 4000;

  try {
    await natsWrapper.connect(
      process.env.NATS_SERVERS
      // process.env.NATS_CLUSTER_ID,
      // process.env.NATS_CLIENT_ID,
      // process.env.NATS_URL
    );

    // natsWrapper.nc.on('close', () => {
    //   console.log('NATS listener closed');
    //   process.exit();
    // });

    process.on('SIGINT', () => natsWrapper.nc.close());
    process.on('SIGTERM', () => natsWrapper.nc.close());

    new WhatsAppMessageReceivedListener(natsWrapper.jsm, natsWrapper.nc.jetstream()).listen();
  } catch (error) {
    console.log(error);
  }

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  })
}

start();
