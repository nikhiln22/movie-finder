import dotenv from "dotenv";
dotenv.config({ quiet: true });

interface IConfig {
  PORT: number;
  CLIENT_URL: string;
}

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  CLIENT_URL: process.env.CLIENT_URL as string,
};
