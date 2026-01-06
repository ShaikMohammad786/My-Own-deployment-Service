import fs from "fs";
import path from "path";



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