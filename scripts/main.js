$(function() {
	$( document ).tooltip();
    $('#clsBtn').off().on('click', function(e) {
        e.preventDefault();
        $("#conversation").html('');
        $("#conversation").removeAttr('style');
        $(".chat-bind-section").show();
        $("#draggable").removeClass('hide-chat');
        $(".new:not(:eq(0))").hide();
        $('.chat-head, #draggable').removeClass('fullMax');
        $('#draggable').removeClass('fullMax1');
        $("#draggable, .chat-input-area, .thumbs-group, .chat-head, #userInputTyped, #conversation").hide().removeAttr('style');
        $('.chat-open').show();
    });
    $('.chat-open').off().on('click', function(e) {
        e.preventDefault();
        $("#conversation").click();
        $("#draggable").show();
        $('.max-mize').click();
        $('.new-max').removeClass('max-mize').attr('title', 'Maximize');
        drags.inputAdjust();
        $(".mini-mize").show();
        $(".maxi-mize1").hide();
        $(this).hide();
    });
    $('.mini-mize').off().on('click', function(e) {
        e.preventDefault();
        $('.chat-head, #draggable').removeClass('fullMax');
        $('#draggable').removeClass('fullMax1');
        $(".chat-input-area, .chat-input, .chat-head, #conversation").removeAttr('style');
        $('.new-max').removeClass('max-mize').attr('title', 'Maximize');
        $("#draggable").removeAttr('style').addClass('hide-chat').show();
        $(".chat-bind-section").hide();
        $(".mini-mize").hide();
        $(".maxi-mize1").show();
        drags.inputAdjust();
    });
    
    $(".maxi-mize1").off().on('click', function(e) {
    	e.preventDefault();
    	$('.new-max').removeClass('max-mize').attr('title', 'Restore');
        $('.chat-head, #draggable').removeClass('fullMax');
    	$('#draggable').removeClass('fullMax1');
    	$("#conversation").removeAttr('style');
        $(".chat-bind-section").show();
        $("#draggable").removeClass('hide-chat');
        $(".mini-mize").show();
        $(".maxi-mize1").hide();
        drags.inputAdjust();
    });
    $('.new-max').off().on('click', function(e) {
        e.preventDefault();
        $("#conversation").click();
        if($('.new-max').hasClass('max-mize')) {
	        $('.new-max').removeClass('max-mize').attr('title', 'Maximize');
	        $('.chat-head, #draggable').removeClass('fullMax');
        	$('#draggable').removeClass('fullMax1');
        	$("#conversation").removeAttr('style');
	        $(".chat-bind-section").show();
	        $("#draggable").removeClass('hide-chat');
	        drags.inputAdjust();
        }else{
        	$('.chat-head, #draggable').addClass('fullMax');
        	$('#draggable').addClass('fullMax1');
        	$('.new-max').addClass('max-mize').attr('title', 'Restore');
        	$(".chat-bind-section").show();
        	$("#conversation").height($('#draggable').height()-100);
            $(".mini-mize").show();
            $(".maxi-mize1").hide();
        	drags.inputAdjust();
        }
        drags.inputAdjust();
        /*
        $("#draggable").removeClass('hide-chat');
        $(".chat-input-area").show();*/
    });

    $(".thumbs-up, .thumbs-down").off().on('click', function(e) {
        e.preventDefault();
        //alert('Thanks for your feedback');
        $("#conversation").append('<p class="feedback-text">Thanks for your feedback</p>');
        $("#draggable").scrollTop($("#draggable")[0].scrollHeight);
        $(".feedback-text").fadeOut(4000);
        $('.thumbs-group').hide();
        //$("#draggable").hide().removeAttr('style');
        //setTimeout($(".feedback-text").hide(), 60000*30000000);
    });

    $(".thumbs-group").mouseover(function() {

        $('.thumbs-group a').css({
            'opacity': 100
        });

    }).mouseout(function() {

        $('.thumbs-group a').css({
            'opacity': 0.2
        });

    });

});