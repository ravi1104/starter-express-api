import server from "./index.js";
import { connectToDb } from "./src/config/db.js";

server.listen(process.env.PORT|| 3000, async () => {
  await connectToDb();
  console.log(`connected to local host ${3000} or server`)
});
