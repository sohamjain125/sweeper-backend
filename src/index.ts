import app from "./app";
import config from "./config";
import { connectToDatabase } from "./core/scripts/db.connection";
import { createServer } from "http";


const PORT = config.PORT ?? 8080;
const server = createServer(app);


// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectToDatabase();
});