/**
 * http://usejsdoc.org/
 */
var conversationElement = document.getElementById("conversation");
var conversation_bodyElement = document.getElementById("conversation_body");
var drags = new function() {
    $drags = $("#draggable");
    var red = $drags.height()*(45/100);
    this.resize = function() {
        $(".chat-head").css({
            "width": $drags.width() + "px"
        });
        $(".chat-input").css({
            "width": $drags.width() * 4 / 5 + "px"
        });
        $(".chat-input-area").css({
            "top": $drags.position().top + $drags.height() - 50 + "px"
        });
        $(".thumbs-group").css({
            "top": $drags.position().top + $drags.height() / 2.5 + "px",
            "left": $drags.position().left + $drags.width() - 50 + "px",
            "right": "none"
        });
        //$("#conversation").height($("#draggable").height() - 150 + "px");
        $(".chat-input").focus();
    };
    this.drags = function() {
        $drags.draggable({
        	start: function() {
        		$(".max-mize").click();
            },
            drag: function() {
                /*$(".chat-head").css({
                    "width": $drags.width() + "px"
                });
                $(".chat-input").css({
                    "width": $drags.width() * 4 / 5 + "px"
                });*/
                $(".chat-input-area").css({
                    "top": $drags.position().top + $drags.height() - 50 + "px"
                });
                $(".thumbs-group").css({
                    "top": $drags.position().top + $drags.height() / 2.5 + "px",
                    "left": $drags.position().left + $drags.width() - 50 + "px",
                    "right": "none"
                });
                //$("#conversation").height($("#draggable").height() - 150 + "px");
                $(".chat-input").focus();
            }
        });
    };
    this.inputAdjust = function () {
    	$(".chat-input").css({
            "width": $drags.width() * 4 / 5 + "px"
        });
    	$(".chat-input").focus();
    };
    $("#conversation").height($drags.height()-red);
};

//drags();
/*	function openDialog() {
		var windowWidthVal = 550;
		var fullHeight = window.top.frames['top'].innerHeight;
		var fullWidth = window.top.frames['top'].innerWidth;
		var leftPos = 760;
		if(fullWidth > 550){
			if(Math.round(fullWidth/2) < 550  ){
				leftPos = fullWidth - (550 +30);
			}else{
				leftPos = Math.round(fullWidth/2) - 550/2;

			}
			//document.getElementById("bot").style.display = "block";
		    //document.getElementById("bot").style.position = "absolute";
			//document.getElementById("conversation_wait").style.width = "550px";
			//document.getElementById("conversation_wait").style.height= "350px";

		}else if(fullWidth <= 550){
			windowWidthVal = fullWidth;
			//document.getElementById("bot").style.display = "block";
			//document.getElementById("bot").style.position = "absolute";
			//document.getElementById("conversation_wait").style.width = (fullWidth-20)+"px";
			//document.getElementById("conversation_wait").style.height= "350px";


		}else{
			//document.getElementById("bot").style = "position:absolute; display: block;  ";
			//document.getElementById("conversation_wait").style.width = "550px";
			//document.getElementById("conversation_wait").style.height= "350px";

		}
		//document.getElementById("userInputTyped").style.width = (windowWidthVal - 105) +"px";

		//document.getElementById("bot").style.zIndex  = "1";
		document.getElementById('userInputTyped').select();
	}

	function closeDialog() {
		//document.getElementById("bot").style.display="none";
		document.getElementById("conversation_wait").style.display="none";
	}
	*/
function createRequestObject() {
    var tmpXmlHttpObject;

    //depending on what the browser supports, use the right way to create the XMLHttpRequest object
    if (window.XMLHttpRequest) {
        // Mozilla, Safari would use this method ...
        tmpXmlHttpObject = new XMLHttpRequest();

    } else if (window.ActiveXObject) {
        // IE would use this method ...
        tmpXmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return tmpXmlHttpObject;
}

//call the above function to create the XMLHttpRequest object
var http = createRequestObject();

function requestConversation2(userInput) {
connect2();
}

function converseTyped2() {
    //changeDateFormat();
	//$("#checksbutton").click();
    var final_span = document.getElementById('final_span');
    if (document.getElementById('userInputTyped').value != "") {
        $("#checksbutton").click();
        //requestConversation(document.getElementById('userInputTyped').value);
        var userinput=$("#userInputTyped").val();
        var data = JSON.stringify({'name': $("#userInputTyped").val()})
        ws.send(data);
        document.getElementById('userInputTyped').value = "";
        document.getElementById('userInputTyped').select();
        $("#conversation").append("<div class='direct-chat-msg right'><img class='direct-chat-img' src='images/user.png' alt=" +
        		"user' /><div class='direct-chat-text'>" +      userinput + "</div></div>");

    } else if (final_span.innerHTML != "") {
        requestConversation(final_span.innerHTML);
        final_span.innerHTML = "";
    }
    return false;
}

var autocompleteitems = [];
function onloadAutoComplete () {
	$.get('AutoComplete', {
	}, function(responseText) {
		//console.log(responseText);
		var ods = responseText.split('},{');
		$.each(ods, function (i, items) {
			autocompleteitems.push(items.replace(/"question":/g, "").replace(/{|}|"/g, ""));
		});
        $( "#userInputTyped" ).autocomplete({
            source: autocompleteitems,
            open : function(){
            	var r = $("#draggable").position().top-200;
              	$(".ui-autocomplete").position({
            	    my: "left bottom",
            	    at: "left top",
            	    of: $("#userInputTyped"),
            	    collision: "flip flip"
            	});

                //$(".ui-autocomplete:visible").css({top:"-=108"});
            }
        });
	});

}

function autoComplete() {
	//alert(autocompleteitems);
}

function processResponse() {

    //check if the response has been received from the server
    if (http.readyState == 4) {

        //read and assign the response from the server
        var response = http.responseText;

        //do additional parsing of the response, if needed

        //in this case simply assign the response to the contents of the <div> on the page.
        //alert("response = "+response);
        if (response.indexOf("!#GET_USER_ID#!") > -1) {
            requestConversation("#hide#" + userID);
            return;
        }
        displayConversation('resp', response);
    }
}


function displayConversation(reqResp, showText) {
	showText = showText.trim();
    if (reqResp == 'req' && showText.indexOf("#hide#") == -1) {
        document.getElementById("conversation_wait").style.display = "block";
        conversationElement.innerHTML += "<div class='direct-chat-msg right'><img class='direct-chat-img' src='images/user.png' alt='User'  /><div class='direct-chat-text'>" +
            showText + "</div></div>";
    } else if (reqResp == 'resp') {
    	var showText1 = "";
    	if(showText.indexOf(',true')>0){
    		$('.thumbs-group').show();
    		showText1 = showText.slice(0, -5);
    	}else{
    		if(showText.indexOf(',false')>0){
    			showText1 = showText.slice(0, -6);
    		}else if(showText.indexOf(',null')>0){
    			showText1 = showText.slice(0, -5);
    		}else{
    			showText1 = showText;
    		}
    		$('.thumbs-group').hide();
    	}
        conversationElement.innerHTML += "<div class='message new'><div class='avatar'><img src='images/MaleBuddy.png' width='36' height='36' alt='Accenture Buddy' /></div><div class='replies'>" +
            showText1 + "</div></div>";
        document.getElementById("conversation_wait").style.display = "none";
    }

    // scroll to the bottom
    //conversation_bodyElement.scrollTop = conversation_bodyElement.scrollHeight;

    //$( "#draggable" ).scrollTop(300);
    $("#conversation").scrollTop($("#conversation")[0].scrollHeight);
    $("#draggable").resizable({
        maxWidth: 450,
        minWidth: 320,
        resize: function(e, ui) {
            drags.resize();
        }

    });
    drags.drags();
}







function openMe(openURL) {
    window.open(openURL, "", "width=1000,height=700");
}

document.getElementById("userInputTyped").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("sendText").click();
        }
    });


function validateUser() {
	truefalse();
    return false;
}

function truefalse(){
    var uname = document.forms["myForm"]["fname"].value;
    var upassword = document.forms["myForm"]["upwd"].value;
    $.get('Login', { 'userName':uname, 'password': upassword
	}).done(function(responseText) {
		 if (responseText == 'password matchespassword matches') {
		        $(".error").hide();
		        location.href="nbn-home.jsp"
		    } else {
		        $(".error").show();
		        return false;
		    }
	});

}
