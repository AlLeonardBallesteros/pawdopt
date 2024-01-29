const checkLoggedIn = (req, res, next) => {
    // Assuming you have some way of checking if the user is logged in
    // For example, if you have a user authentication system with a session
    if (req.user) {
      // User is logged in, proceed to the next handler
      next();
    } else {
      // User is not logged in, send an error response
      res.status(401).json({ success: false, message: 'User is not logged in' });
    }
  };
  
  module.exports = { checkLoggedIn };