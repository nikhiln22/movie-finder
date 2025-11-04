import { container } from "./di/container";
import { inject, injectable } from "tsyringe";
import { IApp } from "./interfaces/Iapp";

@injectable()
export class Server {
  constructor(@inject("IApp") private _appInstance: IApp) {}

  public start(): void {
    this._appInstance.listen();
  }
}

const server = container.resolve(Server);
server.start();
