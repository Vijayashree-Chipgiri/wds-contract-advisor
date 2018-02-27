
var date1 = /([0-9]th|[0-9][0-9]th|[0-9][0-9]nd|[0-9]nd|[0-9][0-9]rd|[0-9]rd|[0-9][0-9]st|[0-9]st|[0-9][0-9])/g;
var symbols1 = /(-|:|\s|,)/g;
var month1 = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)/i;
var year1 = /([0-9][0-9][0-9][0-9]|[0-9][0-9])/g;
var regex1 = new RegExp(date1.source + symbols1.source + month1.source + symbols1.source + year1.source);
var regex2 = new RegExp(date1.source + symbols1.source + month1.source + year1.source);
var regex3 = new RegExp(date1.source + month1.source + symbols1.source + year1.source);
var regex4 = new RegExp(date1.source + month1.source + year1.source);
var regex5 = new RegExp(date1.source + month1.source);
var regex6 = new RegExp(date1.source + symbols1.source + month1.source);
var regex7 = new RegExp(month1.source + symbols1.source + date1.source + symbols1.source + year1.source);
var regex9 = new RegExp(month1.source + symbols1.source + year1.source);
var regex8 = new RegExp(date1.source + symbols1.source + month1.source + year1.source);
var allReg = [regex5, regex6, regex7, regex8, regex1, regex2, regex3, regex4];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var months1 = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'septemper', 'october', 'november', 'december'];
var dateValue = '';
var mntValue = '';
var yrValue = '';
var yrValue1 = '';
var matchkey = '';
var noSet = 0;
$('.chat-input').keyup(function(e) {
    $values = $(this).val().toLowerCase();
    $.each(allReg, function(i, j) {

        var result = $values.match(j);
        if (result != null) {
            matchkey = i;
            //document.getElementById("demo").innerHTML = result;
            if (result[0].match(date1)) {
                //console.log("date:"+ result[0].match(date1)[0]);
                if (result[0].match(date1)[0].length > 2) {
                    dateValue = result[0].match(date1)[0].slice(0, -2);
                } else if (result[0].match(date1)[0].length > 0 && result[0].match(date1)[0].length < 2) {
                    dateValue = "0" + result[0].match(date1)[0];
                } else {
                    dateValue = result[0].match(date1)[0];
                }
                //console.log("date:"+ dateValue);
            }
            if (result[0].match(month1)) {
                $.each(months, function(k, l) {
                    if (l == result[0].match(month1)[0]) {
                        var ss = k + 1;
                        //alert(k+1);
                        if (ss.toString().length > 1) {
                            mntValue = ss;
                        } else {
                            mntValue = "0" + ss;
                        }
                    }
                });
                if(mntValue==''){
                	alert(mntValue);
	                $.each(months1, function(k, l) {
	                    if (l == result[0].match(month1)[0]) {
	                        var ss = k + 1;
	                        //alert(k+1);
	                        if (ss.toString().length > 1) {
	                            mntValue = ss;
	                        } else {
	                            mntValue = "0" + ss;
	                        }
	                    }
	                });
                }
                //console.log("month:"+ mntValue);
            }
            if (result[0].match(regex9)) {
                var yrrs =
                    yrValue = result[0].match(regex9).slice(-1)[0];
                if (yrValue.toString().length > 2) {
                    yrValue1 = yrValue;
                } else {
                    yrValue1 = "20" + yrValue;
                }
            }
            if (result[0].match(regex8)) {
                yrValue = result[0].match(regex8).slice(-1)[0];
                if (yrValue.toString().length > 2) {
                    yrValue1 = yrValue;
                } else {
                    yrValue1 = "20" + yrValue;
                }
            }

            if (result[0].match(regex7)) {
                yrValue = result[0].match(regex7).slice(-1)[0];
                if (yrValue.toString().length > 2) {
                    yrValue1 = yrValue;
                } else {
                    yrValue1 = "20" + yrValue;
                }
            }
            if (yrValue1 == '') {
                yrValue1 = '2017';
            }
            noSet=1;
        }

    });

    $('#checksbutton').off().on('click', function() {
        //console.log(yrValue1+"-"+mntValue+"-"+dateValue);
        var i = 0;
        var result = '';
        if (i == 0) {
            i = i + 1;
            var regexp = new RegExp(allReg[matchkey], 'ig');
            result = $(".chat-input").val().replace(regexp, yrValue1 + "-" + mntValue + "-" + dateValue);
        }
        //alert(noSet);
        if(noSet==1){
        	$(".chat-input").val(result);
        }
        //document.getElementById("demo").innerHTML = yrValue1 + "-" + mntValue + "-" + dateValue;
    });
});


