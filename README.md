# rs-crud-api

### All operation are working.

## Start server
- npm run start:dev (start server in development mode).
- npm run start:prod (start server in production mode).


## Testing the API
- Please use tools like postman, res api tester to perform following operations.
- By default PORT is 4000
- {uuid} must be replaced with actual uuid of the user.

- GET: http://localhost:4000/api/users is used to get all persons
- GET: http://localhost:4000/api/users/{uuid} is used to get user with id uuid
- POST: http://localhost:4000/api/users is used to create user with given body
- PUT: http://localhost:4000/api/users/{uuid} is used to update user with id uuid with given body
- DELETE: http://localhost:4000/api/users/{uuid} is used to delete user with is uuid

- [Example]: GET: http://localhost:4000/api/users/9dc3ecdc-13b3-4d13-90df-f9df7447c866 will return data of user with the given id.

## Running the test scenarios
- npm run test-1
- npm run test-2
- npm run test-3



