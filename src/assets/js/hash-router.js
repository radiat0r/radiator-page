const pageTitle = "JS Single Page Application Router";
// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "/assets/templates/404.html",
	},
	"/": {
		isBannner: true,
		template: "/assets/templates/home.html",
	},
	home: {
		isBannner: true,
		template: "/assets/templates/home.html",
	},
	project: {
		template: "/assets/templates/project.html",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
	// get the url path, replace hash with empty string
	var location = window.location.hash.replace("#", "");
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the routes object
	const route = routes[location] || routes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	if (route.isBannner) {
		document.getElementById("content").innerHTML = "";
		document.getElementById("banner").innerHTML = html;
	} else {
		document.getElementById("banner").innerHTML = "";
		document.getElementById("content").innerHTML = html;
	}
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
