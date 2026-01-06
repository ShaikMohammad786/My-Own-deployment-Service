import {S3Client ,GetObjectCommand, ListObjectsV2Command , PutObjectCommand} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import dotenv from "dotenv"

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const bucket = "deplotmentcode";

export async function downloadPrefix(prefix) {
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
 const WORKSPACE = path.join(process.cwd(), "workspace");

  const localPath = path.join(WORKSPACE, key); 
  
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



export async function uploadfiletoS3(localfile){

    const filecontent = fs.createReadStream(localfile); //createReadStream is preferred over readFile or readFileSync (for large and production grade)
    const filename = path.relative(process.cwd(), localfile).replace(/\\/g, "/"); //becoz s3 treats / as folder separate not \ (assumes as string)
    const {size} = fs.statSync(localfile)

        const input ={
            Body : filecontent,
            Bucket : "deplotmentcode",
            Key : filename,
            contentLength : size

        }

        const command = new PutObjectCommand(input);
        const response = await s3.send(command);

        return response;

}



