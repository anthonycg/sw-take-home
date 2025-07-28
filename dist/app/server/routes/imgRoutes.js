import { getImages, test, uploadImage } from "../controllers/imgController.js";
export function routeRequest(req, res) {
    // handle routing to proper controller
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
