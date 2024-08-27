const http = require('http');

const server = http.createServer((request,response) => {
  const {url, method} = request;

  if (url === '/'){
    if (method === 'GET') {
        return response.end('Get  hello Junga');
      }
      else if (method === 'POST'){
        return response.end('Post Junga');
      }
  } else if(url === '/test'){
    return response.end('This is a test Page')
  }
  else {
    return response.end('Paage not found');
  }
});

server.listen(3001,'localhost', () => {
    console.log('Server is running in http://localhost:3001')
});