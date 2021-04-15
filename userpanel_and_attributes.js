jQuery(document).ready(function(){	

// Tab nav fix tabindex=0
//jQuery('.post-inner *').attr('tabindex', '2');
jQuery('.entry-content').children().attr('tabindex', '2');
jQuery('article').addClass('cdm-speech');
// Changing the tags of Widget elements

let variable;
variable = jQuery('.wp-block-archives-list');
if(variable.length)
{
    variable.attr('aria-label', 'archives list section');
}
variable = jQuery('.wp-calendar-table');
if(variable.length)
{
    variable.attr('aria-label', 'calendar');
}
variable = jQuery('.wp-block-categories');
if(variable.length)
{
    variable.attr('aria-label', 'categories links section');
}
variable = jQuery('.wp-block-latest-comments');
if(variable.length)
{
    variable.attr('aria-label', 'user comments section');
}


if(scriptParams.Option_8=='on'){
	jQuery("img").each(function() { 
		var img_src = jQuery(this).attr('src');
		if (typeof img_src !== typeof undefined && img_src !== false) {
		var img_alt = jQuery(this).attr('alt');
		var str = img_src
		var pieces = str.split('/');
		var imgName = pieces[pieces.length-1];
		var imgnameArray = imgName.split('.');
		var alt = imgnameArray[0];
		if(img_alt == '' || typeof img_alt === typeof undefined || img_alt === false) {
		  jQuery(this).attr('alt',alt);
		}
		}
	}); 
}



// Wcag panel
// let tag = '<div class="WCAG-panel"></div>';

// let option1 = "<div class='text-scaler option'> <span class='text-scaler-name option-name'>Make the font larger or smaller</span><div class='text-scaler-block option-block'><span class='text-scaler-minus option-minus'>-</span><span class='text-scaler-size option-size' data-size='100'>100%</span><span class='text-scaler-plus option-plus'>+</span><div class='text-scaler-style' style='display:none;'><style>main {--text-scaler: 1;}</style></div></div>";
// let option2 = "<div class='btn-scaler option'> <span class='btn-scaler-name option-name'>Make the Buttons larger or smaller</span><div class='btn-scaler-block option-block'><span class='btn-scaler-minus option-minus'>-</span><span class='btn-scaler-size option-size' data-size='100'>100%</span><span class='btn-scaler-plus option-plus'>+</span><div class='btn-scaler-style' style='display:none;'><style>main {--btn-scaler: 1;}</style></div></div>";
// let option3 = "<div class='colorblind option'> <span class='option-name'>Colorblind options</span><div class='option-block'><button class='colorblind-mode-1'>Turn on grayscale mode</button><button class='colorblind-mode-2'>Turn on high contrast mode</button></div></div>";
// let option4 = "<div class='animations option'> <span class='option-name'>Turn off animations</span><div class='option-block'><button class=''>Turn off animations</button></div></div>";



// /*
// let option4 = "<div class='animations scaler'> 
//                     <span class='scaler-name'>Turn off animations</span>
//                     <div class='scaler-block'>
//                         <button class='colorblind-mode-1'>turn on colorblind mode 1</button>
//                         <button class='colorblind-mode-2'>turn on colorblind mode 2</button>
//                     </div>
//                 </div>";
//                 */
// jQuery('.page').append(tag);

// let wcag = jQuery('.WCAG-panel');
// wcag.append(option1);
// wcag.append(option2);
// wcag.append(option3);
// wcag.append(option4);



// Text larger-smaller sizing code
jQuery(document).mouseup(function(e) {
	var container = jQuery(".text-scaler-block");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.removeClass('active');
	}
});

jQuery('.text-scaler-minus').click(function(){
	jQuery('.text-scaler-plus').removeClass('disabled');
	var size = jQuery('.text-scaler-size').attr('data-size');
	var newsize = parseInt(size) - 25;
	if(newsize == 50){
		jQuery('.text-scaler-minus').addClass('disabled');
	}else{
		jQuery('.text-scaler-minus').removeClass('disabled');
	}
	var stylesize = parseInt(newsize) / 100;
	jQuery('.text-scaler-style').html('<style>main {--text-scaler: '+stylesize+';}</style>');
	jQuery('.text-scaler-size').text(newsize+"%");
	jQuery('.text-scaler-size').attr('data-size', newsize);
});

jQuery('.text-scaler-plus').click(function(){
	jQuery('.text-scaler-minus').removeClass('disabled');
	var size = jQuery('.text-scaler-size').attr('data-size');
	var newsize = parseInt(size) + 25;
	if(newsize == 400){
		jQuery('.text-scaler-plus').addClass('disabled');
	}else{
		jQuery('.text-scaler-plus').removeClass('disabled');
	}
	var stylesize = parseInt(newsize) / 100;
	jQuery('.text-scaler-style').html('<style>main {--text-scaler: '+stylesize+';}</style>');
	jQuery('.text-scaler-size').text(newsize+"%");
	jQuery('.text-scaler-size').attr('data-size', newsize);

});

jQuery('.text-scaler-btn').click(function(){
	if(jQuery('.text-scaler-block').hasClass('active')){
		jQuery('.text-scaler-block').removeClass('active');
	}else{
		jQuery('.text-scaler-block').addClass('active');
	}
});

// Button Larger/smaller
jQuery(document).mouseup(function(e) {
	var container = jQuery(".btn-scaler-block");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.removeClass('active');
	}
});

jQuery('.btn-scaler-minus').click(function(){
	jQuery('.btn-scaler-plus').removeClass('disabled');
	var size = jQuery('.btn-scaler-size').attr('data-size');
	var newsize = parseInt(size) - 25;
	if(newsize == 50){
		jQuery('.btn-scaler-minus').addClass('disabled');
	}else{
		jQuery('.btn-scaler-minus').removeClass('disabled');
	}
	var stylesize = parseInt(newsize) / 100;
	jQuery('.btn-scaler-style').html('<style>main {--btn-scaler: '+stylesize+';}</style>');
	jQuery('.btn-scaler-size').text(newsize+"%");
	jQuery('.btn-scaler-size').attr('data-size', newsize);
});

jQuery('.btn-scaler-plus').click(function(){
	jQuery('.btn-scaler-minus').removeClass('disabled');
	var size = jQuery('.btn-scaler-size').attr('data-size');
	var newsize = parseInt(size) + 25;
	if(newsize == 400){
		jQuery('.btn-scaler-plus').addClass('disabled');
	}else{
		jQuery('.btn-scaler-plus').removeClass('disabled');
	}
	var stylesize = parseInt(newsize) / 100;
	jQuery('.btn-scaler-style').html('<style>main {--btn-scaler: '+stylesize+';}</style>');
	jQuery('.btn-scaler-size').text(newsize+"%");
	jQuery('.btn-scaler-size').attr('data-size', newsize);
});

jQuery('.btn-scaler-btn').click(function(){
	if(jQuery('.btn-scaler-block').hasClass('active')){
		jQuery('.btn-scaler-block').removeClass('active');
	}else{
		jQuery('.btn-scaler-block').addClass('active');
	}
});

jQuery('.colorblind-mode-1').click(function(){
    let html = jQuery('main');
    if( (html.hasClass('colorblind1')) || (html.hasClass('colorblind2')) ){
        html.removeClass('colorblind1');
        html.removeClass('colorblind2');
    }
    else{
        html.addClass('colorblind1');
    }
});

jQuery('.colorblind-mode-2').click(function(){
    let html = jQuery('main');
    if( (html.hasClass('colorblind1')) || (html.hasClass('colorblind2')) ){
        html.removeClass('colorblind1');
        html.removeClass('colorblind2');
    }
    else{
        html.addClass('colorblind2');
    }
});

jQuery('.animations-off').click(function(){

	//let html = jQuery('main');
    if( (jQuery('.animations-off').hasClass('enabled')) ){
		jQuery('.animations-off').removeClass('enabled');
		jQuery('main *').addClass('noanimations');
    }
    else{
		jQuery('.animations-off').addClass('enabled');
        jQuery('main *').addClass('noanimations');
    }
});

jQuery('.enable-wcag').click(function(){
	if(jQuery('.WCAG-panel').hasClass('disabled')){
		jQuery('.WCAG-panel').removeClass('disabled');
	}else{
		jQuery('.WCAG-panel').addClass('disabled');
	}
});

});
