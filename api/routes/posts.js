var express=require('express');
var router=express.Router();
var Post=require('../../model/Post');
var checkAuth=require('../middleware/check-auth');
var User=require('../../model/User');


router.get('/list',checkAuth,function(req,res){
    Post.find(function(err,rtn){
        if(err){
            res.status(500).json({
                message:"Internal server error",
                error:err
            })
        }
        else{
            res.status(200).json({
              message:"Post add",
                post:rtn
            })
        }
    })
})


   router.post('/add',checkAuth,function(req,res){
     var post=new Post();
     post.title=req.body.title;
     post.content=req.body.content;
     post.author=req.body.author;
     post.save(function(err,rtn)
{
  if(err){
    res.status(500).json({
      message:"Internal server error",
      error:err
    })
  }else{
    res.status(200).json({
      post:rtn
    })
  }
})   })
router.get('/detail/:id',function (req,res) {
  Post.findById(req.params.id).populate("author").exec(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }
    else if(rtn==null){
      res.status(204).json({
          message:"Not content"
      })
  }else{
      res.status(200).json({
        post:rtn
      })
    }
    
  })
  
})
router.patch('/:id',function(req,res){
  // var update={
  //   title:req.body.title,
  //   content:req.body.content,
  //   author:req.body.author
  // };
  var updateOps={};
  for(var ops of req.body){
    updateOps[ops.proName]=ops.value;
  }
  Post.findByIdAndUpdate(req.params.id,{$set:updateOps},function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal  server error",
        error:err
      })
    }else{
    res.status(200).json({
      message:"Update successfully",
      post:rtn
    })
    }
  })
})
router.delete('/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post delete successfully"
      })
    }
  })
})
module.exports=router;