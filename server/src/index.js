import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import cors from 'cors';

const app = express();

const url = 'mongodb://localhost:27017';

mongoose.connect(url, { dbName: 'GaragiX' })
    .then(() => console.log('Successfully connected to database!'))
    .catch((err) => console.log(`Failed to connect to database: ${err}`));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        select: function (value, option){
            return value === option ? 'selected' : '';
        }
    }
}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(authMiddleware);
app.use(routes);

app.listen(8888, () => console.log('Server is running on: http://localhost:8888'));