import 'dotenv/config'
import express from 'express';
import user from './routes/userRoute.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
const app = express();
const PORT = process.env.LOCAL_PORT || 9090;


// handle options credentials check - before CORS!
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);

app.listen(
  PORT, () => console.log(`Connected to http://localhost:${PORT}`)
)

