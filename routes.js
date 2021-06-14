const routes = require('next-routes')();


routes.add('/', '/index')
      .add('/list/:player', '/list')
      .add('/setup/:player', '/setup')
      .add('/random/:player', '/random')
      .add('/play/:player', '/play')
      .add('/quit', '/quit')
      .add('/home', '/home')
      ;

module.exports = routes;