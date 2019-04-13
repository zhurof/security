function screen(){
	var width = window.outerWidth;
	if(width >= 1820){
		return 'full';
	}else if(width>=1280 && width < 1820){
		return 'laptop';
	}else if(width >= 1024 && width < 1280){
		return 'tablet';
	}else if(width >= 768 && width < 1024){
		return 'phone';
	}else{
		return 'smallphone';
	}
}
function changeTemplate(){
	if(screen() != 'phone' && screen() != 'smallphone'){
		$('.header__menu').css('display','')
	}
	catalogFilter(category,page);
}
$(document).ready(changeTemplate);
$(window).resize(changeTemplate);

$(window).on('load scroll',function(){
	if($(this).scrollTop()){
		$('.header').addClass('fixed');
	}else{
		$('.header').removeClass('fixed');
		$('.scroll-btn').removeClass('hidden');
	}
})
$('.menu-btn').click(function(){
	$('.header__menu').fadeToggle(400);
})
$('.header__menu-close').click(function(){
	$('.header__menu').fadeOut(400);
})
$('.top-block__slider').slick({
	fade: true,
	speed: 1000,
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
	$(this).addClass('hidden');
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
var perespectiveOptions = {
	max: 13,
  scale: 1,
	reverseTilt: true,
	reverseTranslate: true,
  perspective: 600
}
$('.card').each(function(){
	new perspective.Hover(this,perespectiveOptions)
})

//Параллакс
$('.title-shadow').paroller({ 
	factor: 0.02,
	type: 'foreground',
	direction: 'vertical',
	transition: 'transform 1.5s linear'
});
$('.about,.actions__slide,.portfolio,.price-block,.reviews').paroller({ 
	factor: -0.05,
	direction: 'vertical',
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
$(document).ready(function(){
	$('.portfolio__box').css('display','block');
	$('.portfolio__box').isotope({
		// options
		itemSelector: '.card',
		layoutMode: 'fitRows'
	});
})

//Количество карточек на разных разрешениях экрана. Названия ключей соответствуют значениям, возвращаемым функцией screen()
var portfolio = {
	full: 12,
	laptop: 12,
	tablet: 9,
	phone: 4,
	smallphone: 4
};
//Глобальные переменные, содержащие информацию о текущих фильтрах
var category = '*',
		page = 1;

//Установка постраничной навигации или её сокрытие при ненадобности
function setPagination(){
	var amount = $('.portfolio__item').filter(category).size() || 0, //Колчиество карточек, попадающих под фильтр категории
			max = portfolio[screen()] || 1; //Максимальное количество карточек на странице
	$('.portfolio__pagination li').remove(); //Удаление старой пагинации
	if(amount > max){
		$('.portfolio__nav,.portfolio__arrows').css('display','');
		var pages = Math.ceil(amount/max); //Количество страниц
		for(var i = 0; i<pages;i++){
			$('.portfolio__pagination').append('<li></li>');
		}
		$('.portfolio__pagination li').eq(page-1).addClass('active'); //активное состояние для пункта пагинации текущей страницы
		
		/*меняем состояние навигационных стрелок и кнопок*/
		$('.portfolio__arrow,.portfolio__btn').removeClass('disabled');
		if(page == pages){
			$('.portfolio__arrow.next,.portfolio__btn.next').addClass('disabled');
		}
		if(page == 1){
			$('.portfolio__arrow.prev,.portfolio__btn.prev').addClass('disabled');
		}
	}else{//Если количество карточек на странице меньше максимального, убираем навигацию до лучших времён
		$('.portfolio__nav,.portfolio__arrows').hide();
	}
	
}
function catalogFilter(category='*',page=1){
	var itemsPerPage = portfolio[screen()]; //Максимальное количество карточек на странице
	$('.portfolio__item').removeClass('item'+page); //Сносим классы текущей страницы для старых фильтров
	$('.portfolio__item').filter(category).slice((page-1)*itemsPerPage,page*itemsPerPage).addClass('item'+page);//Добавляем классы текущей страницы для карточек, сооответствующих новому фильтру
	$('.portfolio__box').isotope({filter: category + '.item'+page});//Фильтруем
	setPagination();//Устанавливаем пагинацию (или удаляем при необходимости)
}

$('.portfolio__filter li').click(function(){
	$(this).siblings('.active').removeClass('active');
	if(!$(this).is('.active')){
		category = '.'+$(this).data('category');		
	}else{
		category = '*'
	}
	page = 1;
	$(this).toggleClass('active');	
	catalogFilter(category,page);
})
$('.portfolio__pagination').on('click','li',function(){
	page = +$(this).index()+1
	catalogFilter(category,page);
})

$('.portfolio__btn,.portfolio__arrow').click(function(){
	var nextPage,
			maxPages = $('.portfolio__pagination li').length || 0;
	if($(this).is('.next')){
		nextPage = +page+1
	}else{
		nextPage = +page-1
	}
	if(isFinite(nextPage) && nextPage >= 1 && nextPage <= maxPages){
		page = nextPage;
		catalogFilter(category,page);
	}
})

//слайдер брендов со случайной заменой
function changeBrand(){
	var amount = $('.brands__item').size() || 1,
			visible = $('.brands__item:visible').size() || 1,
			index = Math.round(Math.random()* (visible - 1)), //номер случайного элемента среди видимых
			commonIndex = $('.brands__item:visible').eq(index).index(), //номер случайного элемента среди всех
			newIndex = Math.round(Math.random()*(amount - visible) + visible); //выбираем случайный индекс из невидимых элементов		

	$('.brands__item').eq(index).clone().appendTo('.brands__box');
	$('.brands__item').eq(index).replaceWith($('.brands__item').eq(newIndex));		
}
$(document).ready(function(){
	setInterval(changeBrand,3000);
})
//Самописный "плагин" слайдера-стопки
$.fn.stackSlider = function(options){
	var defaultSettings = {
		offsetX: 110,
		offsetY: 95,
		responsive: false
	}
	var settings = $.extend(defaultSettings,options);
	var slider = this, 
			amount = slider.children().size(),
			responsive = settings.responsive;
	function init(){
		if(responsive){
			for(key in responsive){
				if(window.outerWidth<key){
					settings = $.extend(settings,responsive[key]);
					break;
				}
			}
		}
		locate();
	}
	function locate(){
		slider.children().each(function(){
			var index = $(this).index(),
					top = settings.offsetY/(amount-1)*index,
					left = settings.offsetX/(amount-1)*index;
			$(this).css('transform','translate('+left+'px,'+top+'px)')
		})
	}	
	init();
	$(window).resize(init);
	
	slider.children().click(function(){
		if(!$(this).is(':last-child')){
			$(this).appendTo(slider);
		}else{
			$(this).prependTo(slider);
		}
		locate();
	})
}
$('.card-slider').stackSlider({
	responsive: {
		1820: {
			offsetX: 40,
			offsetY: 47
		},
		1280: {
			offsetX: 34,
			offsetY: 38
		},
		1024: {
			offsetX: 257,
			offsetY: 122
		},
		768: {
			offsetX: 0,
			offsetY: 70
		}
	}
});
//Модальные окна
function openModal(modalId, initiator){  
  var scrollWidth = window.innerWidth - document.body.clientWidth;//Ширина полосы прокрутки
  
	$('.modal-wrapper').children().unwrap();
	if(!$('#'+modalId).length){
		alert('Ошибка вызова модального окна');
		return false;
	}
	$('#'+modalId).trigger('beforeShow',initiator).wrap('<div class="modal-wrapper" style="display:none" />');
	$('.modal-wrapper').fadeIn(400,function(){
    $('#'+modalId).trigger('afterShow',initiator);
  });
	
	if(scrollWidth){
		$('html').css('padding-right',scrollWidth);
		$('body').css('overflow-y','hidden');
	}
}
function closeModal(){
	$('.modal-wrapper').fadeOut(200, function(){
		$('html').css('padding-right','');
		$('body').css('overflow-y','');
	});
}
$(document).on('click', '[data-modal]', function(e){
	e.preventDefault();
	var modal = $(this).data('modal');
	openModal(modal,e.target);
})
$(document).on('click', '.modal__close', closeModal);

$(document).on('mousedown', '.modal-wrapper', function(e){
	if(!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0){
		closeModal();
	}
})
$(document).keydown(function(e){
	//Закрытие окна на Esc
	if(e.which == 27){
		closeModal();
	}
});

//отправка форм ajax-ом

/*В ajax-запрос не подтягиваются значения из input[type=submit], поэтому при рабочем javascript делаем дубль этого поля*/
$('form').append('<input type="hidden" name="form_action">');
/*И заполняем его при нажатии на кнопку отправки*/
$('form :submit').click(function(){
	$(this.form).find('[type="hidden"][name="form_action"]').val(this.value);
})
/*по вышеуказанной причине запрещаем отправку формы клавишей Enter*/
$('form').keydown(function(e){
		if(e.keyCode == 13) {
			e.preventDefault();
			return false;
	}
});
//Непосредственно отправка
$('form').submit(function(e){
	e.preventDefault();
	var form = this,
			formData = $(this).serializeArray()
	
	$.ajax({
		url: form.action,
		type: form.method,
		data: formData,
		success: function(data, textStatus, jqXHR){
			$('#form-message .modal__content').text(data);
			openModal('form-message',form)
			form.reset();
		},
		error: function(jqXHR,textStatus,errorThrown){
			$('#form-message .modal__content').text('Ошибка соединения с сервером');
			openModal('form-message',form);
			form.reset();
		}
	})
})