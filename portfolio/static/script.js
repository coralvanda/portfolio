'use strict';

// based on a tympanus.net article on lateral scrolling by Mary Lou

var $sections = $('section');
var	$win = $(window);
var	winSize	= {};
var bioHidden = true;
var bioTextElem = $('#show-bio');

var init = function() {
	getWinSize();
	initEvents();
	controlFade();
	$('#bio').hide();
};

var getWinSize = function() {
	// stores the height of the window
	winSize.height = $win.height();
};

var initEvents = function() {
	// manages resize and scroll events, updating app as needed
	$(window).resize(function( event ) {
		// resets window height value based on the resize event
		getWinSize();
		controlFade();
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
	if(bioHidden === true) {
		$('#header-content').width('100%');
		$('#project-bio-box-inner').width('100%')
		$('#projects').hide();
		$('#bio').show();
		$('#footer-content').width('100%');
		bioTextElem.text('Projects');
		bioHidden = false;
	} else {
		$('#header-content').width(650);
		$('#project-bio-box-inner').width(650)
		$('#projects').show();
		$('#bio').hide();
		$('#footer-content').width(650);
		bioTextElem.text('Bio');
		bioHidden = true;
	}
};

$('#show-bio').click(function () {
	showOrHideBio();
});

$('#show-bio-button').click(function() {
	showOrHideBio();
});

$('#show-projects-button').click(function() {
	showOrHideBio();
});

init();