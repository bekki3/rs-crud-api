import http from "http";
import fs from "fs";
import url from "url";

const server = http.createServer((req, res) => {
    //GET Request
    if(req.url==="/users" && req.method === "GET")
    {
        fs.readFile("./DB.json", "utf-8", (err, data)=> {
            if(err) {
                console.error(err);
                return res.end("Server error");
            }
            else{
                res.writeHead(200);
                res.write(data);
                res.end();
            }            
        });
    }
    else if(req.url.startsWith("/users") && req.method === "GET")
    {
        const parsedUrl = url.parse(req.url, true);
        const id = parsedUrl.query.id;
        if(isNaN(id)) //check if id is valid number
        {
            res.writeHead(400);
            res.write("Invalid id, it must be an integer");
            res.end();
        }
        else{
            fs.readFile("./DB.json", "utf-8", (err, data)=> {
                let isUserFound = false;
                JSON.parse(data).forEach(user => {
                    if(user.id == id)
                    {
                        isUserFound=true;
                        console.log(`User data with id ${id} sent to client`);

                        res.writeHead(200);
                        res.write(JSON.stringify(user));
                        return res.end();
                    }
                });
                if (!isUserFound) {
                    console.log(`User data with id ${id} not found`);

                    res.writeHead(404);
                    res.write(`User with id ${id} doesn't exist`);
                    return res.end();
                }
                

            })
        }
    }
    else if(req.url === "/users" && req.method === "POST")
    {

        let body = "";
        req.on("data", (data)=> {
            body+=data;
        })
        req.on("end", ()=> {
            console.log(body);
        })
        const name = body.name;
        const age = body.age;
        let id = 0;
        let tempArr = [];
        const file = fs.readFile("./DB.json", "utf-8", (err, data)=> {
            if(data)
            {
                tempArr = JSON.parse(data);
                tempArr.forEach((user)=> {
                    if (user.id>=id) {
                        id = user.id + 1;
                    }
                })
                let newUser = {id: id, name: name, age: parseInt(age)};
                tempArr.push(newUser);
                fs.writeFile("./DB.json", JSON.stringify(tempArr), (err)=> {
                    if(err){
                        console.error(err)
                    }
                    else{
                        console.log("User added to DB");
                        res.end(JSON.stringify(newUser));
                    }
                });
            }
            else{
                console.log("DB was empty");

                tempArr.push({id: 0, name: name, age: parseInt(age)});

                fs.writeFile("./DB.json", JSON.stringify(tempArr), (err)=> {
                    if(err){
                        console.error(err)
                    } else {
                        res.end(JSON.stringify(tempArr));
                    }
                });
                console.log("First user added to DB");
            }
            
        });
                
    }



});

server.listen(4000, ()=> {console.log("Server running on port 4000")});