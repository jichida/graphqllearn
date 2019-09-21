if (process.env.NODE_ENV === 'production') {
    module.exports = require('./apollo.prod');
} else {
    module.exports = require('./apollo.dev');
}