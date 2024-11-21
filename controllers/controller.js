const postsdata=require('../data/posts.js');
// index
function index (req,res){
  const {tags} =req.query;

  let filteredPosts= [...postsdata];

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
       return res.status(404).json({
      error:"not found",
  });
}   
 
res.json (post);
}

//# store
function store(req,res){
  
  res.json ('creazione di una post');
}
//#update
function update (req,res){
  const id= parseInt(req.params.id);
  res.json ('sostituisco la post'+ id);
}
//# modify 
function modify(req,res){
  const id= parseInt(req.params.id);
  res.json ('Modifica il post '+ id);
}
//# destroy 
function destroy(req,res){
  const id= parseInt(req.params.id);

  const post = postsdata.find ((post)=> post.id === id);

  if (! post){
      return res.status (404).json ({
          error:'Not found',
      });
  }

  const postIndex = postsdata.indexOf (post);

  postsdata.splice(postIndex,1);

   console.log(postsdata);
  res.sendStatus(204)

  res.json (postsdata);
}

module.exports={index, show, store, update, modify,destroy};