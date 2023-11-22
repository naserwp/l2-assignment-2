import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
// import app from "./app";
// import dotenv from "dotenv";

/*
async function main() {
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}
*/
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      console.log('server is working fine/ababa');
    });
  } catch (err) {
    console.log(err);
    //   console.log(error);
  }
}

main();
