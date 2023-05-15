(()=>{var e={738:(e,t,n)=>{const r=n(147),s=n(17),i=n(37),o=n(968).version,a=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function d(e){console.log(`[dotenv@${o}][DEBUG] ${e}`)}const l={config:function(e){let t=s.resolve(process.cwd(),".env"),n="utf8";const o=Boolean(e&&e.debug),a=Boolean(e&&e.override);var c;e&&(null!=e.path&&(t="~"===(c=e.path)[0]?s.join(i.homedir(),c.slice(1)):c),null!=e.encoding&&(n=e.encoding));try{const e=l.parse(r.readFileSync(t,{encoding:n}));return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?(!0===a&&(process.env[t]=e[t]),o&&d(!0===a?`"${t}" is already defined in \`process.env\` and WAS overwritten`:`"${t}" is already defined in \`process.env\` and was NOT overwritten`)):process.env[t]=e[t]})),{parsed:e}}catch(e){return o&&d(`Failed to load ${t} ${e.message}`),{error:e}}},parse:function(e){const t={};let n,r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(n=a.exec(r));){const e=n[1];let r=n[2]||"";r=r.trim();const s=r[0];r=r.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===s&&(r=r.replace(/\\n/g,"\n"),r=r.replace(/\\r/g,"\r")),t[e]=r}return t}};e.exports.config=l.config,e.exports.parse=l.parse,e.exports=l},147:e=>{"use strict";e.exports=require("fs")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.0.3","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"require":"./lib/main.js","types":"./lib/main.d.ts","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^17.0.9","decache":"^4.6.1","dtslint":"^3.7.0","sinon":"^12.0.1","standard":"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2","tap":"^15.1.6","tar":"^6.1.11","typescript":"^4.5.4"},"engines":{"node":">=12"}}')}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=require("http"),t=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,r=function(e){return"string"==typeof e&&t.test(e)},s=require("crypto");var i=n.n(s);const o={randomUUID:i().randomUUID},a=new Uint8Array(256);let d=a.length;function l(){return d>a.length-16&&(i().randomFillSync(a),d=0),a.slice(d,d+=16)}const c=[];for(let e=0;e<256;++e)c.push((e+256).toString(16).slice(1));const u=function(e,t,n){if(o.randomUUID&&!t&&!e)return o.randomUUID();const r=(e=e||{}).random||(e.rng||l)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=r[e];return t}return function(e,t=0){return(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase()}(r)};n(738).config();let p=[{id:"928b2b1b-72ba-4e5a-9643-98a6b06e8877",username:"bekki0",age:20,hobbies:["play22","sing2"]},{id:"f511a7ff-9d81-4a77-a32c-9367c6ced677",username:"bekki1",age:22,hobbies:["play","coding"]},{id:"ce5a3c43-457f-436f-944c-7d9af936dae8",username:"bekki2",age:20,hobbies:["play","coding"]},{id:"998c2e3a-8782-4ad3-9eb7-5d341e4da8f5",username:"bekki3",age:20,hobbies:["play","coding"]},{id:"615d8694-6368-4d9f-9071-36ff5cb7b974",username:"bekki4",age:20,hobbies:["play","coding"]}];const f=e.createServer(((e,t)=>{if("/users"===e.url&&"GET"===e.method)p.length?(t.writeHead(200),t.write(JSON.stringify(p)),t.end()):(t.writeHead(200),t.write("No users found, please create user first"),t.end());else if(e.url.startsWith("/users/")&&"GET"===e.method){const n=e.url.split("/")[2];if(r(n)){let e=!1;if(p.forEach((r=>{if(r.id==n)return e=!0,console.log(`User data with id ${n} sent to client`),t.writeHead(200),t.write(JSON.stringify(r)),t.end()})),!e)return console.log(`User data with id ${n} not found`),t.writeHead(404),t.write(`User with id ${n} doesn't exist`),t.end()}else t.writeHead(400),t.write("Invalid UUID"),t.end()}else if("/users"===e.url&&"POST"===e.method){let n,r,s,i=u();e.on("data",(e=>{let o="";o+=e,o=JSON.parse(o),n=o.username,r=o.age,s=o.hobbies,!n.length||isNaN(r)||"object"!=typeof s?(t.writeHead(400),t.write("Request body does not contain required fields, please read documentation"),t.end()):(p.push({id:i,username:n,age:r,hobbies:s}),console.log("data",p),t.writeHead(201),t.write(JSON.stringify(o)),t.end())}))}else if(e.url.startsWith("/users/")&&"PUT"===e.method){const n=e.url.split("/")[2];if(r(n)){let r=!1;p.forEach(((s,i)=>{if(s.id==n){let s,o,a;r=!0,e.on("data",(e=>{let r="";r+=e,r=JSON.parse(r),s=r.username,o=r.age,a=r.hobbies,!s.length||isNaN(o)||"object"!=typeof a?(t.writeHead(400),t.write("Request body does not contain required fields, please read documentation"),t.end()):(p[i]={id:n,username:s,age:o,hobbies:a},t.writeHead(200),t.write(JSON.stringify(p[i])),t.end(),console.log(`Updated user with id: ${n}`))}))}})),r||(console.log(`User data with id ${n} not found`),t.writeHead(404),t.write(`User data with id ${n} not found`),t.end())}else console.log("Invalid UUID"),t.writeHead(400),t.write("Invalid UUID"),t.end()}else if(e.url.startsWith("/users/")&&"DELETE"===e.method){const n=e.url.split("/")[2];if(r(n)){let e=!1;p.forEach(((r,s)=>{r.id==n&&(e=!0,console.log("Deleting user with ID, index",n,s),t.writeHead(204),t.end())})),e||(console.log(`User data with id ${n} not found`),t.writeHead(404),t.write(`User data with id ${n} not found`),t.end())}else console.log("Invalid UUID"),t.writeHead(400),t.write("Invalid UUID"),t.end()}else console.log("Wrong route"),t.writeHead(404),t.write("Non-existing route :("),t.end()}));let g=process.env.PORT;null!=g&&""!=g||(console.log("PORT not found in .env"),g=4e3),f.listen(g,(()=>{console.log(`Server running on port ${g}`)}))})()})();