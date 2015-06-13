# node-iso
My attempt at an isomorphic Node application with React and React-Router. It will serve as boilerplate for future applications that I may need to write in Node in the future.

It uses the following technologies:

* EJS
* Express
* Browserify
* React
* React-Router
* Bower (to get Bootstrap CSS)
* Gulp (to compile all the files and start the server)

As you can see, a very barebones project.

# How to run the app
Clone the repo and run: `npm start`

By default this will run in development mode. If you want to run in production mode (no file watching), run: `npm run production`

# How it all works
I understand that people will just post repos on the internet and expect everyone to understand their complicated workflow. Hopefully, I can get you to understand how everything functions.

The directory structure is akin to how Garry's Mod structures their application, and in an isomorphic application, it makes sense:

```
app
  |- client
  |- server
  |- shared
```

The app has 3 types of files.

Files in the `app/client` and `app/shared` directories are public. You can request any of those files and express will render them to you; any yahoo with a web browser can view the (uglified and concatenated) source of those javascript files. This needs to be so so that our browserify bundle can be accessed by the client, including any dependencies we create for the bundle.

That being said, **DON'T PUT SENSITIVE INFORMATION IN CLIENT OR SHARED DIRECTORIES!** For example, if you have an encryption algorithm you use to encrypt user information, don't put that in the client or shared directories, otherwise people will be able to see that sort of stuff. That sort of computing should be done in the `app/server` directory.

Files in the `app/server` directory are only visible to the Node application. Only the host machine running the actual server has access to those files. This is obviously for security, but also to make things more manageable. Isomorphic apps require the co-operation of both the client and the server, and roles should not be muddled.

Things like API calls, user security, session management, database access, etc should be done here. In `app/server/main.js`, there is an example that shows you how to prevent a resource from being served isomorphically. In fact, let's take a look:

#### app/server/main.js
```
app.set('views', path.join(__dirname, 'views')); // Set the directory we're using for our views
app.set('view engine', 'ejs'); // Use EJS as our view rendering engine

app.get('/__proc__/server', function(req, res) { // If the client requests this URI...
	res.render('server'); // Render the server.ejs view
});

app.get('*', function(req, res) { // For all other URIs...
	Router.run(routes, req.path, function(Handler, state) {
		var element = React.createElement(Handler);
		var html = React.renderToString(element);
		res.render('index', { reactContent: html });
	}); // Let react-router take care of it, and use index.ejs as the view that react-router will populate
});

app.listen(3000);
```

`app` is obviously an Express application instance. We are using EJS to render our views.

We use `app.get` before the catch-all route to capture requests to this URI and change how they are processed. If you're confused, look at the commented code.
