const routes = require('next-routes')();


routes.add('/', '/index')
      .add('/list', '/list')
      .add('/login', '/login')
      .add('/play/:player', '/play')
      ;

module.exports = routes;