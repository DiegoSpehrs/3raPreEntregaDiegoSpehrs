import dotenv from 'dotenv';

dotenv.config({path:"./src/.env"});

export default { 
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
}