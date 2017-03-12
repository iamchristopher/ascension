import restify from 'restify';
import routeLoad from 'restify-route-loader';
import {
    join
} from 'path';

const server = restify.createServer();

routeLoad({
    server,
    rootDir: join(__dirname, 'routes')
});

server.listen(8080, () => {
    console.log(`Listening`);
});
