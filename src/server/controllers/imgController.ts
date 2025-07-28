import { IncomingMessage, ServerResponse } from "http";

export function uploadImage(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.end("Image link");
}

export function getImages(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.end("Image link");
}

export function test(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Success!");
}
