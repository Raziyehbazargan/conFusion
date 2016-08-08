#Configuring Server Folder

---

- At any convenient location on your computer, create a new folder named json-server, and in terminal move to this folder.
- Move or create your json file into this folder. (in this example : db.json)
- Move to this folder(json-server) in your terminal, and type the following at the command prompt to start the server:   

 > json-server   --watch  db.json
 

- This should start up a server at port number 3000 on your machine. The data from this server can be accessed by typing the following addresses into your browser address bar: for example -->

	> http://localhost:3000/dishes
	> http://localhost:3000/promotions
	> http://localhost:3000/leadership
	> http://localhost:3000/feedback
	

- create a folder named **public** in json-server folder
- The json-server will serve up any static web content that we put in a folder named **public** inside **json-server folder**. And that can be access by typing in  **http://localhost:3000**  in address bar of browser.

- After change the gulp.js file in terminal we run the **gulp** in terminal
- copy the content of dist folder in public folder
- In terminal run the json-server : json-server --watch db.json
- in browser type : http://localhost:3000
