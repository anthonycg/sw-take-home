export function uploadImage(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.end("Image link");
}
export function getImages(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.end("Image link");
}
export function test(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Success!");
}
