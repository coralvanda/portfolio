'use strict';

// based on a tympanus.net article on lateral scrolling by Mary Lou

var $sections = $('section');
var	$sectionsViewport, $sectionsOutViewport;
var	$win = $(window);
var	winSize	= {};

var init = function() {
	getWinSize();
	initEvents();
	controlFade();
};

var getWinSize = function() {
	// stores the height of the window
	winSize.height = $win.height();
};

var initEvents = function() {
	// manages resize and scroll events, updating app as needed
	$(window).resize(function( event ) {
		// sets a new initial state based on the resize event
		getWinSize();
		//setVisibilityLists();
	}),
	$(window).scroll(function( event ) {
		// adjust visibility after a scroll event
		//setVisibilityLists();
		controlFade();
	});
};

var controlFade = function() {
	// adds or removes the "fade" class to control visibility as needed
	var winscroll = $win.scrollTop();
	//$sectionsOutViewport.each( function(i) {
	$sections.each(function(i) {
		var $item = $(this);
		var itemTop	= $item.offset().top;
		var itemBottom = $item.height() + itemTop;
		if (( itemTop > winSize.height + winscroll )
			|| ( itemBottom < $win.offset.top )) {
			$item.removeClass("fade");
		}
		else {
			$item.addClass("fade");
		}
	});
};

init();