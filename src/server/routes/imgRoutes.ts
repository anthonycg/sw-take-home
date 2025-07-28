import { IncomingMessage, ServerResponse } from "http";
import { getImages, test, uploadImage } from "../controllers/imgController.js";

export function routeRequest(req: IncomingMessage, res: ServerResponse): void {
    // handle CORS headers for all res
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // handle routing to proper controller
    console.log("req", req.url);
    if (req.method === "GET" && req.url === "/images") {
        return getImages(req, res);
    }

    if (req.method === "POST" && req.url == "/upload") {
        return uploadImage(req, res);
    }

    if (req.method === "GET" && req.url == "/test") {
        return test(req, res);
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
}
