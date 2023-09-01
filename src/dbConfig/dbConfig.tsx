import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB Succcesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongo Db connection error. Please make sure MongoDb is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
