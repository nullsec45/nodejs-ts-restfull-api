# Setup Project

### mv .env.example to .env

### create script in package.json
```JSON
"scripts": {
   "build" : "tsc",
   "start" : "node dist/main.js" 
}
```
### run the following command
```shell
$ npm install 

$ npx prisma migrate dev

$ npx prisma generate 

$ npm run build

$ npm run start
```