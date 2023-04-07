// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "assets/sites/error/error404.html",
	},
	"/": {
		isBannner: true,
		template: "",
	},
	home: {
		isBannner: true,
		template: "",
	},
	benefits: {
		template: "assets/sites/benefits/benefits.html",
	},
	news: {
		template: "assets/sites/news/news.html",
	},
	cashback: {
		template: "assets/sites/cashback/cashback.html",
	},
	project: {
		template: "assets/sites/project/project.html",
	},
	tokenomics: {
		template: "assets/templates/tokenomics.html",
	},
	stake: {
		template: "assets/templates/stake.html",
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
		html = await fetch(route.template).then((response) => response.text());
	}
	// set the content of the content div to the html
	if (route.isBannner) {
		document.getElementById("banner").hidden = false;
		document.getElementById("content").innerHTML = "";
	} else {
		document.getElementById("banner").hidden = true;
		document.getElementById("content").innerHTML = html;
	}

	setTimeout(() => { window.scrollTo(0, 0) }, 100);
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();
