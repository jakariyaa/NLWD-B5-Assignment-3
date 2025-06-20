import "dotenv/config";
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

let server: Server;

async function bootstrap() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB at", connection.host);
    server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server \n", error);
  }
}

bootstrap();
