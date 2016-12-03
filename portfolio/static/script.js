'use strict';

// based on tympanus.net article on lateral scrolling by Mary Lou

var $sections = $('section');
var	$sectionsViewport, $sectionsOutViewport;
var	$win = $(window);
var	winSize	= {};
var	anim = false;

var init = function() {
	getWinSize();
	initEvents();
	defineViewport();
	setVisibilityLists();
	controlFade();
};

var setVisibilityLists	= function() {
	// builds lists of what is or isn't in view
	$sectionsViewport 		= $sections.filter(':inviewport');
	$sectionsOutViewport	= $sections.not( $sectionsViewport );
};

var getWinSize		= function() {
	// stores the height of the window
	winSize.height	= $win.height();
};

var initEvents = function() {
	// manages resize and scroll events, updating app as needed
	$(window).on('resize', function( event ) {
		// sets a new initial state based on the resize event
		getWinSize();
		setVisibilityLists();
	}),
	$(window).scroll(function( event ) {
		// set a timeout to avoid calling the controlFade function
		// on every scroll trigger
		setVisibilityLists();
		controlFade();
		/*
		if( anim ) return false;
		anim = true;
		setTimeout( function() {
			controlFade();
			anim = false;
		}, 10 );
		*/
	});
};

var defineViewport = function() {
	// defines the inviewport selector
	$.extend( $.expr[':'], {
		inviewport: function ( el ) {
			var elTop = $(el).offset.top;
			var elBottom = $(el).height() + elTop;
			if (( elTop < winSize.height )
				&& ( elBottom > $win.offset.top)) {
				return true;
			}
			return false;
		}
	});
};

var controlFade = function() {
	// adds or removes the "fade" class to control visibility as needed
	var winscroll = $win.scrollTop();
	$sectionsOutViewport.each( function(i) {
		var $item = $(this);
		var itemTop	= $item.offset().top;
		var itemBottom = $item.height() + itemTop;
		// hide the item if it is out of the viewport
		if (( itemTop > winSize.height + winscroll )
			|| ( itemBottom < $win.offset.top )) {
			$item.removeClass("fade");
		}
		// if not, make it visible
		else {
			$item.addClass("fade");
		}
	});
};

init();