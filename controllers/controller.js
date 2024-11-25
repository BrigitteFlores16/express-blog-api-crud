const postsdata=require('../data/posts.js');

// index
function index (req,res){
 const {tags} =req.query;

  let filteredPosts=[...postsdata];

  if(tags){
  filteredPosts = filteredPosts.filter ((post)=> post.tags.includes(tags));
}
 
  res.json (filteredPosts); 
  
}

//# show
function show(req,res){
 
  const id= parseInt (req.params.id);
  const post = postsdata.find((post)=> post.id === id);
  
 if(!post){
  const err = new Error('posts not found');
  err.code= 404;
  throw err;

  };
  res.json (post);
}   
 
//# store
function store(req,res){
  const {name,title,img,tags}= req.body;
    console.log("name: " + name + " title: " + title +  " img: " + img + " tags: " + tags);
    const id = postsdata.at(-1).id + 1;

 if(!name || !title ||!img || !tags){
  const err= new Error ('invalid params');
  err.code = 400 ;
  throw err;
 }
    let tagsArray =   tags.split(',').map(tag => tag.trim());
    const newpost = { id, title, name, img, tags: tagsArray };
    postsdata.push(newpost);
    res.json(newpost);
}

//#update
function update (req,res){
  const id= parseInt(req.params.id);
  let post = postsdata. find((post)=> post.id === id);
 
 if (!post){
  const err = new Error('posts not found');
  err.code= 404;
  throw err;

}
const {name,title, img, tags}= req.body;
if (!name || !title || !img || !tags){
  const err= new Error ('invalid params');
  err.code = 400 ;
  throw err;
}
let tagsArray =   tags.split(',').map(tag => tag.trim());
post.title = title;
post.name = name;
post.img = img ;
post.tags = tagsArray ; 

res.json (post);
}

//# modify 
function modify(req,res){
  const id= parseInt(req.params.id);
  let post = postsdata. find((post)=> post.id === id);
    
    if (!post){
    const err = new Error('posts not found');
    err.code= 404;
    throw err;
    }
  const {name, img, tags}= req.body;
   if (name ){
    post.name = name ;
   }
    if(img){
        post.img= img ;
    }
    if ( tags?.lenght){
        post.tags = tags ;
    }
  res.json (post);
}

//# destroy 
function destroy(req,res){
  const id= parseInt(req.params.id);

  const post = postsdata.find ((post)=> post.id === id);

  if (! post){
    const err = new Error('posts not found');
    err.code= 404;
    throw err;
  }

  const postIndex = postsdata.indexOf (post);

  postsdata.splice(postIndex,1);

   console.log(postsdata);
  res.sendStatus(204)

  res.json (postsdata);
}

module.exports={index, show, store, update, modify,destroy};