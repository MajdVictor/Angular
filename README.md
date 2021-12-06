# THD App

**link to the project:** https://mygit.th-deg.de/mh02127/thd/

**Student Name :** Majd Hafiri

# Prerequisites:

 1. Install **[MongoDB](https://docs.mongodb.com/manual/administration/install-community)** and **[Node.js](https://nodejs.org/en/)** version 12.8.1
 2. Install Angular CLI: `npm install -g @angular/cli`
 3. Download or clone the project from https://mygit.th-deg.de/mh02127/thd/
 4. Navigate to `thd/thd-app` Run `npm install` to install the dependencies
 5. Navigate to `thd/server` Run `npm install` to install the dependencies
 6. Execute `mongod` to start the MongoDB daemon


# Running the application:

1. Navigate to `thd/thd-app` and Run `ng build` to build the Angular app 
2. Run `ng serve` to start the application
3. Navigate to `/thd/server` and Run `node server.js` in another console window to start the Node.js server
4. Browse to `http://127.0.0.1:4200/`




## Further Information

**Wiki**
- For more information about the project, check the [Wiki](https://mygit.th-deg.de/mh02127/thd/-/wikis/home)

**Compodoc**
- To see the documentation of the application:
 1. navigate to thd/thd-app and run `npm run compodoc` in the terminal
 2. browse http://127.0.0.1:8080/

**Navigation system**
- More buildings can be added to the system easily by adding them in `buildings.json` file in `/thd/thd-app/src/assets/navigation/`
- Indoor map for a building can be added as Image in `/thd/thd-app/src/assets/navigation/` and link it with the building by adding the url for this image in `buildings.json`.


