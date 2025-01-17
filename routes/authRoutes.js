const passport = require('passport');

module.exports = app => {
    // All routes rapped in a function
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            // asks google for predetermined objects
            scope: ['profile', 'email']
        })
    );

    // After user approves of google auth, this is where google goes 
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/#/');
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        // passport auto included function
        req.logout();
        res.redirect('/');
    });

    // All routes wrapped in a function
};