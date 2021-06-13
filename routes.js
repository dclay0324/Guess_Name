const routes = require('next-routes')();


routes.add('/', '/index')
      .add('/list/:player', '/list')
      .add('/setup/:player', '/setup')
      .add('/play/:player', '/play')
      .add('/quit', '/quit')
      ;

module.exports = routes;