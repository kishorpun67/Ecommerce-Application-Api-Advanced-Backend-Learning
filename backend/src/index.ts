import { PORT } from "./config/config.js";
import { app } from "./app.js";


const port = PORT


app.listen(port, ()=>{
    console.log('server is runnung in port:'+port);
})