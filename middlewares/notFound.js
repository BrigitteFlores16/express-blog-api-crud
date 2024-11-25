function notFound (req, res, next){
    res.status(404);
    res.json({
        status:'ko',
        error:"page not found",
    });

}
module.exports = notFound;
