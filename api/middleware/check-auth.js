const jwt=require('jsonwebtoken');


module.exports=function(req,res,next){

    try {
        var token=req.headers.token;

        var decode=jwt.verify(token,"techtoken10");
        console.log(decode);
        next();
    } catch (error) {
        res.status(401).json({
            message:"Auth fail"
        })
    }
}