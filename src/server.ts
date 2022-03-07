import express from  'express';
import morgan from 'morgan';
import helmet from 'helmet';

import mongoose from 'mongoose';

import indexRoutes from  './routes/indexRoutes';


//OTROS MODULOS
import compression from 'compression';
import cors from 'cors';

//Rutas Post
import PostsRoutes from  './routes/PostsRoutes';


class Server {
    public app:express.Application;
    constructor(){
        this.app = express();
        this.config();
    }
    config(){
        //Configuración Mongoose
        const MONGO_URI ="mongodb://localhost:27017/restapi";
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
          })
            .then(db =>console.log("DB es conectada"));        

        //Configuracion puerto
        this.app.set('port',process.env.PORT || 3000);
        //Middleware otros componentes
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

        //configuración json
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));





        //routes
        this.routes();
    }
    routes(){
        //ROUTES
        //this.app.get('/',(req, res) => res.send('Bienvenidos'))
        this.app.use(indexRoutes); 
        //this.app.use(PostsRoutes);
        //Ya con el prefijo
        //this.app.use('/api',PostsRoutes);
        //Con el prefijo /api/posts
        this.app.use('/api/posts',PostsRoutes);

    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log("Puerto del servidor",this.app.get('port'));
        })
    }
}
const server = new Server();
server.start();
