import http from "http";
import { v4 as uuidv4, validate } from "uuid";

let dataBase = [
    {
        id: '928b2b1b-72ba-4e5a-9643-98a6b06e8877',
        username: 'bekki0',
        age: 20,
        hobbies: [ 'play22', 'sing2' ]
      },
      {
        id: 'f511a7ff-9d81-4a77-a32c-9367c6ced677',
        username: 'bekki1',
        age: 22,
        hobbies: [ 'play', 'coding' ]
      },
      {
        id: 'ce5a3c43-457f-436f-944c-7d9af936dae8',
        username: 'bekki2',
        age: 20,
        hobbies: [ 'play', 'coding' ]
      },
      {
        id: '998c2e3a-8782-4ad3-9eb7-5d341e4da8f5',
        username: 'bekki3',
        age: 20,
        hobbies: [ 'play', 'coding' ]
      },
      {
        id: '615d8694-6368-4d9f-9071-36ff5cb7b974',
        username: 'bekki4',
        age: 20,
        hobbies: [ 'play', 'coding' ]
      }    
];

const server = http.createServer((req, res) => {
    //GET ALL USERS
    if (req.url === "/users" && req.method === "GET") {
        if (dataBase.length) {
            res.writeHead(200);
            res.write(JSON.stringify(dataBase));
            res.end();
        } else {
            res.writeHead(200);
            res.write("Database is empty, please create user first");
            res.end();
        }
    }

    //GET SPECIFIC USER
    else if (req.url.startsWith("/users/") && req.method === "GET") {
        const userId = req.url.split("/")[2];
        if (!validate(userId)) {
            res.writeHead(400);
            res.write("Invalid UUID");
            res.end();
        } else {
            let isUserFound = false;
            dataBase.forEach((user) => {
                if (user.id == userId) {
                    isUserFound = true;
                    console.log(`User data with id ${userId} sent to client`);
                    res.writeHead(200);
                    res.write(JSON.stringify(user));
                    return res.end();
                }
            });
            if (!isUserFound) {
                console.log(`User data with id ${userId} not found`);
                res.writeHead(404);
                res.write(`User with id ${userId} doesn't exist`);
                return res.end();
            }
        }
    }

    //CREATE A USER
    else if (req.url === "/users" && req.method === "POST") {
        let username;
        let age;
        let hobbies;
        let id = uuidv4();
        req.on("data", (data) => {
            let body = "";
            body += data;
            body = JSON.parse(body);
            username = body.username;
            age = body.age;
            hobbies = body.hobbies;
            if (!username.length || isNaN(age) || typeof hobbies != "object") {
                res.writeHead(400);
                res.write(
                    "Request body does not contain required fields, please read documentation"
                );
                res.end();
            } else {
                dataBase.push({
                    id: id,
                    username: username,
                    age: age,
                    hobbies: hobbies,
                });
                console.log("data", dataBase);
                res.writeHead(201);
                res.write(JSON.stringify(body));
                res.end();
            }
        });
    }

    //UPDATE A USER
    else if (req.url.startsWith("/users/") && req.method === "PUT") {
        const userId = req.url.split("/")[2];
        if (!validate(userId)) {
            console.log("Invalid UUID");
            res.writeHead(400);
            res.write("Invalid UUID");
            res.end();
        } else {
            let isUserFound = false;
            dataBase.forEach((user, index) => {
                if (user.id == userId) {
                    isUserFound = true;
                    let username;
                    let age;
                    let hobbies;
                    req.on("data", (data) => {
                        let body = "";
                        body += data;
                        body = JSON.parse(body);
                        username = body.username;
                        age = body.age;
                        hobbies = body.hobbies;
                        if (
                            !username.length ||
                            isNaN(age) ||
                            typeof hobbies != "object"
                        ) {
                            res.writeHead(400);
                            res.write(
                                "Request body does not contain required fields, please read documentation"
                            );
                            res.end();
                        } else {
                            dataBase[index]= {id: userId, username: username, age: age, hobbies: hobbies};
                            res.writeHead(200);
                            res.write(JSON.stringify(dataBase[index]));
                            res.end();
                            console.log(`Updated user with id: ${userId}`);
                        }
                    });
                }
            });
            if (!isUserFound) {
                console.log(`User data with id ${userId} not found`);
                res.writeHead(404);
                res.write(`User data with id ${userId} not found`);
                res.end();
            }
        }
    }

    // DELETE A USER
    else if (req.url.startsWith("/users/") && req.method === "DELETE") {
        const userId = req.url.split("/")[2];
        if (!validate(userId)) {
            console.log("Invalid UUID");
            res.writeHead(400);
            res.write("Invalid UUID");
            res.end();
        } else {
            let isUserFound = false;
            dataBase.forEach((user, index) => {
                if (user.id == userId) {
                    isUserFound = true;
                    ////////////////
                    console.log("Deleting user with ID, index", userId, index);
                    
                    res.writeHead(204);
                    res.end();
                }
            });
            if (!isUserFound) {
                console.log(`User data with id ${userId} not found`);
                res.writeHead(404);
                res.write(`User data with id ${userId} not found`);
                res.end();
            }
        }
    }

    //WRONG ROUTE ENTERED
    else{
        console.log("Wrong route");
        res.end("Wrong route")
    }

});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});
