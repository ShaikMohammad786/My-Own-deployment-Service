import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

dotenv.config()


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  }
});


export async function uploadfiletoS3(localfile){

    const filecontent = fs.createReadStream(localfile); //createReadStream is preferred over readFile or readFileSync (for large and production grade)
    const filename = path.relative(process.cwd(), localfile).replace(/\\/g, "/"); //becoz s3 treats / as folder separate not \ (assumes as string)
    const {size} = fs.statSync(localfile)

        const input ={
            Body : filecontent,
            Bucket : process.env.S3_BUCKET_NAME,
            Key : filename,
            contentLength : size

        }

        const command = new PutObjectCommand(input);
        const response = await s3.send(command);

        return response;

}
