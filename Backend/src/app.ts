import express, { type Express } from "express";
import { config } from "./config/env.config";
import cors from "cors";

export class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares() {
    const corsOptions = {
      origin: config.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    };
    this.app.use(cors(corsOptions));
  }
}
