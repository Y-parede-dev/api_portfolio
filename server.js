const http = require('http');
 
const app = require('./app');  // recuperation dU fichier app

const normalizePort = val => { //creation du port Normalizer 
 
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  };
  if (port >= 0) {
    return port;
  };
  return false;
};

const port = normalizePort(process.env.MODE =='PROD'?process.env.DB_PORT:process.env.DB_PORT_LOCAL);
const portDist = normalizePort(process.env.PORT);
app.set('port',(portDist || port ));   // ajout du port sur app 

const errorHandler = error => {  // gestion des erreurs
  if (error.syscall !== 'listen') {
    throw error;
  };
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  };
};

const server = http.createServer(app); // creation du serveur

server.on('error', errorHandler);  // si le serveur a une erreur sa nous la renvoie

server.on('listening', () => { //si tout est ok, ecoute l'adresse et on y ajoute le port
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  
  console.log('Listening on ' + bind); // on renvoie ecoute sur et le port a la console pour dire que tout c'est bien passer
});

// on applique la fonction listen au server avec le port en argument
server.listen(portDist || port);
