import {createClient} from "redis"
import { downloadPrefix , uploadfiletoS3 } from "./aws.js";
import { runDockerBuild } from "./build.js";
import { readallfiles  } from "./utils.js";
import path from "path";
import { MongoClient } from "mongodb";

//redis
const peer = createClient();
await peer.connect();


//mongodb
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

const db = client.db("vercel");
const statusCollection = db.collection("status_tracking");


async function main(){
   

    while(1){

        const res = await peer.brPop("build-queue", 0);
        const jobId = res.element;
        const prefix = `output/${jobId}/`;

        await downloadPrefix(prefix);
        await runDockerBuild(jobId);
        console.log("Build finished for:", jobId);
        
        const dir = path.resolve(process.cwd(),"..")
        console.log(dir)
        const localdistpath = `${dir}\\Deployservice\\workspace\\dist\\${jobId}`;
        const filesindist = readallfiles(localdistpath);

        filesindist.forEach(async file => {
             await uploadfiletoS3(file);
            });

        await statusCollection.updateOne(
        { sid: jobId},
        { $set: { status: "deployed" } }
        );

        }

}
main()






