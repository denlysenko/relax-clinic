$(function() {
	
	
	$('.carousel').carousel({
		image: '.carousel > figure',
		nextControl: '.carousel-controls .right',
		prevControl: '.carousel-controls .left',
		indicators: '.carousel-indicators',
		duration: 1000,
		slideDuration: 5000
	})
});/** 
	* This module fixes position of element with class 'slogan' 
	*	relative to header element and slider controls.
	*	When left edge of the slogan is on the right edge of the header 
	*	top property is set in the position at beneath of header. 
	**/
	(function($){
		$.fn.fixPosition = function() {

			fixSloganPosition($('.slogan')); // fixing position because we don't know width of user's device initially

			$(window).on('resize', function(){
				fixSloganPosition($('.slogan'));
			}); // fixing position after each resizing of window

			function fixSloganPosition(slogan) {
				
				var header = $('header'),
						headerRightEdge = header.position().left + header.outerWidth(),
						headerBottomEdge = header.position().top + header.outerHeight();
				 		left = slogan.position().left;
					 	bottom = slogan.position().top + slogan.outerHeight();

				if(left <= headerRightEdge) {
					slogan.css({
						top: headerBottomEdge + 10,
						'transform': 'translate(-50%,0)'
					})
				} else {
					slogan.css({
						top: '',
						'transform': ''
					});
				}
			}
		}
	})(jQuery);;/**
*	This extension makes carousel functionality.
*	@param image {selector} element to slide
*	@param nextControl {selector} control to slide to the next item
*	@param prevControl {selector} control to slide to the prev item
*	@param indicator {selector} container where indicators will be created
*	@param duration {number} duration of the change animation
*	@param slide {boolean} automatically changing photos 
*	@param slideDuration {number} duration of automatic changing photos 
**/

(function($) {
	$.fn.carousel = function(options) {
		var settings = $.extend({
					image: null,
					nextControl: null,
					prevControl: null,
					indicators: null,
					duration: 800,
					slide: true,
					slideDuration: 3000
				}, options || {}),
				timer;

		function createIndicators(pos) { // creates indicators relatively to the number of images
			$('<a href="#" role="button">')
					.appendTo($(settings.indicators))
					.data('position', pos)
					.click(function() {
						showImage($(this).data('position'));
						return false; // disable standard behaviour of the link
			});
		}

		function showImage(index) {
			var $indicator = $(settings.indicators).find('a'),
					$img = $(settings.image);

			if(timer) {
				clearInterval(timer);
				timer = null;
			}		

			$img.stop().fadeOut(settings.duration);
			$indicator.removeClass('active');
			$img.eq(index).stop().fadeIn(settings.duration);
			$indicator.eq(index).addClass('active');
			settings.current = index;
			startSlide();
		}

		function startSlide() { 
			if(!timer) {
				timer = setInterval(function(){
					$(settings.nextControl).click();
				}, settings.slideDuration)
			}
		}

		settings.current = 0; // initialize index of the currently shown image

		$(settings.image).each(function(i) {
			createIndicators(i);
		})

		$(settings.nextControl).click(function() {
			showImage((settings.current + 1) % $(settings.image).length);// зацикливаем
			return false;
		});

		$(settings.prevControl).click(function() {
			showImage(($(settings.image).length + settings.current - 1) % $(settings.image).length);
			return false;
		})

		showImage(settings.current);

		if(settings.slide) {
			startSlide();
		}

		return this;
	};
})(jQuery);