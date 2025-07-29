import { deleteImage, getImages, uploadImage, } from "../controllers/imgController.js";
import { parse } from "url";
export async function routeRequest(req, res) {
    // handle CORS, content, options headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-file-name");
    // handle options preflight request
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    // handle routing to proper controller
    console.log("req", req.url);
    // parse url to get pathname
    const parsedUrl = parse(req.url || "", true);
    if (req.method === "GET" && parsedUrl.pathname === "/images") {
        return await getImages(req, res, parsedUrl.query);
    }
    if (req.method === "POST" && req.url == "/upload") {
        return await uploadImage(req, res);
    }
    if (req.method === "POST" && req.url == "/delete") {
        return deleteImage(req, res);
    }
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
}
