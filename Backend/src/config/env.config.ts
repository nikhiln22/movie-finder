import dotenv from "dotenv";
dotenv.config({ quiet: true });

interface IConfig {
  PORT: number;
  CLIENT_URL: string;
  OMDB_BASE_URL: string;
  OMDB_API_KEY: string;
}

function validateEnvVars(): void {
  const requiredEnvVars = [
    "PORT",
    "CLIENT_URL",
    "OMDB_BASE_URL",
    "OMDB_API_KEY",
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(`missing required environment variable:${envVar}`);
    }
  });
}

validateEnvVars();

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  CLIENT_URL: process.env.CLIENT_URL as string,
  OMDB_BASE_URL: process.env.OMDB_BASE_URL as string,
  OMDB_API_KEY: process.env.OMDB_API_KEY as string,
};
