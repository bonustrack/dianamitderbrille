import { Server} from 'ws';
import { justsaying } from './ws';

class Router {
  public routes: object = {};
  public wss: Server;

  add(command, res) {
    this.routes[command] = res;
  }

  render(command, params, tag, ws) {
    if (typeof this.routes[command] === 'function') {
      this.routes[command](params, tag, ws);
    }
  }

  notify(id, subject, body) {
    this.wss.clients.forEach((ws) => {
      if (ws.id === id) justsaying(ws, subject, body);
    });
  }
}

export default new Router();
