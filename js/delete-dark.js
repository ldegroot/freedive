/**
 * Dark Template by Jeremy Rue at the UC Berkeley Graduate School of Journalism.
 *
 * Copyright (c) 2013 The Regents of the University of California
 * Released under the GPL Version 2 license
 * http://www.opensource.org/licenses/gpl-2.0.php
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
//easing function for smooth scrolling
jQuery.extend(jQuery.easing, 
  {
    easeInOutCubic: function(e, f, a, h, g) {
      if ((f /= g / 2) < 1) {
        return h / 2 * f * f * f + a;
      }
      return h / 2 * ((f -= 2) * f * f + 2) + a;
    }
  });

  $(document).ready(function($){
    
    var timer, 
        panel, 
        selected = [], 
        breakpoints = [];
        
    /**
     * Switch the currently selected nav element
     *
     * @param {to} Number - The index of which panel is currently selected
     */
    function switchClasses(to){
      to = Number(to);
      if(panel != to){
        panel = to;
        $('nav li').removeClass('selected');
        selected[to].addClass('selected');
				resetBreakPoints();
      }
    }

    /**
     * Will reset the breakpoints of each article tag. Call when window is resized
     *
     */
    function resetBreakPoints(){
      breakpoints = [];
      breakpoints.push($('#home').offset().top);
      $('article').each(function(i){
        breakpoints.push($(this).offset().top);
      });
    }
        
    /**
     * Capture navigation links and animate scrolling to that section.
     *
     */
    $('body > nav li a').on('click', function(event){
      if($(this).attr('href').substr(0, 4) != 'http'){
        event.preventDefault() ? event.preventDefault() : event.returnValue = false;
        $('html, body').stop().animate(
          {
            scrollTop: $( $(this).attr('href') ).offset().top + 1 //Plus 1 px
          }, 700, 'easeInOutCubic');
        if($(window).width() < 720){$('nav ul').slideUp();}
      }
    });
    
    /**
     * Update selected nav link as window scrolls.
     *
     */
    $(window).on('scroll', function(){
      if($(window).scrollTop() > breakpoints[breakpoints.length - 1]){
        switchClasses(breakpoints.length - 1);
      } else {
        for(var i=0; i < breakpoints.length; i++)
        {
          if($(window).scrollTop() > breakpoints[i] && $(window).scrollTop() < breakpoints[i+1]){
            switchClasses(i);
          }
        }
      }
    });
    
    /**
     * When viewing smartphone version, show menu button and toggle when clicked
     *
     */
    $('#smartphone_menu').on('click',function(){
      if($('nav ul').is(':hidden')){
        $('nav ul').slideDown();
      } else {
        $('nav ul').slideUp();
      }
    });
    
    
    //set each section to the window's height, even on resize
    $('body > header, body > article').css('min-height', $(window).height());
    $('nav ul li').eq(0).addClass('selected');
    $('body > header hgroup').css({'top':($(window).height()/2)-($('body > header hgroup').height()/2)});
    $(window).on('resize', function(){
      timer && clearTimeout(timer);
      timer = setTimeout(resetBreakPoints, 100);
      $('body > header, body > article').css('min-height', $(window).height());
      $('body > header hgroup').css({'top':($(window).height()/2)-($('body > header hgroup').height()/2)});
      if($(window).width() > 720){ $('nav ul').removeAttr('style');}
    });
    
    /**
     * Setup breakpoints variables for each article tag
     *
     */
    breakpoints.push($('#home').offset().top);
    selected.push($('nav li a[href="#home"]').parent());
    $('article').each(function(i){
      breakpoints.push($(this).offset().top);
      selected.push($('nav li a[href="#' + $(this).attr('id') +'"]').parent());
    });
    
  });