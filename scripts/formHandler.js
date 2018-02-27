
function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
}


function handleSubmitForm(form){
	
    event.preventDefault();
	var formData = ConvertFormToJSON(form);
	var formDataStr = JSON.stringify(formData);
    var data = JSON.stringify({'message': 'FORMSUBMIT', 'user_name': login_user_ID,'formData':formDataStr});
    ws.send(data);	
}


function handleCancelForm(){
    event.preventDefault();
    var data = JSON.stringify({'message': 'FORMCANCEL', 'user_name': login_user_ID});
    ws.send(data);	
}