function check(){
    if (!checkSize()){
    	show("Size must be selected.");
	}
    //checkToppings();
    if(!checkDelivery()){
    	show("Type of delivery must be selected.");
	}
	if (!checkName()){
    	show(name);
	}
	checkPhone();
	checkPayment()
	checkPayInfo()
	checkAddress()
}

function checkSize(){
    var size = document.getElementsByName("size");
    for (var i = 0; i < size.length; i++){
        if (size[i].checked) {
        	return true;
        }
    }
	return false;
}

function checkDelivery(){
    var delivery = document.getElementsByName("delivery");
    for (var i = 0; i < delivery.length; i++){
        if (delivery[i].checked) {
            return true;
        }
    }
    return false;

}

function checkName(){
	var name = document.getElementById("name").value;
	return name == "";
}

function checkPhone(){
	var phone = document.getElementById("address").value;
	if (phone == ""){
		show("Phone number must be entered");
		return false;
	}
	if (phone.search("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]") == 0 && phone.length == 12){
		return true;
	}
	return false;
}

function checkPayment(){

}

function computeTotalCost(){
	var cost = 0.00;
	var size = document.getElementsByName("size");
	var size1 = 1;
	for (var i = 0; i < size.length; i++){
		if (size[i].checked) {
			if (size[i].value == "Small"){
				cost += 6;
				size = 1;
			}
			else if (size[i].value == "Medium"){
				cost += 10.75;
				size = 2;
			}
			else if (size[i].value == "Large"){
				cost += 11.5;
				size = 3;
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
	if (size == 1){
		cost += total;
	} 
	else {
		cost += total * 2;
	}
	cost *= 1.06;
	document.getElementById("total").value = "$" + cost.toFixed(2);
}

function show(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){
        x.className = x.className.replace("show", ""); }, 3000);
}
