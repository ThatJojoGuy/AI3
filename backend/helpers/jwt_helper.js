const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    signAccessToken: (userId) =>{
        return new Promise((resolve,reject) => {
            const payload = {
            }
            const secret= "SECREAT KEY"
            const options = {
                espiresIn: "1h",
                issuer: "pickurpage.com",
                audience:[userId]
            }
            JWT.sign(payload, "122212", options, (err,token) =>{
                if(err){
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req,res,next) =>{
        console.log(req.headers);
        if(!req.headers['x-access-token']) return next(createError.Unauthorized())
        const authHeader = req.headers['x-access-token']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        console.log(token);
        JWT.verify(token, "122212", (err,payload) => {
            if(err){
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    }
}