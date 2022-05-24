var express = require('express');

var app = express();

// view engine setup
const { auth, requiresAuth} = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'lynfqMbL34ucWK2I5bu9HXvNwlgodVly',
    issuerBaseURL: 'https://npqhp.us.auth0.com',
    secret: 'r51kWekzwfT5cOuFbyYJDMxe5KutotCZjp0-mQfdc1fsH3etsY8htV78aafhZtei'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    req.oidc.isAuthenticated() ? res.redirect('/profile') : res.redirect('/login')
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = app;
