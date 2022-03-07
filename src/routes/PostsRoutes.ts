import {Request,Response,Router} from 'express';

//importamos schema de mongo
import Post from '../models/Post'

class PostRoutes{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getPosts(req:Request,res:Response):Promise<void>{        
        //res.send('Posts');

        //Con Mongo
        const posts = await Post.find();
        res.json(posts);
    }
    public async getPost(req:Request,res:Response):Promise<void>{
        console.log(req.params.url);
            //buscano en mongo en
            const post = await Post.find({url:req.params.url});
                //Podria ser tambien un solo objeto
                ///const post = await Post.findOne({url:req.params.url});

            res.json(post);

        res.json('recibido consulta por url');

    }
    public async createPost(req:Request,res:Response):Promise<void>{
        console.log(req.body);
        /*
            //Ya despues de probado en postman
            const {title,url,content,image} = req.body;
            const newPost = new Post({title,url,content,image});
            //Para almacenar el objeto
                await newPost.save();
                res.json({data:newPost});
            console.log(newPost);
        */
        res.json('recibido');

    }
    public async updatePost(req:Request,res:Response):Promise<void>{
        const url = req.params.url

        console.log(url);
        console.log(req.body);
            //conla busqued|
            const post = await Post.findOneAndUpdate({url},req.body);
                //que regrese el objeto nuevo 
                //const post = await Post.findOneAndUpdate({url},req.body,{new true});
            res.json(post);

        res.json('recibido');

    }
    public async deletePost(req:Request,res:Response):Promise<void>{
        const url = req.params.url
        const post = await Post.findOneAndDelete({url});
        res.json({response:'Post eliminado'});

    }
    routes(){
        //this.router.get('/api/routes',this.getPosts);

/*        this.router.get('/posts',this.getPosts);
        this.router.get('/posts:url',this.getPost);
        this.router.post('/posts',this.createPost);
        this.router.put('/posts:url',this.updatePost);
        this.router.delete('/posts:url',this.deletePost);
*/        
        this.router.get('/',this.getPosts);
        this.router.get('/:url',this.getPost);
        this.router.post('/',this.createPost);
        this.router.put('/:url',this.updatePost);
        this.router.delete('/:url',this.deletePost);
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;
