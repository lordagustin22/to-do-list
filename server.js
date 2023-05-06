import fs from 'fs';
import http from 'http';

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	fs.readFile('index.html', (error, data) => {
		if (error) {
			res.writeHead(404);
			res.write('Archivo no encontrado');
		} else {
			res.write(data);
		}
		res.end();
	});
});

server.listen(port, host, () => {
	console.log('servidor funcionando en ' + host + port);
});
