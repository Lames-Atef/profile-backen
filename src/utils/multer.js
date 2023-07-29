import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url))
export const fileValidation={
    image:['image.png','image.jpeg','image.jpg'],
    pdf:['application/pdf']
}
 export function fileUpload(customPath='general',customValidation=[]){
    console.log({DIR:__dirname});
    const fullPath=path.join(__dirname,`../uploads/${customPath}`)
   
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true})
    }
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullPath)
        },
        filename:(req,file,cb)=>{
            console.log(file);
            const unique=nanoid()+file.originalname
            file.dest=`uploads/${customPath}/${unique}`
            cb(null,unique)
        }
    })
    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb("invalid custom",false)
                }
    }
const upload=multer({storage})
return upload
    
}
