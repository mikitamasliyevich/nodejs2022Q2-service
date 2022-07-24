import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

dotenv.config();

export default{
    type: "postgres" as string,
    host: "localhost" as string,
    port: parseInt(process.env.DATABASE_PORT as string, 10) as number,
    username: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    synchronize: true,
    entities: ["dist/**/entities/*.entity.js"],
    migrations: ["dist/**/migration/*.js"],
    migrationsRun: true
  } as DataSourceOptions