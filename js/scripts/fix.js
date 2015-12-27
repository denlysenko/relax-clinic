/** 
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
	})(jQuery);