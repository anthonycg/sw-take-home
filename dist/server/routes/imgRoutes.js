import { deleteImage, getImages, uploadImage, } from "../controllers/imgController.js";
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
    if (req.method === "GET" && req.url === "/images") {
        return await getImages(req, res);
    }
    if (req.method === "POST" && req.url == "/upload") {
        return await uploadImage(req, res);
    }
    if (req.method === "POST" && req.url == "/delete") {
        console.log("It hit the route");
        return deleteImage(req, res);
    }
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
}
