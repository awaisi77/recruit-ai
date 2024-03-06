
const cors = require('cors');
const setupCors =  (app)=>{
    try{
        let urls  = process.env.allowed_cors ? process.env.allowed_cors.split(","): [];
        
        app.use(cors(urls));
    }catch(e){
        console.info(e)
    }
}
module.exports = setupCors;