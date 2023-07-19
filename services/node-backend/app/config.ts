import * as dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num(),
  APP_NAME: str(),
  NODE_ENV: str(),
});
