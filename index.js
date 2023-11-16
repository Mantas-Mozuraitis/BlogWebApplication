import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// live blog list
let blogpostcollection = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.redirect("/index");
})
app.get("/index",(req,res)=>{
    res.render("index.ejs",{blogposts:blogpostcollection});
})
app.get("/new-blog",(req,res)=>{
    res.render("create.ejs");
})
//delete request
app.post("/delete/:id", (req, res) => {
    const blogId = req.params.id;
    const blogToDelete = blogpostcollection[blogId];
    if (blogToDelete) {
        blogToDelete.deleteBlogPost();
    }
    res.redirect("/index");
});

app.post("/post-blog", (req,res)=>{
    var blog = new BlogPost(req.body["blog-title"],req.body["blog-author"],req.body["blog-content"]);
    blogpostcollection.push(blog);
    res.redirect("/index");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

//blog class
class BlogPost{
    constructor(title, author, content){
        this.title = title;
        this.author = author;
        this.content = content;
    }

    deleteBlogPost(){
        const index = blogpostcollection.indexOf(this);

        if (index !== -1) {
            blogpostcollection.splice(index, 1);
        }
    }

    editBlogPost(){
        
    }
}


