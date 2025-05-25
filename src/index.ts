import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Hello from http://localhost:${PORT}`);
});
