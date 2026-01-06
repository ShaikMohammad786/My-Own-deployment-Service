import express from "express";
import dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import cors from "cors";

dotenv.config();

const app = express();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(async (req, res) => {
  try {
    const id = req.hostname.split(".")[0];

    
    let filepath;
    if (req.path === "/") {
      filepath = "index.html";
    } else {
      filepath = req.path.replace(/^\/+/, "");
    }

    const fileKey = `workspace/dist/${id}/${filepath}`;
    console.log("S3 KEY =>", fileKey);

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    });

    const response = await s3.send(command);


    const body = await streamToBuffer(response.Body);

  
    const type = filepath.endsWith(".html")
      ? "text/html"
      : filepath.endsWith(".css")
      ? "text/css"
      : filepath.endsWith(".js")
      ? "application/javascript"
      : "application/octet-stream";

    res.set("Content-Type", type);
    res.send(body);

  } catch (err) {
    console.error(err.name);
    res.status(404).send("File not found");
  }
});

app.listen(3001, () => {
  console.log("server is listening on http://localhost:3001");
});

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
