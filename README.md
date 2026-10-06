#Eye Watch

##Server

###Technologies

express
MongoDB
cors
zod
jwt
bcrypt

###DataBase

I chose to use MongoDB because there is not relasions with other DB, and also is more flexable and it's fileds can replaced in the future.

###endpoints

GET /api/alerts
GET /api/alerts/:id
POST /api/alerts
DELETE /api/alerts/:id
PUT /api/alerts/:id

POST /api/auth/login
GET /api/auth/me
POST /api/auth/register
DELETE api/auth/users/:id
GET /api/auth/users

###Status codes

200 request answered Successfully 
201 created successfully
204 deleted successfully
209 conflict (user exists)
400 bad request
401 Unauthorized
404 not found
500 server error 

##Running instructions(server)

git clone
git install
env.example => env
npm start

##Client

###Technologies

react
zustand
axios
leaflet
react-leaflet
react-router

###Running instructions(clyent)
npm run dev
opening on http://localhost/5173
