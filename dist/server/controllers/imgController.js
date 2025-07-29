import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client, } from "@aws-sdk/client-s3";
export async function uploadImage(req, res) {
    // init s3 Client
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
    });
    // await buffer objs
    const streams = [];
    // push new data to streams arr
    req.on("data", (stream) => streams.push(stream));
    // combine all data
    req.on("end", async () => {
        const buffer = Buffer.concat(streams);
        const contentType = req.headers["content-type"] || "application/octet-stream";
        // get fileName
        const fileName = req.headers["x-file-name"];
        if (!fileName) {
            res.statusCode = 400;
            res.end("error: Missing file name");
            return;
        }
        const key = `uploads/${fileName}`;
        try {
            await s3Client.send(new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            }));
            const url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Upload successful", url }));
        }
        catch (error) {
            console.log("Upload failed:::", error);
            res.statusCode = 500;
            res.end("Error: Upload Failed!");
        }
        res.statusCode = 200;
    });
}
export async function getImages(req, res, query) {
    // init s3 Client
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
    });
    try {
        // list objects in bucket
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME,
        });
        const response = await s3Client.send(listCommand);
        // set searchTerm to search prop
        console.log(query);
        const searchTerm = typeof query?.search === "string"
            ? query.search.toLowerCase()
            : undefined;
        const objects = response.Contents || [];
        //filter with search term and build urls
        const imageUrls = objects
            .filter((obj) => searchTerm ? obj.Key?.toLowerCase().includes(searchTerm) : obj)
            .map((obj) => {
            return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`;
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(imageUrls));
    }
    catch (error) {
        res.statusCode = 500;
        console.log(`Downloading Images Error: ${error}`);
    }
}
export function deleteImage(req, res) {
    // init s3 Client
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
    });
    let body = "";
    req.on("data", (stream) => {
        body += stream;
    });
    req.on("end", async () => {
        try {
            const parsed = JSON.parse(body);
            const key = parsed.key;
            console.log("Parsed key:", key);
            const delCommand = new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            });
            await s3Client.send(delCommand);
            res.statusCode = 200;
            res.end("Image deleted successfully.");
        }
        catch (error) {
            res.statusCode = 500;
            console.log(`Downloading Images Error: ${error}`);
        }
    });
}
