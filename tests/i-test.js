import http from 'http';
import assert from 'assert';

let PORT = process.env.PORT;
if(PORT == null || PORT == "")
{
    PORT=4000;
}

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/api/users',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const users = JSON.parse(data);
    try {
        assert.strictEqual(users.length, 0);
        console.log('Test passed!');
      } catch (error) {
        console.error('Test failed:', error.message);
      }
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
