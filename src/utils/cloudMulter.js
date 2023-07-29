
import multer from "multer";
export const fileValidation={
    image:['image/png','image/jpeg','image/jpg'],
    pdf:['application/pdf']
}
 export function fileUpload(customValidation=[]){
    
    const storage=multer.diskStorage({})
    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb("invalid custom",false)
                }
    }
const upload=multer({fileFilter,storage})
return upload
    
}

