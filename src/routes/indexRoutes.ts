import {Request,Response,Router} from 'express';
import fetch from "node-fetch";


class IndexRoutes{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    async getPosts(req:Request,res:Response){
        res.send('Hola')
        console.log("Hola Mundo")
        const apiUrl:string = "https://pokeapi.co/api/v2";
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        


    }
    routes(){
        //this.router.get('/',(req, res) => res.send('Bienvenidos amigos'))
        this.router.get('/',this.getPosts);


    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;