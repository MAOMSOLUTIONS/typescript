"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
////import mongoose from 'mongoose';
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
//OTROS MODULOS
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        //Configuración Mongoose
        ///    const MONGO_URI ="mongodb://localhost:27017/restapi";
        ///    mongoose.set('useFindAndModify', true);
        ///    mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
        ///        useUnifiedTopology: true,
        ///        useNewUrlParser: true,
        ///        useCreateIndex: true
        ///      })
        ///        .then(db =>console.log("DB es conectada"));        
        //Configuracion puerto
        this.app.set('port', process.env.PORT || 3000);
        //Middleware otros componentes
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        //configuración json
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //routes
        this.routes();
    }
    routes() {
        //ROUTES
        //this.app.get('/',(req, res) => res.send('Bienvenidos'))
        this.app.use(indexRoutes_1.default);
        //this.app.use(PostsRoutes);
        //Ya con el prefijo
        //this.app.use('/api',PostsRoutes);
        //Con el prefijo /api/posts
        //this.app.use('/api/posts',PostsRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Puerto del servidor", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
