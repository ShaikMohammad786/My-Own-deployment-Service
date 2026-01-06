import express from "express";
import { generate, readallfiles } from "./utils.js";
import { uploadfiletoS3 } from "./aws.js";
import simpleGit from "simple-git";
import { createClient } from "redis";
import { MongoClient } from "mongodb";




//initializations
const app = express();
const git = simpleGit();
const publisher = createClient();
const client = new MongoClient(process.env.MONGO_URI);
import cors from "cors";


//connections
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // React URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

publisher.connect();
await client.connect()


//db
const db = client.db("vercel");
const statusCollection = db.collection("status_tracking");

//endpoints
app.post("/sendrepourl", async (req, res) => {
    const { repourl } = req.body

    let sid = generate()

    let localPath = `${process.cwd()}/output/${sid}`

    await git.clone(repourl, localPath);

    let filesinrepo = readallfiles(localPath);

    await Promise.all(filesinrepo.map(file => uploadfiletoS3(file)));

    await publisher.lPush("build-queue", sid);
    await statusCollection.insertOne({
        sid,
        status: "uploaded",
    });


    res.json({
        id: sid
    })

});

app.get("/status", async (req, res) => {

    let projecid = req.query.id;
    const status = await statusCollection.findOne({ sid: projecid });

    res.json({
        "status": status
    })

})


app.listen(3000, () => {
    console.log(`server is listening on http://localhost:3000}`)
});