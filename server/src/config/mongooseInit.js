import { connect } from "mongoose";

import { LocalDB_URL } from "./constants.js";

export default async function mongooseInit() {
  try {
    await connect(LocalDB_URL, { dbName: "GaragiX" });

    console.log("Successfully connect to local database!");
  } catch (error) {
    console.log("Failed to connect to local database!");
    console.log(error.message);

    try {
      await connect(process.env.CLOUD_DB_URL, { dbName: "GaragiX" });

      console.log("Successfully connect to cloud database!");
    } catch (error) {
      console.log("Failed to connect to cloud database!");
      console.log(error.message);
    }
  }
}
