const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const authentication = (req, res, next) => {
    // console.log(req);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Unauthenticated , access denied");

    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, "jwtsecret")
        req.body.user = { id: payload.id, name: payload.username }
        console.log(req.user);
        next()
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = authentication
