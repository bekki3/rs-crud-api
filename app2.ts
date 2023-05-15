import http from "http";
import { v4 as uuidv4, validate } from "uuid";
import dotenv from "dotenv";
dotenv.config();

interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

let dataBase: User[] = [
    // ...
];

const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
        //GET ALL USERS
        if (req.url === "/api/users" && req.method === "GET") {
            res.writeHead(200);
            res.write(JSON.stringify(dataBase));
            res.end();
        }

        //GET SPECIFIC USER
        else if (req.url.startsWith("/api/users/") && req.method === "GET") {
            const userId = req.url.split("/")[3];
            if (!validate(userId)) {
                res.writeHead(400);
                res.write("Invalid UUID");
                res.end();
            } else {
                let isUserFound = false;
                dataBase.forEach((user) => {
                    if (user.id == userId) {
                        isUserFound = true;
                        console.log(
                            `User data with id ${userId} sent to client`
                        );
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
        else if (req.url === "/api/users" && req.method === "POST") {
            let username: string;
            let age: number;
            let hobbies: string[];
            let id = uuidv4();
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
        else if (req.url.startsWith("/api/users/") && req.method === "PUT") {
            const userId = req.url.split("/")[3];
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
                        let username: string;
                        let age: number;
                        let hobbies: string[];
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
                                dataBase[index] = {
                                    id: userId,
                                    username: username,
                                    age: age,
                                    hobbies: hobbies,
                                };
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
        else if (req.url.startsWith("/api/users/") && req.method === "DELETE") {
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
                        console.log(
                            "Deleting user with ID, index",
                            userId,
                            index
                        );

                        dataBase.splice(index, 1);

                        console.log(dataBase);

                        ///////////////////

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
        else {
            console.log("Wrong route");
        }
    }
);
