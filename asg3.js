function check(){/*
    if (!checkSize()){
	}
    else if(!checkDelivery()){
	}
	else if (!checkName()){
	}
	else if (!checkPhone()){
	}*/
	if (!checkPayment()){
	}
}

function checkSize(){
    var size = document.getElementsByName("size");
    for (var i = 0; i < size.length; i++){
        if (size[i].checked) {
        	return true;
        }
    }
    show("Size must be selected.");
	return false;
}

function checkDelivery(){
    var delivery = document.getElementsByName("delivery");
    for (var i = 0; i < delivery.length; i++){
        if (delivery[i].checked) {
            return true;
        }
    }
    show("Type of delivery must be selected.");
    return false;

}

function checkName(){
	var name = document.getElementById("name").value;
	if (name == ""){
        show("Name field must be filled out.");
	}
	return name != "";
}

function checkPhone(){
	var phone = document.getElementById("phone").value;
	if (phone == ""){
		show("Phone number must be entered");
		return false;
	}
	if (phone.search("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]") == 0 && phone.length == 12){
		return true;
	}
	show("Format of phone number is incorrect.");
	return false;
}

function checkPayment(){
	var payment = document.getElementsByName("payment");
    var delivery = document.getElementsByName("delivery");
	if (payment[0].checked){ // cash
		if (delivery[0].checked){ // pick up
            return true;
		}
		else{ // delivery
			return checkAddress();
		}
	}
	else if (payment[1].checked){ // credit
		if (!checkPaymentInfo()) {
            return false;
        }
        if (delivery[0].checked){ // pick up
            return true;
        }
        else{ // delivery
            return checkAddress();
        }
		return true;
	}
	show("Payment method must be selected.");
	return false;
}

function checkPaymentInfo(){
	var payInfo = document.getElementsByName("payInfo");
	var isTrue = false;
	for (var i = 0; i < payInfo.length; i++){
		if (payInfo[i].checked){
			isTrue = true;
		}
	}
	if (!isTrue){
		show("Card type must be selected.");
		return false;
	}
	var cardNum = document.getElementById("cardNum").value;
    var cardExp = document.getElementById("cardExp").value;
    var cardCode = document.getElementById("cardCode").value;
	if (cardNum == "" || cardExp == "" || cardCode == ""){
		show("Payment Info must be completely fillout out.");
		return false;
	}
    if (cardNum.search("[0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9]") != 0 || cardNum.length != 19){
        show("Format of card number is incorrect.");
        return false;
    }
    if (cardExp.search("[0-9][0-9]/[0-9][0-9]")){
        show("Format of card expiration date is incorrect.");
        return false;
	}
    if (cardCode.search("[0-9][0-9][0-9]")){
        show("Format of card security code is incorrect.");
        return false;
    }
	return true;
}

function checkAddress (){
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var state = document.getElementById("state");
    if (street == "" || city == "" || zip == "" || state.value == "0"){
        show("Address field must be completely filled out.");
        return false;
    }
    show("checking");
    if (zip.search("[0-9][0-9][0-9][0-9][0-9]") != 0 || zip.length != 5){
        show("Format of zip code is incorrect.");
        return false;
	}
	return true;
}

function computeTotalCost(){
	if (!checkSize()){
		return;
	}
	var cost = 0.00;
	var size = document.getElementsByName("size");
	var size1 = 1;
	for (var i = 0; i < size.length; i++){
		if (size[i].checked) {
			if (size[i].value == "Small"){
				cost += 6;
				size1 = 1;
			}
			else if (size[i].value == "Medium"){
				cost += 10.75;
				size1 = 2;
			}
			else if (size[i].value == "Large"){
				cost += 11.5;
				size1 = 3;
			}
		}
	}
	var total = 0;
	var toppings = document.getElementsByName("toppings");
	for (var i = 0; i < toppings.length; i++){
		if (toppings[i].checked){
			total++;
		}
	}
	if (size1 == 1){
		cost += total;
	} 
	else {
		cost += total * 2;
	}
	cost *= 1.06;
	document.getElementById("total").value = "$" + cost.toFixed(2);
}

function show(a){
    var x = document.getElementById("snackbar");
    x.innerHTML = a;
    x.className = "show";
    setTimeout(function(){
        x.className = x.className.replace("show", ""); }, 3000);
}
