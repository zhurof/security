function screen(){
	var width = $(window).width();
	if(width >= 1820){
		return 'full';
	}else if(width>=1280 && width < 1820){
		return 'laptop';
	}else if(width >= 1024 && width < 1280){
		return 'tablet';
	}else if(width >= 768 && width < 1024){
		return 'phone'
	}else{
		return 'smallphone'
	}
}
function changeTemplate(){
	if(screen() != 'phone' && screen() != 'smallphone'){
		$('.header__menu').css('display','')
	}
}
$(document).ready(changeTemplate);
$(window).resize(changeTemplate);

$(window).on('load scroll',function(){
	if($(this).scrollTop()){
		$('.header').addClass('fixed');
	}else{
		$('.header').removeClass('fixed');
		$('.scroll-btn').removeClass('anim');
	}
})
$('.menu-btn').click(function(){
	$('.header__menu').fadeToggle(400);
})
$('.header__menu-close').click(function(){
	$('.header__menu').fadeOut(400);
})
$('.top-block__slider').slick({
	prevArrow: '<span class="slick-arrow top-block__arrow prev"></span>',
	nextArrow: '<span class="slick-arrow top-block__arrow next"></span>',
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				arrows: false
			}
		}
	]
})

function validateInput(){
	if(!this.validity.valid){
		$(this).addClass('invalid')
	}else{
		$(this).removeClass('invalid')
	}
}
//типа валидация
$('[type=submit]').click(function(){
	var form = this.form
	if(form){
		$(form.elements).each(validateInput);
	}
})
$('input,textarea').on('input change',validateInput);

//Ненужная кнопка скрола
$('.scroll-btn').click(function(){
	$(this).addClass('anim');
	$('html, body').animate({
      scrollTop: +$('.services').offset().top + +$('.services').outerHeight()
    }, 800);
})
$('.actions__slider').slick({
	prevArrow: '<span class="slick-arrow white actions__arrow prev"></span>',
	nextArrow: '<span class="slick-arrow white actions__arrow next"></span>',
	dots: true,
	dotsClass: 'actions__dots',
	appendDots: '.actions__head .wrapper', 
	customPaging: function(slider,index){
		return $(slider.$slides[index]).data('caption');
	},
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				arrows: false
			}
		}
	]
})

//Слайдер карточек
function locateSlide(){
	var index = $(this).index(),
			amount = +$(this).siblings().length + 1,
			top = 95/(amount-1)*index,
			left = 110/(amount-1)*index;
	$(this).css('transform','translate('+left+'px,'+top+'px)')
}
$('.card-slider').each(function(){
	var slideAmount = $(this).children('.card-slider__item').size();
	if(slideAmount){
		$(this).children('.card-slider__item').each(locateSlide)
	}
})
$('.card-slider__item').click(function(){
	if(!$(this).is(':last-child')){
		$(this).appendTo($(this).parent());
		$(this).parent().children().each(locateSlide);
	}else{
		$(this).prependTo($(this).parent());
		$(this).parent().children().each(locateSlide);
	}
})

//отзывы
$('.reviews__persons').slick({
	slidesToShow: 3,
	centerMode: true,
	focusOnSelect: true,
	centerPadding: 0,
	prevArrow: '<span class="slick-arrow reviews__arrow prev"></span>',
	nextArrow: '<span class="slick-arrow reviews__arrow next"></span>',
	asNavFor: $('.reviews__slider'),
	responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: false
			}
		}
	]
})
$('.reviews__slider').slick({
	arrows: false,
	asNavFor: $('.reviews__persons'),
	dots: true,
	dotsClass: 'slick-dots reviews__dots',
	customPaging: function(){return ''},
	responsive: [
		{
			breakpoint: 768,
			settings: {
				dots: false
			}
		}
	]
})
// PERSPECTIVE
/* var wrap = document.querySelector('.card')
var hover = new perspective.Hover(wrap) */
var perespectiveOptions = {
	max: 5,
  //reverseTilt: true,
  scale: 1,
  perspective: 100
}
$('.card').each(function(){
	new perspective.Hover(this,perespectiveOptions)
})
/* var tiltSettings = [
{},
{
	movement: {
		imgWrapper : {
			translation : {x: 10, y: 10, z: 30},
			rotation : {x: 0, y: -10, z: 0},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		},
		lines : {
			translation : {x: 10, y: 10, z: [0,70]},
			rotation : {x: 0, y: 0, z: -2},
			reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
		},
		caption : {
			rotation : {x: 0, y: 0, z: 2},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		},
		overlay : {
			translation : {x: 10, y: -10, z: 0},
			rotation : {x: 0, y: 0, z: 2},
			reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
		},
		shine : {
			translation : {x: 100, y: 100, z: 0},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		}
	}
}];

function init() {
	var idx = 0;
	[].slice.call(document.querySelectorAll('.portfolio__item')).forEach(function(el, pos) { 
		idx = pos%2 === 0 ? idx+1 : idx;
		new perspective.Hover(el, tiltSettings[idx-1]);
	});
}
init(); 	 */

//Параллакс
$('.title-shadow').paroller({ 
	factor: -0.035,
	type: 'foreground',
	direction: 'vertical',
	transition: 'transform 1s ease-out'
});

//Плавная прокрутка ссылкам меню
$('.header__menu a[href^="#"]').click(function(e){
	e.preventDefault();
	var hash = $(this).attr('href');
	if($(hash).length){
		$('.header__menu').css('display','');
		$('html, body').animate({
          scrollTop: $(hash).offset().top - $('.header').outerHeight()
        }, 400);				
        return false;
	}
})

//Эрзац табы
$('.tabs').slick({
	accessability: false,
	infinite: false,
	swipe: false,
	fade: true,
	arrows: false,
	dots: true,
	dotsClass: 'tabs__head',
	customPaging: function(slider,i){
		return $(slider.$slides[i]).data('caption')
	},
	responsive: [
		{
			breakpoint: 768,
			settings: {
				adaptiveHeight: true
			}
		}
	]
})
$('.price-block__tabs').on('beforeChange',function(event,slick,currentSlide,nextSlide){
	var index = $(slick.$slides[nextSlide]).data('image');
	if(!isFinite(index)){
		index = nextSlide
	}
	$(this).parents('.price-block').find('.composition img').removeClass('active').eq(index).addClass('active');
})
//сетка isotope в портфолио
var portfolio = {
	full: 12,
	laptop: 12,
	tablet: 9,
	mobile: 4,
	smallphone: 4
};
var filterClass;

function setPagination(){
	var amount = $('.portfolio__item').size() || 0,
			max = portfolio[screen()] || 1;
	$('.portfolio__pagination li').remove();
	if(amount > max){
		$('.portfolio__pagination').css('display','');
		var pages = Math.ceil(amount/max);
		for(var i = 0; i<pages;i++){
			$('.portfolio__pagination').append('<li></li>');
		}
	}else{
		$('.portfolio__pagination').hide();
	}
}
$(document).ready(function(){
	$('.portfolio__box').css('display','block');
	$('.portfolio__box').isotope({
		// options
		itemSelector: '.card',
		layoutMode: 'fitRows'
	});
})
$('.portfolio__filter li').click(function(){
	if(!$(this).is('.active')){
		filterClass = $(this).data('category');
	}else{
		
	}
	$(this).toggleClass('active')
	
	$('.portfolio__box').isotope({ filter: '.'+category })
})

