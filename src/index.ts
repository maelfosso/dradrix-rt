import { app } from "./app";

const start = async () => {
  console.log('Starting ....');

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  })
}

start();
