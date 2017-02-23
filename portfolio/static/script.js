'use strict';

// based on a tympanus.net article on lateral scrolling by Mary Lou

var	$win = $(window);
var	winSize	= {};
var bioHidden = true;
var $bio = $('#bio');
var $spacer = $('#spacer');
var $sections = $('section');
var $bioText = $('#show-bio');
var $projects = $('#projects');
var $footerContent = $('#footer-content');
var $headerContent = $('#header-content');
var $showBioButton = $('#show-bio-button');
var $projectBioBoxInner = $('#project-bio-box-inner');

var init = function() {
	getWinSize();
	initEvents();
	controlFade();
	setSpacerHeight();
	$bio.hide();
	$projects.hide();
};

var getWinSize = function() {
	// stores the height of the window
	winSize.height = $win.height();
};

var setSpacerHeight = function() {
	$spacer.height(winSize.height -
		($headerContent.height() + $('#project-bio-box').height()));
};

var initEvents = function() {
	// manages resize and scroll events, updating app as needed
	$(window).resize(function( event ) {
		// resets window height value based on the resize event
		getWinSize();
		controlFade();
		setSpacerHeight();
	}),
	$(window).scroll(function( event ) {
		// adjust visibility after a scroll event
		controlFade();
	});
};

var controlFade = function() {
	// adds or removes the "fade" class to control visibility as needed
	var screenTop = $win.scrollTop();
	$sections.each(function(i) {
		var $item = $(this);
		var itemTop	= $item.offset().top;
		var itemBottom = $item.height() + itemTop;
		var screenBottom = winSize.height + screenTop;
		if (( itemTop > screenBottom )
			|| ( itemBottom < screenTop )) {
			$item.removeClass("fade");
		}
		else {
			$item.addClass("fade");
		}
	});
};

$('#go-to-top').click(function () {
	$('html, body').animate({scrollTop: 0});
});

var showOrHideBio = function() {
	// hides the projects while showing the bio or vice versa
	if (bioHidden === true) {
		$headerContent.width('100%');
		$projectBioBoxInner.width('100%')
		$spacer.hide();
		$projects.hide();
		$bio.show();
		$footerContent.width('100%');
		$showBioButton.hide();
		$bioText.text('Projects');
		bioHidden = false;
	}
	else {
		$headerContent.width(650);
		$projectBioBoxInner.width(650)
		$spacer.show();
		$projects.show();
		$bio.hide();
		$footerContent.width(650);
		$showBioButton.show();
		$bioText.text('Bio');
		$('html, body').animate({scrollTop: $projects.offset().top});
		bioHidden = true;
	}
};

var showProjects = function() {
	// scrolls down to projects, or hides the bio and returns to projects
	if (bioHidden === true) {
		$projects.show();
		$('html, body').animate({scrollTop: $projects.offset().top});
	}
	else {
		showOrHideBio();
	}
};

$bioText.click(function () {
	showOrHideBio();
});

$showBioButton.click(function() {
	showOrHideBio();
});

$('#show-projects-button').click(function() {
	showProjects();
});

init();