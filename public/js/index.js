var initFlag = false;
function fetchDataFromConversationService() {
  //alert("Enter 2");
  let list = document.getElementById("chatLog");
  const curElements = list.innerHTML;
  let question = "";
  let input = document.getElementById("btn-input");
  question = input.value;
  input.value = "";
  let currentdate = new Date();
  let qtntime = currentdate.getHours() + ":" + currentdate.getMinutes();
	//alert(initFlag);
  if(initFlag === true){
	  question = "Hi";
	  list.innerHTML = "";
  }else{
	  let content = curElements + '<div class="direct-chat-msg right"><img class="direct-chat-img" src="images/user.png" alt="Message User Image"><div class="direct-chat-text text-left">' + question + '</div><div class="direct-chat-info clearfix"><span class="direct-chat-timestamp pull-left">'+qtntime+'</span></div></div>';
	  list.innerHTML = content;
  }
  
  
   let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get-conversation-service?question="+encodeURIComponent(question), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
	//alert("1--"+xhttp.responseText);
    let response = JSON.parse(xhttp.responseText);
	//alert("2---"+JSON.stringify(response.answer));
	let anstime = currentdate.getHours() + ":" + currentdate.getMinutes();
	list.innerHTML = list.innerHTML + '<div class="direct-chat-msg"><img class="direct-chat-img" src="images/bot.png" alt="Message User Image"><div class="direct-chat-text text-left">'+decodeURIComponent(response.answer)+'</div><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left"></span><span class="direct-chat-timestamp pull-right">'+anstime+'</span></div></div>';
	initFlag = false;
};
function fetchDataFromDiscoveryService() {
  //alert("Enter 1");
  
  let askQtnText = document.getElementById("btn-input1");
 question = askQtnText.value;
  if(question.length>0){
   let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get-discovery-service?question="+encodeURIComponent(question), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
	let response = JSON.parse(xhttp.responseText);
	//alert("2---"+JSON.stringify(response.answer[0].Extract));
	setAnswerData(response);
   }else{
	    alert("Write your question");
	    const s2 = document.getElementById("ask-questions");
		s2.innerHTML = "";
	  
   }
};
function init(){
	//alert("Enter");
	initFlag = true;
	fetchDataFromConversationService();
};
function setAnswerData(data) {
  const s2 = document.getElementById("ask-questions");
  s2.innerHTML = "";
  for (let j = 0; j < data.answer.length; j++) {
	   s2.innerHTML = s2.innerHTML+'<div class="row" style="margin-bottom:20px;"><div class="col-sm-1 col-md-1 col-lg-1  text-center"><h3><span class="black">'+(j+1)+'</span></h3></div><div class="col-sm-10 col-md-10 col-lg-10" style="margin-left:30px;"><div><p class="answerText comment more">'+ decodeURIComponent(data.answer[j].Extract) +'</p></div></div></div>';
	  
  }
	const showChar = 300;
	const ellipsestext = "...";
	const moretext = "View more";
	const lesstext = "Hide";
	$('.more').each(function() {
		const content = $(this).html();
		if(content.length > showChar) {

						const c = content.substr(0, showChar);
						const h = content.substr(showChar-1, content.length - showChar);

						const html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

						$(this).html(html);
		}

	});

	$(".morelink").click(function(){
		//alert("else");
		if($(this).hasClass("Hide")) {
						$(this).removeClass("Hide");
						$(this).html(moretext);
		} else {
						$(this).addClass("Hide");
						$(this).html(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
    
};