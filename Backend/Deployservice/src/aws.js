import {S3Client ,GetObjectCommand, ListObjectsV2Command} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import dotenv from "dotenv"

dotenv.config()

const s3 = new S3Client({
   region: process.env(region),
  credentials:{
    accessKeyId : process.env(accessKeyId),
    secretAccessKey : process.env(secretAccessKey),
  }
});

const bucket = "deplotmentcode";

async function downloadPrefix(prefix) {
  const { Contents } = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    })
  );

  if (!Contents) return;

  for (const obj of Contents) {
    if (obj.Key.endsWith("/")) continue;
    await downloadFile(obj.Key); 
  }
}

async function downloadFile(key) {

  const dir = path.resolve(process.cwd(), "../"); ;
  const localPath = path.join(dir, key);
  await fs.promises.mkdir(path.dirname(localPath), { recursive: true });

  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key, 
    })
  );

  await pipeline(Body, fs.createWriteStream(localPath));
  console.log( key);
}

