jQuery(document).ready(function(){	

	if(jQuery('.speech-btn').length > 0 && jQuery('.cdm-speech').length > 0){
		var audioElement = document.createElement('audio');
		var audioElementSelect = document.createElement('audio');

		audioElement.setAttribute('crossorigin', 'anonymous');  
		//var html = '<span class="selection-toolbar"><button type="button" id="read-tooltip" class="read-tooltip"><span class="load"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zM20 3v2h2v14h-2v2h4V3zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path></svg></span><span class="load-active"><svg viewBox="0 0 24 24"><style>@keyframes dre-icon-activity{0%{transform:scale(1,.6666667)}50%{transform:scale(1,.3333333)}to{transform:scale(1,1)}}.dre-icon-activity__bar{animation:.9s dre-icon-activity 0s ease infinite;transform-origin:0 20px}</style><path class="dre-icon-activity__bar" d="M4 4h4v16H4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.6s" d="M10 4h4v16h-4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.3s" d="M16 4h4v16h-4z"></path></svg></span><span class="text-load">Read this</span><span class="text-active">Reading...</span></button></span>';
		//var html = '<div class="selection-toolbar"><button type="button" id="read-tooltip" class="read-tooltip"><span class="load"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zM20 3v2h2v14h-2v2h4V3zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path></svg></span><span class="load-active"><svg viewBox="0 0 24 24"><style>@keyframes dre-icon-activity{0%{transform:scale(1,.6666667)}50%{transform:scale(1,.3333333)}to{transform:scale(1,1)}}.dre-icon-activity__bar{animation:.9s dre-icon-activity 0s ease infinite;transform-origin:0 20px}</style><path class="dre-icon-activity__bar" d="M4 4h4v16H4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.6s" d="M10 4h4v16h-4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.3s" d="M16 4h4v16h-4z"></path></svg></span><span class="text-load">Read this</span><span class="text-active">Reading...</span></button> <button type="button" id="explanations-tooltip" class="explanations-tooltip"><span class="load load2"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zm20 0v2h2v14h-2v2h4V3zM11 13.7c0-1.4.8-2.1 1.5-2.8.7-.6 1.4-1.2 1.4-2.1 0-.9-.6-1.5-1.7-1.5-1.3 0-2.1.9-2.1 2.2H7.7c0-2.6 1.9-4.3 4.5-4.3 2.4 0 4 1.4 4 3.4 0 1.5-1 2.4-1.8 3.2-.9.8-1.4 1.3-1.4 2.1v.3h-2v-.5zm-.3 2.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4z"></path></svg></span><span class="text-load">Explain</span></button></div>';
		var html = '<div class="selection-toolbar"><button type="button" id="read-tooltip" class="read-tooltip"><span class="load"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zM20 3v2h2v14h-2v2h4V3zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path></svg></span><span class="load-active"><svg viewBox="0 0 24 24"><style>@keyframes dre-icon-activity{0%{transform:scale(1,.6666667)}50%{transform:scale(1,.3333333)}to{transform:scale(1,1)}}.dre-icon-activity__bar{animation:.9s dre-icon-activity 0s ease infinite;transform-origin:0 20px}</style><path class="dre-icon-activity__bar" d="M4 4h4v16H4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.6s" d="M10 4h4v16h-4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.3s" d="M16 4h4v16h-4z"></path></svg></span><span class="text-load">Read this</span><span class="text-active">Reading...</span></button> <button type="button" id="explanations-tooltip" class="explanations-tooltip"><span class="load load2"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zm20 0v2h2v14h-2v2h4V3zM11 13.7c0-1.4.8-2.1 1.5-2.8.7-.6 1.4-1.2 1.4-2.1 0-.9-.6-1.5-1.7-1.5-1.3 0-2.1.9-2.1 2.2H7.7c0-2.6 1.9-4.3 4.5-4.3 2.4 0 4 1.4 4 3.4 0 1.5-1 2.4-1.8 3.2-.9.8-1.4 1.3-1.4 2.1v.3h-2v-.5zm-.3 2.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4z"></path></svg></span><span class="text-load">Explain</span></button><span class="explanations-screen"><span class="explanations-content"><span class="explanations-word"></span><span class="explanations-description"></span></span><div class="explanations-control"><button class="exp-ctrl-back"><div class="exp-ctrl-back-arrow disabled"><svg viewBox="0 0 24 24"><path d="M16.9 24l-12-12 12-12 1.4 1.4L7.8 12l10.5 10.6z"></path></svg><span class="exp-ctrl-back-label">Back</span></div></button><span class="exp-counter"></span><button class="exp-ctrl-next"><div class="exp-ctrl-next-arrow"><svg viewBox="0 0 24 24"><path d="M7.1 24l-1.4-1.4L16.2 12 5.7 1.4 7.1 0l12 12z"></path></svg><span class="exp-ctrl-next-label">Next</span></div></button></div></span></div>';

		/*
		var html = '<div class="selection-toolbar">\
				<div class="explanations-screen">\
					<div class="explanations-content">\
						<span class="explanations-word">\
						</span>\
						<span class="explanations-description">\
						</span>\
					</div>\
					<div class="explanations-control">\
						<button class="exp-ctrl-btn exp-ctrl-back">\
							<div class="exp-ctrl-arr exp-ctrl-back-arrow">\
								<svg class="ctrl-arr-svg" viewBox="0 0 24 24">\
									<path d="M16.9 24l-12-12 12-12 1.4 1.4L7.8 12l10.5 10.6z">\
									</path>\
								</svg>\
								<span class="exp-ctrl-back-label">\
									Back\
								</span>\
							</div>\
						</button>\
						<span class="exp-counter">\
						12/12</span>\
						<button class="exp-ctrl-btn exp-ctrl-next">\
							<div class=" exp-ctrl-arr exp-ctrl-next-arrow">\
								<span class="exp-ctrl-next-label">\
									Next\
								</span>\
								<svg class="ctrl-arr-svg" viewBox="0 0 24 24">\
								<path d="M7.1 24l-1.4-1.4L16.2 12 5.7 1.4 7.1 0l12 12z">\
								</path>\
							</svg>\
							</div>\
						</button>\
					</div>\
				</div>\
				<button type="button" id="read-tooltip" class="read-tooltip">\
					<span class="load">\
						<svg viewBox="0 0 24 24">\
							<path d="M0 3v18h4v-2H2V5h2V3zM20 3v2h2v14h-2v2h4V3zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z">\
							</path>\
						</svg>\
					</span>\
					<span class="load-active">\
						<svg viewBox="0 0 24 24">\
							<style>@keyframes dre-icon-activity{0%{transform:scale(1,.6666667)}50%{transform:scale(1,.3333333)}to{transform:scale(1,1)}}.dre-icon-activity__bar{animation:.9s dre-icon-activity 0s ease infinite;transform-origin:0 20px}\
							</style>\
							<path class="dre-icon-activity__bar" d="M4 4h4v16H4z">\
							</path>\
							<path class="dre-icon-activity__bar" style="animation-delay:-.6s" d="M10 4h4v16h-4z">\
							</path>\
							<path class="dre-icon-activity__bar" style="animation-delay:-.3s" d="M16 4h4v16h-4z">\
							</path>\
						</svg>\
					</span>\
					<span class="text-load">\
						Read this\
					</span>\
					<span class="text-active">\
						Reading...\
					</span>\
				</button><button type="button" id="explanations-tooltip" class="explanations-tooltip">\
					<span class="load load2">\
						<svg viewBox="0 0 24 24">\
							<path d="M0 3v18h4v-2H2V5h2V3zm20 0v2h2v14h-2v2h4V3zM11 13.7c0-1.4.8-2.1 1.5-2.8.7-.6 1.4-1.2 1.4-2.1 0-.9-.6-1.5-1.7-1.5-1.3 0-2.1.9-2.1 2.2H7.7c0-2.6 1.9-4.3 4.5-4.3 2.4 0 4 1.4 4 3.4 0 1.5-1 2.4-1.8 3.2-.9.8-1.4 1.3-1.4 2.1v.3h-2v-.5zm-.3 2.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4z">\
							</path>\
						</svg>\
					</span>\
					<span class="text-load">Explain\
					</span>\
				</button>\
			</div>';
			*/
			var html = '<div class="selection-toolbar"><div class="explanations-screen"><div class="explanations-content"><span class="explanations-word"></span><span class="explanations-description"></span></div><div class="explanations-control"><button class="exp-ctrl-btn exp-ctrl-back"><div class="exp-ctrl-arr exp-ctrl-back-arrow"><svg class="ctrl-arr-svg" viewBox="0 0 24 24"><path d="M16.9 24l-12-12 12-12 1.4 1.4L7.8 12l10.5 10.6z"></path></svg><span class="exp-ctrl-back-label">Back</span></div></button><span class="exp-counter">12/12</span><button class="exp-ctrl-btn exp-ctrl-next"><div class=" exp-ctrl-arr exp-ctrl-next-arrow"><span class="exp-ctrl-next-label">Next</span><svg class="ctrl-arr-svg" viewBox="0 0 24 24"><path d="M7.1 24l-1.4-1.4L16.2 12 5.7 1.4 7.1 0l12 12z"></path></svg></div></button></div></div><button type="button" id="read-tooltip" class="read-tooltip"><span class="load"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zM20 3v2h2v14h-2v2h4V3zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path></svg></span><span class="load-active"><svg viewBox="0 0 24 24"><style>@keyframes dre-icon-activity{0%{transform:scale(1,.6666667)}50%{transform:scale(1,.3333333)}to{transform:scale(1,1)}}.dre-icon-activity__bar{animation:.9s dre-icon-activity 0s ease infinite;transform-origin:0 20px}</style><path class="dre-icon-activity__bar" d="M4 4h4v16H4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.6s" d="M10 4h4v16h-4z"></path><path class="dre-icon-activity__bar" style="animation-delay:-.3s" d="M16 4h4v16h-4z"></path></svg></span><span class="text-load">Read this</span><span class="text-active">Reading...</span></button><button type="button" id="explanations-tooltip" class="explanations-tooltip"><span class="load load2"><svg viewBox="0 0 24 24"><path d="M0 3v18h4v-2H2V5h2V3zm20 0v2h2v14h-2v2h4V3zM11 13.7c0-1.4.8-2.1 1.5-2.8.7-.6 1.4-1.2 1.4-2.1 0-.9-.6-1.5-1.7-1.5-1.3 0-2.1.9-2.1 2.2H7.7c0-2.6 1.9-4.3 4.5-4.3 2.4 0 4 1.4 4 3.4 0 1.5-1 2.4-1.8 3.2-.9.8-1.4 1.3-1.4 2.1v.3h-2v-.5zm-.3 2.8c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4z">\</path></svg></span><span class="text-load">Explain</span></button></div>';


		jQuery('body').append(html);
		jQuery(document).on('click', '.read-tooltip', function(event){
			if(jQuery('.read-tooltip').hasClass('active')){
				jQuery('.read-tooltip').removeClass('active');
				audioElementSelect.pause();
			}else{
				jQuery('.read-tooltip').addClass('load');
				jQuery('.read-tooltip').addClass('active');
				startreadselecttext(getSelectionText());
			}
		});
	
		function getSelectionText() {
			
			var text = "";
			var activeEl = document.activeElement;
			var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
			if (
			  (activeElTagName == "textarea") || (activeElTagName == "input"  &&
			  /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
			  (typeof activeEl.selectionStart == "number")
			) {
				text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
			} else if (window.getSelection) {
				text = window.getSelection().toString();
			}
			return text;
		}
		
		
		if(jQuery(window).width() > 768){
			var matchedWords;
			jQuery('.cdm-speech').mouseup(function(e){
				matchedWords=[];
				audioElementSelect.pause();
				jQuery('.selection-toolbar').hide();
				jQuery('.cdm-speech').find('.active-text').addClass('hide');
				audioElement.pause();
				jQuery('.audioplayer .play').show();
				jQuery('.audioplayer .stop').hide();
				
				jQuery('.selection-toolbar').removeClass('active');
				jQuery('.selection-toolbar').hide();
					
				var selection = window.getSelection(); 
				var range = selection.getRangeAt(0);
		
				var selTop = range.getBoundingClientRect().top;
				var selLeft = range.getBoundingClientRect().left;
				var selWidth = range.getBoundingClientRect().width; 
				
				var newTipLeft = selLeft + selWidth / 2 - window.scrollX; 
			
				var newTipBottom = window.innerHeight - selTop - window.scrollY; 
		
				var buffer = 25;
				var tipHalfWidth = 200 / 2;
			
				var realTipLeft = newTipLeft;
				var realTipRight = realTipLeft;
			
				if (realTipLeft < buffer) {
				  newTipLeft = buffer;
				} else if (realTipRight > window.innerWidth - buffer) {
				  newTipLeft = window.innerWidth - buffer;
				}
				setTimeout(function(){
	
					jQuery('.explanations-tooltip').hide();
					jQuery('.explanations-screen').hide();
					if(selectedText = getSelectionText()){ //this
						jQuery('.selection-toolbar').css('bottom', newTipBottom + 15); //changed from .read-tooltip
						jQuery('.selection-toolbar').css('left', newTipLeft - 100); //changed from .read-tooltip
						jQuery('.selection-toolbar').show();
						selectedText = selectedText.toLowerCase();
						if(explanation_words){
							let regex = new RegExp('/\s/');
							selectedText= selectedText.split(/\s/);
							for (let [key, value] of Object.entries(explanation_words)) {
								if(selectedText.find((el)=>el==key)){
									matchedWords.push(key);
								}
							}
							//take matchedWords and print some stuff
							if(matchedWords.length > 0){
								jQuery('.read-tooltip').addClass('border');
								jQuery('.explanations-tooltip').show();
							}
							else{
								jQuery('.read-tooltip').removeClass('border');
								jQuery('.explanations-tooltip').hide();
	
							}
						}

					}
				
				}, 10);

			});
			
			//Explanations tooltip click
			jQuery('.explanations-tooltip').click(function() {
				console.log(matchedWords);
				console.log(explanation_words);
				jQuery('.exp-ctrl-next').removeClass('disenabled');
				jQuery('.exp-ctrl-back').addClass('disenabled');
				jQuery('.exp-counter').text
				if(matchedWords.length>0){
					var max = matchedWords.length;
					var min = 0;
					var exp_words_key = Object.keys(explanation_words);
					console.log('matched : '+matchedWords[min]);
					jQuery('.exp-counter').text(min+1+'/'+max);
					jQuery('.explanations-word').text(exp_words_key[min]);
					jQuery('.explanations-description').text(explanation_words[matchedWords[min]]);

					//Next and back arrows
					jQuery('.exp-ctrl-next-arrow').click(function() {
						if(min+1!==max){
							jQuery('.exp-ctrl-back').removeClass('disenabled');
							min++;
							jQuery('.exp-counter').text(min+1+'/'+max);
							jQuery('.explanations-word').text(exp_words_key[min]);
							jQuery('.explanations-description').text(explanation_words[matchedWords[min]]);
							if(min+1==max){
								jQuery('.exp-ctrl-next').addClass('disenabled');
							}
						}
					});
					jQuery('.exp-ctrl-back-arrow').click(function() {
						if(min!==0){
							jQuery('.exp-ctrl-next').removeClass('disenabled');
							min--;
							jQuery('.exp-counter').text(min+1+'/'+max);
							jQuery('.explanations-word').text(exp_words_key[min]);
							jQuery('.explanations-description').text(explanation_words[matchedWords[min]]);
							if(min==0){
								jQuery('.exp-ctrl-back').addClass('disenabled');
							}
						}
					});

				}
				if(jQuery('.explanations-screen').is(':hidden')){
					jQuery('.explanations-screen').show();
				}
				else{ 
					jQuery('.explanations-screen').hide();
				}

			});





			jQuery("body").click(function() {
				setTimeout(function(){
					if(!getSelectionText()){
						audioElementSelect.pause();
						document.getSelection().removeAllRanges();
						jQuery('.selection-toolbar').hide();	
						if(matchedWords.length>0){
							matchedWords=[];
						}	
					}
				}, 10);
			});
		}
		



		jQuery('.cdm-speech h1, .cdm-speech h2, .cdm-speech h3, .cdm-speech h4, .cdm-speech h5, .cdm-speech h6, .cdm-speech p').addClass('cdm-speech-text');

		jQuery('.speech-btn').click(function(){
			closetooltip();
			jQuery('.cdm-speech').find('.active-text').removeClass('active-text');
			audioElement.pause();
			jQuery('.audioplayer').remove();
			
			var text = '';
			var firsttext = true;
			var count = 0;
			
			jQuery('.cdm-speech .cdm-speech-text').each(function(){
				if(firsttext){
					text = jQuery(this).text();
					jQuery(this).addClass('active-text');
					firsttext = false;	
				}
				count++;
			});
			var one_procent = 135 / count;
			var procent = 135 - one_procent;
			var exist = 1;
			if(count == 0){
				exist = 0;
			}
			startreadtext(text, exist, procent);

		});
		
		function closetooltip(){
			audioElementSelect.pause();
			jQuery('.cdm-speech').find('.active-text').removeClass('hide');
			document.getSelection().removeAllRanges();
			jQuery('.read-tooltip').hide();
		}
		
		audioElementSelect.addEventListener('ended', function() {
			audioElementSelect.pause();
			jQuery('.read-tooltip').removeClass('active');
		}, false);
		
		audioElement.addEventListener('ended', function() {
			var nr = jQuery('.audioplayer').attr('data-active');
			nr++;
			findnextreadtext(nr);
		}, false);
		
		jQuery(document).on('click', '.audioplayer .next', function(){
			closetooltip();
			audioElement.pause();
			var nr = jQuery('.audioplayer').attr('data-active');
			nr++;
			findnextreadtext(nr);
		});
		
		jQuery(document).on('click', '.audioplayer .prev', function(){
			closetooltip();
			var nr = jQuery('.audioplayer').attr('data-active');
			nr--;
			findnextreadtext(nr);
		});
		
		jQuery(document).on('click', '.audioplayer .play', function(){
			closetooltip();
			jQuery('.audioplayer .stop').show();
			jQuery('.audioplayer .play').hide();
			audioElement.play();
			var speedttext = jQuery('.text-speed-list li.active').attr('data-speed');
			audioElement.playbackRate = speedttext;
		});
	
		jQuery(document).on('click', '.audioplayer .stop', function(){
			jQuery('.audioplayer .stop').hide();
			jQuery('.audioplayer .play').show();
			audioElement.pause();s
		});
		
		jQuery(document).on('click', '.audioplayer .close', function(){
			jQuery('.cdm-speech').find('.active-text').removeClass('hide');
			jQuery('.cdm-speech').find('.active-text').removeClass('active-text');
			jQuery('.audioplayer').remove();
			audioElement.pause();
		});
		
		jQuery(document).on('click', '.text-speed-list li', function(){
			jQuery('.text-speed-list li.active').removeClass('active');
			jQuery(this).addClass('active');
			var speedttext = jQuery(this).attr('data-speed');
			audioElement.playbackRate = speedttext;
			jQuery('#text-speed').html(speedttext+'x');
			jQuery('.text-speed-list').removeClass('active');
			jQuery('.text-speed-list').slideUp();
		});
		
		jQuery(document).on('click', '#text-speed', function(){
			if(jQuery('.text-speed-list').hasClass('active')){
				jQuery('.text-speed-list').removeClass('active');
				jQuery('.text-speed-list').slideUp();
			}else{
				jQuery('.text-speed-list').addClass('active');
				jQuery('.text-speed-list').slideDown();
			}
		});
		
		
		jQuery(document).mouseup(function(e) {
			var container = jQuery(".text-speed-list");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				jQuery('.text-speed-list').removeClass('active');
				jQuery('.text-speed-list').slideUp();
			}
		});
		
		
		function findnextreadtext(nr){
			var text = '';
			var count = 1;
			jQuery('.audioplayer').attr('data-active', nr);
			jQuery('.cdm-speech').find('.active-text').removeClass('active-text');
			jQuery('.cdm-speech .cdm-speech-text').each(function(){
				if(count == nr){
					text = jQuery(this).text();
					jQuery(this).addClass('active-text');
					startreadtext(text);
				}
				count++;
			});
			
			var one_procent = 135 / (count - 1);
			var procent = 135 - one_procent * nr;
			
			jQuery('.audioplayer .bar-line svg .progress-circle').css('stroke-dashoffset', procent);
			
			var last = nr - 1;
			var lastcount = count - 1;
			if(nr == 1){
				jQuery('.audioplayer .prev').attr('disabled', true);
			}else{
				jQuery('.audioplayer .prev').attr('disabled', false);
			}
			if(lastcount == nr){
				jQuery('.audioplayer .next').attr('disabled', true);
			}else{
				jQuery('.audioplayer .next').attr('disabled', false);
			}
			if(count == nr){
				audioElement.pause();
				jQuery('.audioplayer').remove();
			}
		}
		
		function startreadselecttext(text){
			var xhr = new XMLHttpRequest();
			var url = '/wp-content/plugins/codemakers-wcag/polly_ajax.php';
			var params = 'pollytext='+text;
			xhr.open('POST', url, true);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.onload = function(oEvent){
				var audioblob = new Blob([xhr.response], {type: 'audio/mpeg'});
				var objectURL = URL.createObjectURL(audioblob);
				audioElementSelect.setAttribute('src', objectURL);
				audioElementSelect.play()
				jQuery('.read-tooltip').removeClass('load');
			}
			xhr.send(params);
		}
		
		function startreadtext(text, exist, procent){
		
			if(exist != 0){
				var xhr = new XMLHttpRequest();
				var url = '/wp-content/plugins/codemakers-wcag/polly_ajax.php';
				var params = 'pollytext='+text;
				xhr.open('POST', url, true);
				xhr.responseType = 'blob';
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.onload = function(oEvent){
					var audioblob = new Blob([xhr.response], {type: 'audio/mpeg'});
					var objectURL = URL.createObjectURL(audioblob);
					audioElement.setAttribute('src', objectURL);
					if(jQuery('.audioplayer .stop').css('display') == 'inline-block'){
						audioElement.play();
						var speedttext = jQuery('.text-speed-list li.active').attr('data-speed');
						audioElement.playbackRate = speedttext;
					}
					if(jQuery('.audioplayer').length == 0 && jQuery('.read-tooltip').css('display') != 'block'){
						jQuery('body').append('<div class="audioplayer" data-active="1" role="dialog">'+
						'<span class="title">'+jQuery('h1').text()+'</span>'+
						'<span class="navigation">'+
						'<button class="prev" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 12l18-12v24z"/></svg></button>'+
						'<button class="play" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z"></path></svg></button>'+
						'<span class="bar-line"><svg height="50" width="50"><circle stroke="#ccc" fill="transparent" stroke-width="2" r="23" cx="25" cy="25"></circle><circle class="progress-circle" stroke="white" fill="transparent" stroke-width="2" stroke-dasharray="145 145" r="23" cx="19" cy="25" transform="rotate(-90, 22, 22)"></circle></svg></span>'+
						'<button class="stop"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12.371 14"><defs><style>.a{fill:none;stroke:#FFF;stroke-linecap:round;stroke-width:2px;}</style></defs><g transform="translate(1 1)"><line class="a" y2="12"/><line class="a" y2="12" transform="translate(10.371)"/></g></svg></button>'+
						'<button class="next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z"/></svg></button>'+
						'</span>'+
						'<span class="control">'+
						'<span class="name">Speed of reading:</span> <span id="text-speed">1x</span>'+
							'<ul class="text-speed-list">'+
							'<li data-speed="0.5">0.5x</li>'+
							'<li data-speed="0.75">0.75x</li>'+
							'<li data-speed="1" class="active">1x</li>'+
							'<li data-speed="1.25">1.25x</li>'+
							'<li data-speed="1.5">1.5x</li>'+
							'<li data-speed="1.75">1.75x</li>'+
							'<li data-speed="2">2x</li>'+
						'</ul>'+
						'<button class="close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></button>'+
						'</span>'+
						'</div>');
						audioElement.play();
						var speedttext = jQuery('.text-speed-list li.active').attr('data-speed');
						audioElement.playbackRate = speedttext;
					}	
					if(procent){
						jQuery('.audioplayer .bar-line svg .progress-circle').css('stroke-dashoffset', procent);
					}		
				}
				xhr.send(params);
			}
		}
	}

	// Explanations functionalities..
	
	numbWords = Object.keys(explanation_words).length;
	expCheckx = '<span class = "highlight-checkbox modal-window hidden"><p style="padding-left: 30px;"><label><input type="checkbox" style="position: absolute;left: 22px;top: 25px;">Enable explanations, we found</label></p><p style="font-weight: bold; margin-left:25px">Found Words: '+numbWords+'</p></span>';
	jQuery('.highlight-btn').append(expCheckx);
	jQuery('.highlight-btn').click(function(){	
		if(jQuery('.highlight-checkbox.modal-window.hidden').hasClass('hidden')){
			jQuery('.highlight-checkbox.modal-window.hidden').removeClass('hidden');
		}
		else{	
			jQuery('.highlight-checkbox.modal-window').addClass('hidden');
		}
	});

	jQuery('.highlight-checkbox').change(function(){
		if(jQuery('.found-in-explanation--inner').attr('role')=='button'){
			jQuery('.found-in-explanation--inner').removeAttr('role').removeAttr('style').removeClass('highlighted');
		}
		else{
			jQuery('.found-in-explanation--inner').attr('role','button').addClass('highlighted');
			jQuery(document).on('click', '.highlighted', function(element){
				var viewPortPosition = this.getBoundingClientRect().top;
				if(jQuery('.explanation-modal').length){
					jQuery('.explanation-modal').remove();
				}
				if(viewPortPosition<150){
                    var innerTxt = element.target.innerText
                    var innerTxt_t = innerTxt.toLowerCase();		
					var description = explanation_words[innerTxt_t];
					var modal = '<span class ="explanation-modal modal-window"><span class ="explanation-word">'+innerTxt+'</span><span class ="explanation-desc">'+description+'</span></span>';
					jQuery(this.parentElement).append(modal); 
				}
				else{
					var innerTxt = element.target.innerText
                    var innerTxt_t = innerTxt.toLowerCase();			
					var description = explanation_words[innerTxt_t];
					var modal = '<span class ="explanation-modal modal-window-above"><span class ="explanation-word">'+innerTxt+'</span><span class ="explanation-desc">'+description+'</span></span>';
					jQuery(this.parentElement).append(modal); 
				}
			});
		}			
	});
	jQuery(document).click(function(e){
		if(!(jQuery(e.target).hasClass('highlighted'))&& jQuery('.explanation-modal').length){
			jQuery('.explanation-modal').remove();
		}
	})
	




});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


