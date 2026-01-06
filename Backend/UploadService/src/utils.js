import fs from "fs";
import path from "path";


export  function generate(){

    let subset = "abcdefghijklmnopqrstuvwxyz0123456789";
    let sid="";

    for (let i= 0;i<5;i++){

        const x = Math.floor(Math.random() * subset.length);
        sid += subset[x];

    }

    return sid;
}

export  function readallfiles(localPath , result = []){

    const allfilesandfolders = fs.readdirSync(localPath , {withFileTypes : true});

    allfilesandfolders.forEach(file =>{
        const fullPath = path.join(localPath , file.name)
        
        

        if(file.isDirectory()){
             if (file.name !== ".git"){
             result = result.concat(readallfiles(fullPath))};
        }else{
            result.push(fullPath);
        }

        
    })
    return result;
}