#Tzofia eye

###Description


##Server

###Technologies

express
MongoDB
cors
zod

###DataBase

I chose to use MongoDB because there is not relasions with other DB, and also is more flexable and it's fileds can replaced in the future.

###endpoints

GET /api/alerts
GET /api/alerts/:id
POST /api/alerts
DELETE /api/alerts/:id
PUT /api/alerts/:id

###Status codes

200 request answered Successfully 
201 created successfully
204 deleted successfully
400 bad request
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

###Running instructions(clyent)
npm run dev
opening on http://localhost/5173
