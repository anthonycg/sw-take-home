import http from "http";
import { routeRequest } from "./routes/imgRoutes.js";
import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

//manually define due to use of ES modules
// get current url
const __filename = fileURLToPath(import.meta.url);
// extract directory from path
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });

const host = "127.0.0.1";
const port = 3001;

console.log("Region:", process.env.AWS_REGION);
console.log("Bucket:", process.env.S3_BUCKET_NAME);

// init server
const server = http.createServer((req, res) => {
    routeRequest(req, res);
});

// listen
server.listen(port, host, () => {
    console.log(`Server running at PORT:${port}`);
});
