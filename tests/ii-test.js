import http from 'http';
import assert from 'assert';

let PORT = process.env.PORT;
if(PORT == null || PORT == "")
{
    PORT=4000;
}

const postData = JSON.stringify({
  username: 'bekki3',
  age: 20,
  hobbies: ['play', 'coding'],
});

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const user = JSON.parse(data);
    assert.strictEqual(user.username, 'bekki3');
    assert.strictEqual(user.age, 20);
    assert.deepStrictEqual(user.hobbies, ['play', 'coding']);
    console.log('Test passed!');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(postData);
req.end();
