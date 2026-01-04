import express from "express";
import {generate , readallfiles  } from "./utils.js";
import { uploadfiletoS3 } from "./aws.js";
import simpleGit from "simple-git";
import { createClient } from "redis";


//initializations
const app = express();
const git = simpleGit();
const publisher = createClient();


//connections
app.use(express.json());
publisher.connect();
app.listen(3000,()=>{
    console.log(`server is listening on http://localhost:3000}`)
});

//endpoints
app.post("/sendrepourl",async (req , res)=>{
    const {repourl} = req.body

    let sid = generate()

    let localPath =`${process.cwd()}/output/${sid}`

    await git.clone(repourl, localPath);

    let filesinrepo = readallfiles(localPath);

    // filesinrepo.forEach(file => {
    //   console.log(file)
    // });

    filesinrepo.forEach(async file => {
     await uploadfiletoS3(file);
    });

    publisher.lPush("build-queue", sid);

    res.json({
        id : sid
     
    })

});