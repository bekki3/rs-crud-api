import http from 'http';
import assert from 'assert';

let PORT = process.env.PORT;
if(PORT == null || PORT == "")
{
    PORT=4000;
}

const userId = ""; // Replace with user UUID

const options = {
  hostname: 'localhost',
  port: PORT,
  path: `/api/users/${userId}`,
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const user = JSON.parse(data);
    assert.strictEqual(user.id, userId);
    console.log('Test passed!');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
