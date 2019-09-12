if (process.env.NODE_ENV === 'production') {
    module.exports = require('./hookstatusbarheight.prod');
} else {
    module.exports = require('./hookstatusbarheight.dev');
}
