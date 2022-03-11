"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//importamos schema de mongo
const Post_1 = __importDefault(require("../models/Post"));
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Posts');
            //Con Mongo
            const posts = yield Post_1.default.find();
            res.json(posts);
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.url);
            //buscano en mongo en
            const post = yield Post_1.default.find({ url: req.params.url });
            //Podria ser tambien un solo objeto
            ///const post = await Post.findOne({url:req.params.url});
            res.json(post);
            res.json('recibido consulta por url');
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.params.url;
            console.log(url);
            console.log(req.body);
            //conla busqued|
            const post = yield Post_1.default.findOneAndUpdate({ url }, req.body);
            //que regrese el objeto nuevo 
            //const post = await Post.findOneAndUpdate({url},req.body,{new true});
            res.json(post);
            res.json('recibido');
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.params.url;
            const post = yield Post_1.default.findOneAndDelete({ url });
            res.json({ response: 'Post eliminado' });
        });
    }
    routes() {
        //this.router.get('/api/routes',this.getPosts);
        /*        this.router.get('/posts',this.getPosts);
                this.router.get('/posts:url',this.getPost);
                this.router.post('/posts',this.createPost);
                this.router.put('/posts:url',this.updatePost);
                this.router.delete('/posts:url',this.deletePost);
        */
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
