var paymentMethods = [
    {
        "id": "PSC",
        "name": "paysafecard",
        "logo": "img/paysafecard.png"
    },
    {
        "id": "RAP",
        "name": "Rapid Transfer",
        "logo": "img/rapidtransfer.png"
    },
    {
        "id": "WLT",
        "name": "Skrill Wallet",
        "logo": "img/skrill.png"
    },
    {
        "id": "ACC",
        "name": "Credit/Debit Card",
        "logo": "img/multiple-options.gif"
    },
    {
        "id": "NTL",
        "name": "NETELLER",
        "logo": "img/neteller-logo.png"
    },
    {
        "id": "SFT",
        "name": "Klarna",
        "logo": "img/klarna.png"
    },
    {
        "id": "BTC",
        "name": "Bitcoin",
        "logo": "img/Bitcoin_by_Skrill.png"
    },
    {
        "id": "GIR",
        "name": "Giropay",
        "logo": "img/giropay.png"
    },
    {
        "id": "TRU",
        "name": "Trustly",
        "logo": "img/trustly.png"
    },
    {
        "id": "1TA",
        "name": "1-Tap",
        "logo": "img/1tap.png"
    },
    {
        "id": "PCH",
        "name": "Cash",
        "logo": "img/pscash.png"
    }
];
	
var countries = [
    {
        "name": "United Kingdom",
        "paymentMethods" : ["ACC", "WLT", "1TA", "RAP", "NTL", "PSC", "SFT", "BTC", "PCH"],
        "currency": {
            "code": "GBP",
            "symbol": "£"
        }
    },
    {
        "name": "Germany",
        "paymentMethods" : ["ACC", "SFT", "RAP", "PSC", "WLT", "1TA", "NTL", "BTC"],
        "currency": {
            "code": "EUR",
            "symbol": "€"
        }
    },
    {
        "name": "France",
        "paymentMethods" : ["ACC", "WLT", "1TA", "RAP", "PSC", "NTL", "SFT", "BTC", "PCH"],
        "currency": {
            "code": "EUR",
            "symbol": "€"
        }
    },
    {
        "name": "Italy",
        "paymentMethods" : ["ACC", "WLT", "1TA", "RAP", "PSC", "NTL", "SFT", "BTC", "PCH"],
        "currency": {
            "code": "EUR",
            "symbol": "€"
        }
    },
    {
        "name": "Spain",
        "paymentMethods" : ["ACC", "PSC", "RAP", "NTL", "WLT", "1TA", "SFT", "BTC", "PCH"],
        "currency": {
            "code": "EUR",
            "symbol": "€"
        }
    }
]
    
//Products
var products = [
    {
        "name": "DSLR Camera",
        "price" : 899,
        "image": "img/camera.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Laptop",
        "price": 1599,
        "image": "img/laptop.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Headphones",
        "price": 199,
        "image": "img/headphones.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Smartphone",
        "price": 799,
        "image": "img/iphone.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Tablet",
        "price": 899,
        "image": "img/ipad.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "E-reader",
        "price": 199,
        "image": "img/kindle.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Smart Watch",
        "price": 399,
        "image": "img/smartwatch.jpg",
        "description": "Lorem ipsum dolor sit amet."
    },
    {
        "name": "Music Player",
        "price": 199,
        "image": "img/ipod.jpg",
        "description": "Lorem ipsum dolor sit amet."
    }
];

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function findPMById(paymentMethods, methodId){
    for(var i = 0, m = null; i < paymentMethods.length; ++i) {
        if(paymentMethods[i].id == methodId) {
            return paymentMethods[i];
        }
    }
}

function findCountryByName(countryName){
    for(var i = 0, m = null; i < countries.length; ++i) {
        if(countries[i].name == countryName) {
            return countries[i];
        }
    }
}

function changeCountry(country){
    $("#current_country").text(country.name);
    $.cookie("current_country", JSON.stringify(country));
    updatePMs();
    updateCurrencySymbols();
}

function subscriptionStart(amount){
    $.cookie("sub_amount", amount);
    window.location.href = "sub-wlt-step1.html";
}

function generatePMHTML(paymentMethod){
    var html = '<div class="pm"><label for="'+paymentMethod.id+'"><input name="pm" class="pms" id="'+paymentMethod.id+'" type="radio"> Pay with '+paymentMethod.name+'<center><img src="'+paymentMethod.logo+'" alt="'+paymentMethod.name+'"></center></label></div>';
    return html;
}

function updatePMs(){
    $("#payment_methods").empty();
    var currentCountry = JSON.parse($.cookie("current_country"));

    for (i = 0; i < currentCountry.paymentMethods.length; ++i) {
        $("#payment_methods").append(generatePMHTML(findPMById(paymentMethods,currentCountry.paymentMethods[i])));
    }
}

function updateCurrencySymbols(){
    var currentCountry = JSON.parse($.cookie("current_country"));
    $('span.currency-sign').text(currentCountry.currency.symbol);
    $('input.currency-code').val(currentCountry.currency.code);
}

function updateCurrentBalance(){
    var currentCountry = JSON.parse($.cookie("current_country"));
    var current_balance = $.cookie("current_balance");
    $('span.currency-sign').text(currentCountry.currency.symbol);
    $('input.currency-code').val(currentCountry.currency.code);
    if(current_balance){
        $("#gaming-amount").text(current_balance + ".00");
    }
}

jQuery(document).ready(function($){
	//handles the country selector
    if($.cookie("current_country")){
        var currentCountry = JSON.parse($.cookie("current_country"));
        $("#current_country").text(currentCountry.name);
    }else{
        changeCountry(findCountryByName("United Kingdom"));
    }
    
    // jQuery sticky Menu
    
    if($(".mainmenu-area").length > 0)
    {
        $(".mainmenu-area").sticky({topSpacing:0});
    }
    
	
    if($('.product-carousel').length > 0)
    {
        $('.product-carousel').owlCarousel({
            loop:true,
            nav:true,
            margin:20,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:3,
                },
                1000:{
                    items:5,
                }
            }
        });    
    }
    
    if($('.related-products-carousel').length > 0)
    {
        $('.related-products-carousel').owlCarousel({
            loop:true,
            nav:true,
            margin:20,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:2,
                },
                1000:{
                    items:2,
                },
                1200:{
                    items:3,
                }
            }
        }); 
    }
    
    if($('.brand-list').length > 0)
    {
        $('.brand-list').owlCarousel({
            loop:true,
            nav:true,
            margin:20,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:3,
                },
                1000:{
                    items:4,
                }
            }
        }); 
    }
    
    
    // Bootstrap Mobile Menu fix
    $(".navbar-nav li a").click(function(){
        $(".navbar-collapse").removeClass('in');
    });    
    
    //execute only on the ecommerce main page
    if ($('body.eCommerce').length > 0){
        var currentCountry = JSON.parse($.cookie("current_country"));
        $('span.currency-sign').text(currentCountry.currency.symbol);
        
        var cart_product = $.cookie("cart_product");
        if(cart_product != null){
            $(".cart_amount").addClass("cart-amount");
            $(".cart_amount").html('<span class="currency-sign">'+currentCountry.currency.symbol+'</span>' + products[cart_product].price + '.00');
            $(".product-count").html("1");
        }
    }
    
    //execute only on the gaming deposit main page
    if ($('body.deposit').length > 0)
    {
        $("#deposit_btn").on("click", function(){
            if($("#deposit_amount").val() != ""){
                if($("#pm-skrill").hasClass("selected")){
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    window.location.href = "deposit-iframe-wallet.html";
                }
                if($("#pm-onetap").hasClass("selected")){
                    if($.cookie("onetap_authorized") == "true"){
                        setTimeout(function(){
                            $(".alert").css("display","block");
                            var current_balance = parseInt($.cookie("current_balance"));
                            var deposit_amount = parseInt($("#deposit_amount").val());
                            
                            $.cookie("current_balance", current_balance + deposit_amount);
                            updateCurrentBalance();
                        }, 1500);
                    }
                    else{
                        $.cookie("onetap_amount", $("#deposit_amount").val());
                        window.location.href = "deposit-iframe-onetap.html";
                    }
                }
                if($("#pm-neteller").hasClass("selected")){
                    window.location.href = "http://www.netellerdemo.com/deposit.html?amount=" + $("#deposit_amount").val();
                }
                
                if($("#pm-creditcard").hasClass("selected")){
                    $.cookie("qco_amount", $("#deposit_amount").val());
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    $.cookie("wco_via_qco", 1);
                    window.location.href = "qco-acc-step1.html";
                }
                
                if($("#pm-rapidtransfer").hasClass("selected")){
                    $.cookie("qco_amount", $("#deposit_amount").val());
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    $.cookie("wco_via_qco", 1);
                    window.location.href = "qco-rap-step1.html";
                }
                
                if($("#pm-paysafecard").hasClass("selected")){
                    $.cookie("qco_amount", $("#deposit_amount").val());
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    $.cookie("wco_via_qco", 1);
                    window.location.href = "qco-psc-step1.html";
                }
                
                if($("#pm-klarna").hasClass("selected")){
                    $.cookie("qco_amount", $("#deposit_amount").val());
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    $.cookie("wco_via_qco", 1);
                    window.location.href = "qco-sft-step1.html";
                }
                
                if($("#pm-bitcoin").hasClass("selected")){
                    $.cookie("qco_amount", $("#deposit_amount").val());
                    $.cookie("wco_amount", $("#deposit_amount").val());
                    $.cookie("wco_via_qco", 1);
                    window.location.href = "qco-btc-step1.html";
                }
            }
        })
        
        if(getParameterByName("success") == "true"){
            $(".alert").css("display","block");
            $.cookie("wco_via_qco", 0);
        }
        
        updateCurrentBalance();
    }
    
    //execute only on the cart page
    if ($('body.cart').length > 0)
    {
        var add_item = getParameterByName("add_item");
        var cart_product = $.cookie("cart_product");
        var currentCountry = JSON.parse($.cookie("current_country"));
        
        if(add_item != "")
        {
            $("#cart_thumbnail").attr('src', products[add_item].image);
            $("#cart_name").html(products[add_item].name);
            $(".cart-amount").html('<span class="currency-sign">'+currentCountry.currency.symbol+'</span>' + products[add_item].price + ".00");
            
            $.cookie("cart_product", add_item);
            $.cookie("qco_amount", products[add_item].price);
        }
        else if(cart_product)
        {
            $("#cart_thumbnail").attr('src', products[cart_product].image);
            $("#cart_name").html(products[cart_product].name);
            $(".cart-amount").html('<span class="currency-sign">'+currentCountry.currency.symbol+'</span>' + products[cart_product].price + ".00");
        }
        
        $("#proceed_to_checkout").on('click', function(){
           window.location.href = "payment.html";
        });
    }

    //execute only on the checkout page
    if($('body.payment').length > 0)
    {
        var cart_product = $.cookie("cart_product");
        var currentCountry = JSON.parse($.cookie("current_country"));
        
        if(cart_product)
        {
            $(".cart-amount").html('<span class="currency-sign">'+currentCountry.currency.symbol+'</span>' + products[cart_product].price + ".00");
            $("#payment_item").html(products[cart_product].name + "<span class=\"floatright\">Qty. 1</span>");
        }
        
        $(document).on("change", ".pms", function() {
            $.cookie("qco_current_pm", this.id);
            $("div.pm").removeClass("pmselected");
            $(this).closest("div.pm").toggleClass("pmselected", this.checked);
        });
        
        updatePMs();
        
		//Redirection to the correct payment method happens here:
        $("#payment_continue").on("click", function(e){
            $.cookie("qco_amount", products[$.cookie("cart_product")].price);
            
            if($.cookie("qco_current_pm")){
                if($.cookie("qco_current_pm") == "1TA"){
                    if($.cookie("1ta_for_ecomm") == 1){
                        setTimeout(function(){
                            window.location.href = "confirmation.html";
                        }, 1500);
                    }
                    else{
                        $.cookie("onetap_amount", products[$.cookie("cart_product")].price);
                        $.cookie("wco_via_qco", 1);
                        $.cookie("1ta_for_ecomm", 1);
                        window.location.href = "onetap-gw.html";    
                    }                    
                }
                if($.cookie("qco_current_pm") == "WLT"){
                    $.cookie("wco_amount", products[$.cookie("cart_product")].price);
                    $.cookie("qco_via_wco", 1);
                    window.location.href = "wco-gw.html";
                }
                else{
                    window.location.href = "qco-"+$.cookie("qco_current_pm").toLowerCase()+"-step1.html";
                }
            }
            else{
                console.log("we do not have a PM selected");
            }
        });
    }

    if($('body.qco-success').length > 0)
    {
        $.removeCookie('cart_product', { path: '/' });
        $.removeCookie('qco_amount', { path: '/' });
        $.removeCookie('qco_current_pm', { path: '/' });
    }
    
    //executed only on the subscriptions page
    if ($('body.subscriptions').length > 0){
        var currentCountry = JSON.parse($.cookie("current_country"));
        $('span.currency-sign').text(currentCountry.currency.symbol);
    }
    
    
     $(".payment-method-button").click(function(e){
         $(".payment-method-button").removeClass("selected");
         $(this).addClass("selected");
         $(".alert").css("display","none");
    }); 
});