// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "/assets/templates/404.html",
	},
	"/": {
		isBannner: true,
		template: "",
	},
	home: {
		isBannner: true,
		template: "",
	},
	project: {
		template: "/assets/templates/project.html",
	},
	news: {
  		template: "/assets/templates/news.html",
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

	let html = ""
	if (route.template != "") {
		let path = ""
		// get the html from the template
		if (window.location.hostname.includes("github.io")) {
			path = "/radiator-page"
		}

		html = await fetch(path + route.template).then((response) => response.text());
	}
	// set the content of the content div to the html
	if (route.isBannner) {
		document.getElementById("banner").hidden = false;
		document.getElementById("content").innerHTML = "";
	} else {
		document.getElementById("banner").hidden = true;
		document.getElementById("content").innerHTML = html;
	}

	console.log("window.URL: " + window.location.hostname);
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
