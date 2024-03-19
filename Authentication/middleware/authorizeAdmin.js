
const adminAuthMiddleware = (role) => {
    return (req, res, next) => {
        // Check if the user is authenticated and has the specified role
        if (req.user && req.user.role === role) {
            // User has the specified role, allow access to the next middleware or route handler
            next();
        } else {
            // User does not have the specified role, send a 403 Forbidden response
            res.status(403).send('forbidden req');
        }
    };
};

module.exports = adminAuthMiddleware;