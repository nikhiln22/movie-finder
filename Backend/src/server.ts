import { App } from "./app";
import { config } from "./config/env.config";

export class Server {
  private appInstance: App;

  constructor() {
    this.appInstance = new App();
  }

  public start() {
    try {
      const app = this.appInstance.app;
      app.listen(config.PORT, () => {
        console.log(
          `Movie-Finder server is running on http://localhost:${config.PORT}`
        );
      });
    } catch (error) {
      console.log("error occured while connecting server", error);
    }
  }
}

const server = new Server();
server.start();
