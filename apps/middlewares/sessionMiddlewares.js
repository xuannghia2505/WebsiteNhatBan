module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionID){
        res.cookie('sessionID',"hello", {
            signed :true    
        })
     
    }
    next();
}