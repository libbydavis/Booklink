#Booklink#

To run the frontend:
1. Open command prompt
2. cd into the booking-frontend folder
3. Run npm i
4. Run npm start
5. The app will open in your browser

To run the gateway server:
1. Open command prompt
2. cd into gateway
3. Run node app.js
4. The gateway should be running on port 4000

To run the microservices:
1. Make sure the gateway is running
2. Open command prompt
3. cd into the folder that the microservice is in
4. Run node app.js

*Important note:
You will also need to set up a .env file with the connection url to connect with MongoDB. The microservices will not be able to work correctly without this. Contact the owner of this repository to get a link.
