import http from "http";
import { routeRequest } from "./routes/imgRoutes.js";
const host = "127.0.0.1";
const port = 3000;
// init server
const server = http.createServer((req, res) => {
    routeRequest(req, res);
});
// listen
server.listen(port, host, () => {
    console.log(`Server running at PORT:${port}`);
});
