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
    const blogId = req.params.id;//gets the id of the blogpost from named route parameter ":id", data can be passed with URL
    const blogToDelete = blogpostcollection[blogId];//retrieves current blog post using ":id" from array
    if (blogToDelete) {
        blogToDelete.deleteBlogPost(blogId);
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

    deleteBlogPost(blogId){
        //checks if blog post was found in the array
        if (blogId !== -1) {
            //splice method is used to remove blog post from array. (index-blog post location in array, 1 - deleteCount, specifies how many items are deleted form the array)
            blogpostcollection.splice(blogId, 1);
        }
    }

    editBlogPost(){

    }
}


