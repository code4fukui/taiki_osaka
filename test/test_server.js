import { Server } from "https://js.sabae.cc/Server.js";

class MyServer extends Server {
  async handleNotFound(req) {
    console.log("req", req, "body", await req.text());
    return super.handleNotFound(req);
  }
}

new MyServer(8020);
