const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';
    switch (req.url) {
        case '/':
        case '/home':
            filePath = 'home.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contact':
            filePath = 'contact.html';
            break;
        default:
            filePath = null;
            break;
    }

    if (filePath) {
        fs.readFile(path.join(__dirname, filePath), (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
