import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    // Allow providing a full connection string via MONGODB_URI (recommended for deployments)
    const providedUri = process.env.MONGODB_URI;

    if (providedUri) {
        try {
            await mongoose.connect(providedUri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Database connected successfully (via MONGODB_URI)');
            return;
        } catch (error) {
            console.log('Error while connecting with the database using MONGODB_URI:', error.message);
            // fallthrough to try building URI from parts (useful for local dev)
        }
    }

    const USERNAME = process.env.DB_USERNAME || '';
    const PASSWORD = process.env.DB_PASSWORD || '';

    // URL-encode credentials in case they contain special characters
    const safeUser = encodeURIComponent(USERNAME);
    const safePass = encodeURIComponent(PASSWORD);

    const MONGO_URI = `mongodb://${safeUser}:${safePass}@ac-1vikj18-shard-00-00.xtawrkg.mongodb.net:27017,ac-1vikj18-shard-00-01.xtawrkg.mongodb.net:27017,ac-1vikj18-shard-00-02.xtawrkg.mongodb.net:27017/?ssl=true&replicaSet=atlas-13fy2k-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error.message);
        console.log(error);
    }
}

export default DBConnection;