var model = {
	active_kitty: null,
	init: function(){
		var names = ["Socks", "Bashful", "Cuddles",
			"Lemon", "Lieutenant Jeff", "Russian Blue"];
		var clicks = {
			"Socks": 0,
			"Bashful": 0,
			"Cuddles": 0,
			"Lemon": 0,
			"Lieutenant Jeff": 0,
			"Russian Blue": 0
		};
		var sources = {
			"Socks": "../static/images/Socks.jpg",
			"Bashful": "../static/images/Bashful.jpg",
			"Cuddles": "../static/images/Cuddles.jpg",
			"Lemon": "../static/images/Lemon.jpg",
			"Lieutenant Jeff": "../static/images/Lieutenant-Jeff.jpg",
			"Russian Blue": "../static/images/Russian-Blue.jpg"
		};
		localStorage.setItem('names', JSON.stringify(names));
		localStorage.setItem('clicks', JSON.stringify(clicks));
		localStorage.setItem('sources', JSON.stringify(sources));
	},
	getParsedNames: function() {
		var names = localStorage.getItem('names');
		names = JSON.parse(names);
		return names;
	},
	getParsedClicks: function() {
		var clicks = localStorage.getItem('clicks');
		clicks = JSON.parse(clicks);
		return clicks;
	},
	getParsedSources: function() {
		var sources = localStorage.getItem('sources');
		sources = JSON.parse(sources);
		return sources;
	},
	countClick: function(name) {
		var clicks = model.getParsedClicks();
		clicks[name] += 1;
		localStorage.setItem('clicks', JSON.stringify(clicks));
	},
	getCount: function(name) {
		var clicks = model.getParsedClicks();
		return clicks[name];
	},
	getSource: function(name) {
		var sources = model.getParsedSources();
		return sources[name];
	},
	getNames: function() {
		var names = model.getParsedNames();
		return names;
	},
	changeName: function(name) {
		var names = model.getParsedNames();
		var index = names.indexOf(model.active_kitty);
		names[index] = name;
		localStorage.setItem('names', JSON.stringify(names));
	},
	changeSource: function(URL) {
		var sources = model.getParsedSources();
		sources[model.active_kitty] = URL;
		localStorage.setItem('sources', JSON.stringify(sources));
	},
	changeClicks: function(clickCount) {
		var clicks = model.getParsedClicks();
		clicks[model.active_kitty] = clickCount;
		localStorage.setItem('clicks', JSON.stringify(clicks));
	}
};


var octopus = {
	init: function(){
		model.init();
		var names = this.getNames();
		this.setActiveKitty(names[0]);
		view_main.init();
		view_nav.init();
		view_admin.init();
	},
	getActiveKitty: function() {
		return model.active_kitty;
	},
	setActiveKitty: function(name) {
		model.active_kitty = name;
	},
	getNames: function(){
		return model.getNames();
	},
	countClick: function(){
		var kitty = this.getActiveKitty();
		model.countClick(kitty);
	},
	getCount: function(name) {
		return model.getCount(name);
	},
	getSource: function(name) {
		return model.getSource(name);
	},
	changeCatInfo: function(name, URL, clickCount) {
		this.setActiveKitty(name);
		model.changeName(name);
		model.changeSource(URL);
		model.changeClicks(clickCount);
		view_nav.render();
		view_main.render();
	}
};


var view_main = {
	init: function(){
		this.name 	= document.getElementById('kittyName');
		this.pic 	= document.getElementById('kittyPic');
		this.clicks = document.getElementById('kittyClicks');
		// Sets an inital active kitty just to avoid issues
		octopus.setActiveKitty("Socks");
		this.pic.addEventListener('click', function() {
			octopus.countClick();
			view_main.render();
		});
		this.render();
	},
	render: function(){
		var active_kitty = octopus.getActiveKitty();
		this.name.textContent = active_kitty;
		this.pic.src = octopus.getSource(active_kitty);
		this.clicks.textContent = octopus.getCount(active_kitty);
	}
};


var view_nav = {
	init: function() {
		this.catnav = document.getElementById('catnav');
		this.render();
	},
	render: function() {
		var names, kitty, list_item;
		this.catnav.innerHTML = '';
		names = octopus.getNames();
		for (i = 0; i < names.length; i++){
			kitty = names[i];
			list_item = document.createElement("LI");
			list_item.id = 'nav' + kitty;
			list_item.textContent = kitty;
			list_item.addEventListener('click', (function(kittyCopy) {
				return function() {
					octopus.setActiveKitty(kittyCopy);
					view_main.render();
				};
			})(kitty));
			this.catnav.appendChild(list_item);
		}
	}
};


var view_admin = {
	init: function(){
		var admin_button, admin_UI, admin_submit, name, URL, clicks;
		admin_button 	= document.getElementById('admin');
		admin_UI 		= document.getElementById('admin_UI');
		admin_buttons	= document.getElementById('admin_buttons');
		admin_submit 	= document.getElementById('admin_submit');
		admin_cancel	= document.getElementById('admin_cancel');
		admin_button.addEventListener('click', function() {
			if (admin_UI.style.display == 'none') {
				admin_UI.style.display = 'block';
			}
			else {
				admin_UI.style.display = 'none';
			}
			if (admin_buttons.style.display == 'none') {
				admin_buttons.style.display = 'block';
			}
			else {
				admin_buttons.style.display = 'none';
			}
		});
		admin_submit.addEventListener('click', function() {
			active_kitty = octopus.getActiveKitty();
			name 	= document.getElementById('form_name').value;
			URL 	= document.getElementById('form_url').value;
			clicks 	= document.getElementById('form_clicks').value;
			if (name == null || name == '') {
				name = active_kitty;
			}
			if (URL == null || URL == '') {
				URL = octopus.getSource(active_kitty);
			}
			if (clicks == null || clicks == '') {
				clicks = octopus.getCount(active_kitty);
			}
			else {
				clicks = parseInt(clicks);
			}
			octopus.changeCatInfo(name, URL, clicks);
		});
		admin_cancel.addEventListener('click', function() {
			admin_UI.style.display = 'none';
			admin_buttons.style.display = 'none';
		});
	}
};


octopus.init();