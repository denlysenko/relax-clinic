$(function() {
	
	
	$('.carousel').carousel({
		image: '.carousel > figure',
		nextControl: '.carousel-controls .right',
		prevControl: '.carousel-controls .left',
		indicators: '.carousel-indicators',
		duration: 1000,
		slideDuration: 5000
	})
})