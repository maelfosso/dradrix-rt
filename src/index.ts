import dotenv from "dotenv";
import { server } from "./app";
import { WhatsAppMessageReceivedListener } from "./events/listeners/whatsapp-message-received-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log('Starting ....');
  dotenv.config();

  if (!process.env.NATS_SERVERS) {
    throw new Error('NATS_SERVERS must be defined');
  }

  const PORT = process.env.PORT || 4000;

  try {
    await natsWrapper.connect(
      process.env.NATS_SERVERS
    );

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
