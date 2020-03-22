
(function($){jQuery.fn.wpslider=function(settings){var me=this;settings=jQuery.extend({g_nTransitStyle:6,g_nLoopTime:2000,g_nAnimationTime:500,g_nStartPanel:0,g_bPlayAtStart:false,g_bPlayAfterPress:false,g_bHandleMouseWheel:true,g_bHandleMouseSweep:true,g_nLoopAround:0,g_nAccdnBtnWidth:40,g_nAccdnAction:1,g_nCols:2,g_nRows:2,g_nOverlaySlidePos:0,g_nOverlaySlideMargin:60,g_nOverlayFadeLeft:0,g_nOverlayFadeTop:0,g_nDivId:null,g_strEasing:'swing'},settings);me.settings=settings;var eTransitStyle={Basic:0,RightToLeft:1,LeftToRight:2,OpaqueFade:3,TopToBottom:4,BottomToTop:5,Medley:6,AccordionHoriz:7,AccordionVert:8,OverlaySlide:9,OverlayFade:10,Scroller:11,Timed:12};var eOverlayPosition={Bottom:0,Top:1,Left:2,Right:3};var eAccordionAction={None:0,Click:1,MouseOver:2};var eLoopAround={Everything:0,PlayOnly:1,PrevNextOnly:2,Nothing:3};var $mainDiv=$(settings.g_nDivId);var g_nDivWidth=$mainDiv.width();var g_nDivHeight=$mainDiv.height();var g_nCurrentDiv=0;var g_nPreviousDiv=0;var g_bPlaying=false;var g_bPrevious=false;var g_bChangingSlide=false;var g_navCallbackArray=[];var g_nNumOfNavCallbacks=0;var g_playCallbackArray=[];var g_nNumOfPlayCallbacks=0;var g_nNumOfDivs=0;var g_nIncrement=-1;var g_bMedley=false;var g_nMinLoopTime=0;var g_timer=null;var g_bMouseWheelOver=false;var g_navButtonNameArray=[];var g_bOverlayIn=false;var g_bOverlayOut=false;var g_nNumDivsHidden=0;function stopTimer(){if(g_bPlaying){var i;g_bPlaying=false;clearInterval(g_timer);for(i=0;i<g_nNumOfPlayCallbacks;++i){g_playCallbackArray[i](g_bPlaying);}}}function allowLoopAround(bPlay,bPrevious){if((g_nNumOfDivs-g_nNumDivsHidden)<2)return false;if(settings.g_nLoopAround===eLoopAround.Nothing)return(bPrevious?g_nCurrentDiv>0:g_nCurrentDiv<(g_nNumOfDivs-1));else if(bPlay&&settings.g_nLoopAround===eLoopAround.PrevNextOnly)return(g_nCurrentDiv<(g_nNumOfDivs-1));else if(!bPlay&&settings.g_nLoopAround===eLoopAround.PlayOnly)return(bPrevious?g_nCurrentDiv>0:g_nCurrentDiv<(g_nNumOfDivs-1));return true;}function hidePanels(activeId){for(var i=0;i<g_nNumOfDivs;++i){var $div=$mainDiv.children("div").eq(i);if($div.attr('id')!==activeId)$div.css({display:'none',visibility:'hidden',left:0,opacity:1.0});}}function animateVertSlide(nStartPos,nEndPos,$nextDiv,$activeDiv){$nextDiv.css({top:nStartPos,display:'inline',visibility:'inherit',opacity:1.0});$nextDiv.animate({top:0},settings.g_nAnimationTime,settings.g_strEasing);$activeDiv.animate({top:nEndPos},settings.g_nAnimationTime,settings.g_strEasing,function(){hidePanels($nextDiv.attr('id'));$activeDiv.css({top:0});});}function animateHorizSlide(nStartPos,nEndPos,$nextDiv,$activeDiv){$nextDiv.css({left:nStartPos,display:'inline',visibility:'inherit',opacity:1.0});$nextDiv.animate({left:0},settings.g_nAnimationTime,settings.g_strEasing);$activeDiv.animate({left:nEndPos},settings.g_nAnimationTime,settings.g_strEasing,function(){hidePanels($nextDiv.attr('id'));$activeDiv.css({left:0});});}function switchSlide(nNextSlide){if(nNextSlide===g_nCurrentDiv){return;}g_bChangingSlide=true;var nAnimationTime=0;var $activeDiv=$mainDiv.children("div").eq(g_nCurrentDiv);var i=0;while($activeDiv.data('hide')===true&&i<g_nNumOfDivs){if(nNextSlide>g_nIncrement){if(nNextSlide>g_nPreviousDiv)g_nCurrentDiv=nNextSlide+1;else
g_nCurrentDiv=nNextSlide-1;}else
{if(g_bPrevious)g_nCurrentDiv--;else
g_nCurrentDiv++;}if(g_nCurrentDiv<0)g_nCurrentDiv=g_nNumOfDivs-1;else if(g_nCurrentDiv>=g_nNumOfDivs)g_nCurrentDiv=0;$activeDiv=$mainDiv.children("div").eq(g_nCurrentDiv);}if(nNextSlide>g_nIncrement){g_bPrevious=(nNextSlide<g_nCurrentDiv);g_nPreviousDiv=g_nCurrentDiv;g_nCurrentDiv=nNextSlide;}else
{if(g_bPrevious){g_nPreviousDiv=g_nCurrentDiv--;if(g_nCurrentDiv<0){g_nCurrentDiv=g_nNumOfDivs-1;}}else
{g_nPreviousDiv=g_nCurrentDiv++;if(g_nCurrentDiv>=g_nNumOfDivs){g_nCurrentDiv=0;}}}var $nextDiv=$mainDiv.children("div").eq(g_nCurrentDiv);i=0;while($nextDiv.data('hide')===true&&i<g_nNumOfDivs){if(nNextSlide>g_nIncrement){if(nNextSlide>g_nPreviousDiv)g_nCurrentDiv=nNextSlide+1;else
g_nCurrentDiv=nNextSlide-1;}else
{if(g_bPrevious)g_nCurrentDiv--;else
g_nCurrentDiv++;}if(g_nCurrentDiv<0)g_nCurrentDiv=g_nNumOfDivs-1;else if(g_nCurrentDiv>=g_nNumOfDivs)g_nCurrentDiv=0;$nextDiv=$mainDiv.children("div").eq(g_nCurrentDiv);if($activeDiv.get(0)!==$nextDiv.get(0))$nextDiv.css({display:'none',visibility:'hidden'});i++;}if($activeDiv.get(0)===$nextDiv.get(0))return;$('#'+g_navButtonNameArray[g_nPreviousDiv]).children().each(function(){$(this).removeClass('Down');});$('#'+g_navButtonNameArray[g_nCurrentDiv]).children().each(function(){$(this).addClass('Down');});if(g_bMedley){++settings.g_nTransitStyle;if(settings.g_nTransitStyle>=eTransitStyle.Medley){$activeDiv.css({display:'inline',visibility:'inherit'});settings.g_nTransitStyle=eTransitStyle.RightToLeft;}}var nTopPos,nLeftPos,nStartPos,nEndPos,nOffset,j,$childDiv;switch(settings.g_nTransitStyle){case eTransitStyle.Basic:$nextDiv.css({display:'inline',visibility:'inherit'});$activeDiv.css({display:'none',visibility:'hidden'});nAnimationTime=10;break;case eTransitStyle.OpaqueFade:$activeDiv.animate({opacity:0.0},settings.g_nAnimationTime,settings.g_strEasing);$nextDiv.css({opacity:0.0,display:'inline',visibility:'inherit'});$nextDiv.animate({opacity:1.0},settings.g_nAnimationTime,settings.g_strEasing,function(){$activeDiv.css({opacity:1.0,display:'none',visibility:'hidden'});});nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.RightToLeft:if(g_bMedley){g_bPrevious=false;}nStartPos=g_bPrevious?-g_nDivWidth:g_nDivWidth;nEndPos=g_bPrevious?g_nDivWidth:-g_nDivWidth;animateHorizSlide(nStartPos,nEndPos,$nextDiv,$activeDiv);nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.LeftToRight:if(g_bMedley){g_bPrevious=false;}nStartPos=g_bPrevious?g_nDivWidth:-g_nDivWidth;nEndPos=g_bPrevious?-g_nDivWidth:g_nDivWidth;animateHorizSlide(nStartPos,nEndPos,$nextDiv,$activeDiv);nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.TopToBottom:if(g_bMedley){g_bPrevious=false;}nStartPos=g_bPrevious?g_nDivHeight:-g_nDivHeight;nEndPos=g_bPrevious?-g_nDivHeight:g_nDivHeight;animateVertSlide(nStartPos,nEndPos,$nextDiv,$activeDiv);nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.BottomToTop:if(g_bMedley){g_bPrevious=false;}nStartPos=g_bPrevious?-g_nDivHeight:g_nDivHeight;nEndPos=g_bPrevious?g_nDivHeight:-g_nDivHeight;animateVertSlide(nStartPos,nEndPos,$nextDiv,$activeDiv);nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.AccordionHoriz:if(g_nCurrentDiv>g_nPreviousDiv){var n=g_nPreviousDiv+1;for(i=g_nPreviousDiv+1;i<=g_nCurrentDiv;++i){$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr("data-hide")!=="true"){$childDiv.animate({'left':(n*settings.g_nAccdnBtnWidth)},settings.g_nAnimationTime,settings.g_strEasing);n++;}}}else if(g_nCurrentDiv<g_nPreviousDiv){nOffset=(g_nDivWidth-((g_nNumOfDivs-g_nNumDivsHidden)*settings.g_nAccdnBtnWidth));var n=g_nCurrentDiv+1;for(i=g_nCurrentDiv+1;i<=g_nPreviousDiv;++i){$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr("data-hide")!=="true"){nLeftPos=(n===0)?0:(n*settings.g_nAccdnBtnWidth)+nOffset;$childDiv.animate({'left':nLeftPos},settings.g_nAnimationTime,settings.g_strEasing);n++;}}}nAnimationTime=settings.g_nAnimationTime;break;case eTransitStyle.AccordionVert:if(g_nCurrentDiv>g_nPreviousDiv){var n=g_nPreviousDiv+1;for(i=g_nPreviousDiv+1;i<=g_nCurrentDiv;++i){$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr('data-hide')!=="true"){$childDiv.animate({'top':(n*settings.g_nAccdnBtnWidth)},settings.g_nAnimationTime,settings.g_strEasing);n++;}}}else if(g_nCurrentDiv<g_nPreviousDiv){nOffset=(g_nDivHeight-((g_nNumOfDivs-g_nNumDivsHidden)*settings.g_nAccdnBtnWidth));var n=g_nCurrentDiv+1;for(i=g_nCurrentDiv+1;i<=g_nPreviousDiv;++i){$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr('data-hide')!=="true"){nTopPos=(n===0)?0:(n*settings.g_nAccdnBtnWidth)+nOffset;$childDiv.animate({'top':nTopPos},settings.g_nAnimationTime,settings.g_strEasing);n++;}}}nAnimationTime=200;break;case eTransitStyle.Scroller:var nRowOffset=(Math.floor(g_nCurrentDiv/settings.g_nCols))*-1;var nColOffset=(g_nCurrentDiv%settings.g_nCols)*-1;var nDivCount=0;nTopPos=0;nLeftPos=0;for(i=0;i<settings.g_nRows;++i){nTopPos=(nRowOffset+i)*g_nDivHeight;for(j=0;j<settings.g_nCols;++j){nLeftPos=(nColOffset+j)*g_nDivWidth;var $currentDiv=$mainDiv.children("div").eq(nDivCount);$currentDiv.animate({'top':nTopPos,'left':nLeftPos},settings.g_nAnimationTime,settings.g_strEasing);++nDivCount;}}nAnimationTime=settings.g_nAnimationTime;break;}setTimeout(function(){g_bChangingSlide=false;},nAnimationTime);for(i=0;i<g_nNumOfNavCallbacks;++i){g_navCallbackArray[i](g_nCurrentDiv);}g_bPrevious=false;}function startTimer(){if(!g_bPlaying&&allowLoopAround(true,false)){var i;g_bPlaying=true;for(i=0;i<g_nNumOfPlayCallbacks;++i){g_playCallbackArray[i](g_bPlaying);}g_timer=setInterval(function(){if(allowLoopAround(true,false)){switchSlide(g_nIncrement);}else{stopTimer();}},settings.g_nLoopTime);}}function handleMouseWheel(nDelta){var bPlaying=g_bPlaying;stopTimer();if(!g_bChangingSlide){if(nDelta<0){if(allowLoopAround(false,true)){g_bPrevious=true;switchSlide(g_nIncrement);g_bPrevious=false;}}else
{if(allowLoopAround(false,false)){switchSlide(g_nIncrement);}}}if(bPlaying&&settings.g_bPlayAfterPress){startTimer();}}function mouseWheel(event){if(!g_bMouseWheelOver){return;}var nDelta=0;if(!event){event=window.event;}if(event.wheelDelta){nDelta=event.wheelDelta/120;}else if(event.detail){nDelta=-event.detail/3;}if(nDelta){handleMouseWheel(nDelta);}if(event.preventDefault){event.preventDefault();}event.returnValue=false;}function initMouseWheel(){if(settings.g_bHandleMouseWheel){$mainDiv.hover(function(){g_bMouseWheelOver=true;},function(){g_bMouseWheelOver=false;});if(window.addEventListener){window.addEventListener('DOMMouseScroll',mouseWheel,false);window.addEventListener('mousewheel',mouseWheel,false);}else if(document.attachEvent){document.attachEvent("onmousewheel",mouseWheel);}}}function initDefault(){if(settings.g_nTransitStyle===eTransitStyle.Medley){settings.g_nTransitStyle=eTransitStyle.RightToLeft;g_bMedley=true;}if(settings.g_nStartPanel>0&&settings.g_nStartPanel<g_nNumOfDivs){g_nCurrentDiv=g_nPreviousDiv=settings.g_nStartPanel;var $firstDiv=$mainDiv.children("div").eq(0);var $startDiv=$mainDiv.children("div").eq(g_nCurrentDiv);$startDiv.css({display:'inline',visibility:'inherit'});$firstDiv.css({display:'none',visibility:'hidden'});}initMouseWheel();}function initAccordion(bHoriz){var i,nLeftPos,nDiv,nXOffset,$childDiv;var nOffset=bHoriz?(g_nDivWidth-((g_nNumOfDivs-g_nNumDivsHidden)*settings.g_nAccdnBtnWidth)):(g_nDivHeight-((g_nNumOfDivs-g_nNumDivsHidden)*settings.g_nAccdnBtnWidth));var $firstDiv=$mainDiv.children("div").eq(0);$firstDiv.css({'left':0,'top':0,display:'inline','visibility':'inherit'});var bStaggeredStart=false;if(settings.g_nStartPanel>0&&settings.g_nStartPanel<g_nNumOfDivs){g_nCurrentDiv=g_nPreviousDiv=settings.g_nStartPanel;bStaggeredStart=true;}if(bHoriz){var n=1;for(i=1;i<g_nNumOfDivs;++i){if(bStaggeredStart&&i>g_nCurrentDiv){bStaggeredStart=false;}$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr("data-hide")!=="true"){nLeftPos=(n*settings.g_nAccdnBtnWidth)+(bStaggeredStart?0:nOffset);$childDiv.css({'left':nLeftPos,display:'inline','visibility':'inherit'});n++;}}for(i=0;i<g_nNumOfDivs;++i){$childDiv=$mainDiv.children("div").eq(i);$childDiv.attr('currentDiv',i);if(settings.g_nAccdnAction===eAccordionAction.Click){$childDiv.click(function(e){var xPos=$(this).offset().left-$(window).scrollLeft();var nXOffset=e.clientX-xPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();var nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}});}else if(settings.g_nAccdnAction===eAccordionAction.MouseOver){$childDiv.mouseover(function(e){var xPos=$(this).offset().left-$(window).scrollLeft();var nXOffset=e.clientX-xPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();var nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}});}}}else
{var n=1;for(i=1;i<g_nNumOfDivs;++i){if(bStaggeredStart&&i>g_nCurrentDiv){bStaggeredStart=false;}$childDiv=$mainDiv.children("div").eq(i);if($childDiv.attr("data-hide")!=="true"){var nTopPos=(n*settings.g_nAccdnBtnWidth)+(bStaggeredStart?0:nOffset);$childDiv.css({'top':nTopPos,display:'inline','visibility':'inherit'});n++;}}var funcClickV=function(e){var yPos=$(this).offset().top-$(window).scrollTop();var nXOffset=e.clientY-yPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}};var funcOverV=function(e){var yPos=$(this).offset().top-$(window).scrollTop();var nXOffset=e.clientY-yPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}};for(i=0;i<g_nNumOfDivs;++i){$childDiv=$mainDiv.children("div").eq(i);$childDiv.attr('currentDiv',i);if(settings.g_nAccdnAction===eAccordionAction.Click){$childDiv.click(function(e){var yPos=$(this).offset().top-$(window).scrollTop();var nXOffset=e.clientY-yPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}});}else if(settings.g_nAccdnAction===eAccordionAction.MouseOver){$childDiv.mouseover(function(e){var yPos=$(this).offset().top-$(window).scrollTop();var nXOffset=e.clientY-yPos;if(nXOffset<=settings.g_nAccdnBtnWidth){stopTimer();nDiv=parseInt($(this).attr('currentDiv'),10);switchSlide(nDiv);}});}}}initMouseWheel();}function initOverlaySlide(){var $overlayDiv=$mainDiv.children("div").eq(1);var nTopStartPos=0;var nTopEndPos=0;var nLeftStartPos=0;var nLeftEndPos=0;switch(settings.g_nOverlaySlidePos){case eOverlayPosition.Bottom:nTopStartPos=g_nDivHeight-settings.g_nOverlaySlideMargin;nTopEndPos=g_nDivHeight-$overlayDiv.height();break;case eOverlayPosition.Top:nTopStartPos=settings.g_nOverlaySlideMargin-$overlayDiv.height();nTopEndPos=0;break;case eOverlayPosition.Left:nLeftStartPos=settings.g_nOverlaySlideMargin-$overlayDiv.width();nLeftEndPos=0;break;case eOverlayPosition.Right:nLeftStartPos=g_nDivWidth-settings.g_nOverlaySlideMargin;nLeftEndPos=g_nDivWidth-$overlayDiv.width();break;}$overlayDiv.css({'left':nLeftStartPos,'top':nTopStartPos,display:'inline','visibility':'inherit'});$mainDiv.hover(function(){if(!g_bOverlayIn){g_bOverlayIn=true;$overlayDiv.animate({'left':nLeftEndPos,'top':nTopEndPos},settings.g_nAnimationTime,settings.g_strEasing,function(){g_bOverlayIn=false;});}},function(){if(!g_bOverlayOut){g_bOverlayOut=true;$overlayDiv.animate({'left':nLeftStartPos,'top':nTopStartPos},settings.g_nAnimationTime,settings.g_strEasing,function(){g_bOverlayOut=false;});}});}function initOverlayFade(){var $overlayDiv=$mainDiv.children("div").eq(1);$overlayDiv.css({'left':settings.g_nOverlayFadeLeft,'top':settings.g_nOverlayFadeTop,display:'inline','visibility':'inherit'});$overlayDiv.animate({'opacity':0.0},0);$mainDiv.hover(function(){if(!g_bOverlayIn){g_bOverlayIn=true;$overlayDiv.animate({'opacity':1.0},settings.g_nAnimationTime,settings.g_strEasing,function(){g_bOverlayIn=false;});}},function(){if(!g_bOverlayOut){g_bOverlayOut=true;$overlayDiv.animate({'opacity':0.0},settings.g_nAnimationTime,settings.g_strEasing,function(){g_bOverlayOut=false;});}});}function initTimed(){for(var i=0;i<g_nNumOfDivs;++i){var $childDiv=$mainDiv.children("div").eq(i);var currentDate=new Date();var startDate=new Date($childDiv.data('start'));var endDate=new Date($childDiv.data('end'));if(currentDate>=startDate&&currentDate<=endDate){if(i!==0){var $firstDiv=$mainDiv.children("div").eq(0);$firstDiv.css({display:'none','visibility':'hidden'});$childDiv.css({display:'inline','visibility':'inherit'});}break;}}settings.g_bPlayAtStart=false;}function initScroller(){if(g_nNumOfDivs!==(settings.g_nRows*settings.g_nCols)){settings.g_nRows=1;settings.g_nCols=g_nNumOfDivs;}var nDivCount=0;var nTopPos=0;var nLeftPos=0;var i,j;for(i=0;i<settings.g_nRows;++i){nTopPos=(i*g_nDivHeight);for(j=0;j<settings.g_nCols;++j){var $currentDiv=$mainDiv.children("div").eq(nDivCount);nLeftPos=(j*g_nDivWidth);$currentDiv.css({'top':nTopPos,'left':nLeftPos,display:'inline','visibility':'inherit'});++nDivCount;}}initMouseWheel();}function initialise(){if(settings.g_nLoopTime<g_nMinLoopTime){settings.g_nLoopTime=g_nMinLoopTime;}g_nNumOfDivs=$mainDiv.children("div").size();if(settings.g_bHandleMouseSweep===true){switch(me.settings.g_nTransitStyle){case 0:case 1:case 3:case 6:case 7:case 9:case 10:case 11:$mainDiv.on('swipeleft',function(e){if(!g_bChangingSlide)me.next();}).on('swiperight',function(e){if(!g_bChangingSlide)me.previous();}).on('dragstart',function(e){e.preventDefault();});break;case 2:$mainDiv.on('swipeleft',function(e){if(!g_bChangingSlide)me.previous();}).on('swiperight',function(e){if(!g_bChangingSlide)me.next();}).on('dragstart',function(e){e.preventDefault();});break;case 4:case 8:$mainDiv.on('swipeup',function(e){if(!g_bChangingSlide)me.next();}).on('swipedown',function(e){if(!g_bChangingSlide)me.previous();}).on('dragstart',function(e){e.preventDefault();});break;case 5:$mainDiv.on('swipeup',function(e){if(!g_bChangingSlide)me.next();}).on('swipedown',function(e){if(!g_bChangingSlide)me.previous();}).on('dragstart',function(e){e.preventDefault();});break;}}switch(settings.g_nTransitStyle){case eTransitStyle.AccordionHoriz:initAccordion(true);break;case eTransitStyle.AccordionVert:initAccordion(false);break;case eTransitStyle.OverlaySlide:initOverlaySlide();break;case eTransitStyle.OverlayFade:initOverlayFade();break;case eTransitStyle.Scroller:initScroller();break;case eTransitStyle.Timed:initTimed();break;default:initDefault();break;}if(settings.g_bPlayAtStart){startTimer();}}initialise();me.restrictSlides=function(){var switchDiv=g_nCurrentDiv;for(var i=0;i<g_nNumOfDivs;++i){var $childDiv=$mainDiv.children("div").eq(i);var currentDate=new Date();var startDate=new Date($childDiv.data('start'));var endDate=new Date($childDiv.data('end'));if(startDate!==undefined&&endDate!==undefined){if(currentDate<startDate||currentDate>endDate||startDate>endDate){g_nNumDivsHidden++;$childDiv.attr('data-hide',"true");$childDiv.css({display:'none',visibility:'hidden'});$('#'+g_navButtonNameArray[i]).attr('disabled','disabled');$('#'+g_navButtonNameArray[i]).children().each(function(){$(this).attr('disabled','disabled');});$('#'+g_navButtonNameArray[i]).children().each(function(){$(this).addClass('Disabled');});if(switchDiv==i&&i<g_nNumOfDivs-1)switchDiv++;}}}if(switchDiv!=g_nCurrentDiv){g_nCurrentDiv=switchDiv;hidePanels(g_nCurrentDiv);if($mainDiv.children("div").eq(g_nCurrentDiv).attr('data-hide')!=="true")$mainDiv.children("div").eq(g_nCurrentDiv).css({top:0,display:'inline',visibility:'inherit',opacity:1.0});}for(i=0;i<g_nNumOfNavCallbacks;++i){g_navCallbackArray[i](g_nCurrentDiv);}if(settings.g_nTransitStyle===eTransitStyle.AccordionHoriz||settings.g_nTransitStyle===eTransitStyle.AccordionVert)initAccordion(settings.g_nTransitStyle===eTransitStyle.AccordionHoriz);};me.previous=function(){var bPlaying=g_bPlaying;stopTimer();if(!g_bChangingSlide&&allowLoopAround(false,true)){g_bPrevious=true;switchSlide(g_nIncrement);g_bPrevious=false;}if(bPlaying&&settings.g_bPlayAfterPress){startTimer();}};me.next=function(){var bPlaying=g_bPlaying;stopTimer();if(!g_bChangingSlide&&allowLoopAround(false,false)){switchSlide(g_nIncrement);}if(bPlaying&&settings.g_bPlayAfterPress){startTimer();}};me.play=function(){stopTimer();if(!g_bChangingSlide&&allowLoopAround(true,false)){switchSlide(g_nIncrement);}startTimer();};me.pause=function(){stopTimer();};me.isPlaying=function(){return g_bPlaying;};me.navigate=function(nSlide){var bPlaying=g_bPlaying;stopTimer();if(!g_bChangingSlide&&nSlide>-1&&nSlide<g_nNumOfDivs){switchSlide(nSlide);}if(bPlaying&&settings.g_bPlayAfterPress){startTimer();}};me.setButton=function(index,name){g_navButtonNameArray[index]=name;};me.navCallback=function(callback){if(typeof callback==="function"){g_navCallbackArray[g_nNumOfNavCallbacks++]=callback;}};me.playCallback=function(callback){if(typeof callback==="function"){g_playCallbackArray[g_nNumOfPlayCallbacks++]=callback;}};return me;};})(jQuery);