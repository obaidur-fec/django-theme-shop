var $sidenav = $(".sidenav"),
    $toggler = $(".navbar-toggler"),
    collapsed = false;


$sidenav.css('top', $('.navbar').outerHeight());

if (window.innerWidth < 801) {
    collapse();
}


$(window).resize(function () {
    if (window.innerWidth < 801) {
        console.log(collapsed);
        collapse();
    } else {
        console.log(collapsed);
        restore();
    }
});


$toggler.click(function () {
    $toggler.css("color", "green");
    if (!$sidenav.hasClass('show')) {
        showSidenav();
    } else {
        hideSidenav();
    }

});

function showSidenav() {
    $sidenav.css("display", "flex");
    window.setTimeout(function () {
        $sidenav.css({
            "width": "100%",
            "background-color": "black",
            "height": "100%",
            'padding-top': "190px",
            'padding-right': "35px",
        });
    }, 20);
    $sidenav.addClass("show");
}

function hideSidenav() {
    $sidenav.css("width", "0px");
    window.setTimeout(function () {
        $sidenav.css({
            "display": "none",
        });
    }, 500);
    $sidenav.removeClass('show');
}


function collapse() {
    if (collapsed = true) {
        $(".navbar-collapse >  .navbar-nav li a").appendTo(".sidenav").addClass('w-100 text-right');

    }
}

function restore() {
    if (collapsed = false) {
        $('.sidenav > .navbar-nav li a').appendTo(".navbar-collapse").removeClass("w-100 text-right");
        hideSidenav();
    }
}

// function myFunction(imgs) {
//     // Get the expanded image
//     var expandImg = document.getElementById("expandedImg");
//     // Get the image text
//     var imgText = document.getElementById("imgtext");
//     // Use the same src in the expanded image as the image being clicked on from the grid
//     expandImg.src = imgs.src;
//     // Use the value of the alt attribute of the clickable image as text inside the expanded image
//     imgText.innerHTML = imgs.alt;
//     // Show the container element (hidden with CSS)
//     expandImg.parentElement.style.display = "block";
// } 



$(document).ready(function () {
    $(window).scroll(function () { // check if scroll event happened
        if ($(document).scrollTop() > 100) { // check if user scrolled more than 50 from top of the browser window
            $(".navbar").css("background-color", "black"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
        } else {
            $(".navbar").css("background-color", "transparent"); // if not, change it back to transparent
        }
    });
});



(function ( $ ) {
    $.fn.categoryFilter=function(_selector){
        this.click( function() {
            var categoryValue = $(this).attr('id');
            console.log(categoryValue)
            $(this).addClass('active').siblings().removeClass('active');
            if(categoryValue=="all") {
                $('.filter').show(1000);
            } else {
                $(".filter").not('.'+categoryValue).hide('3000');
                $('.filter').filter('.'+categoryValue).show('3000');
            }
        });
    }
}( jQuery ));


$(document).ready(function () {
 $('#bkash').click(function(){
    if($(this).is(':checked')){
        $("#filter").show();
    }
    else{
        $("#filter").hide();
    }
 });
});


console.log("this is okkkkkkk")


//bkash................


    $(document).ready(function(){

    var paymentConfig={
    createCheckoutURL:"https://merchantserver.sandbox.bka.sh/api/checkout/v1.2.0-beta/payment/create/",
    executeCheckoutURL:"https://merchantserver.sandbox.bka.sh/api/checkout/v1.2.0-beta/payment/execute/",
    };


    var paymentRequest;
    paymentRequest = { amount:'105',intent:'sale'};
    console.log(JSON.stringify(paymentRequest));

    var paymentID = '01863043638';

    bKash.init({
    paymentMode: 'checkout',
    paymentRequest: paymentRequest,
    createRequest: function(request){
        console.log('=> createRequest (request) :: ');
        console.log(request);

        $.ajax({
            url: paymentConfig.createCheckoutURL,
            type:'POST',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: function(data) {
                console.log('got data from create  ..');
                console.log('data ::=>');
                console.log(JSON.stringify(data));

                if(data && data.paymentID != null){
                    paymentID = data.paymentID;
                    bKash.create().onSuccess(data);
                }
                else {
      console.log('error');
                    bKash.create().onError();
                }
            },
            error: function(){
    console.log('error');
                bKash.create().onError();
            }
        });
    },

    executeRequestOnAuthorization: function(){
        console.log('=> executeRequestOnAuthorization');
        $.ajax({
            url: paymentConfig.executeCheckoutURL,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify({ "paymentID": paymentID }),
            success: function(data){
                console.log('got data from execute  ..');
                console.log('data ::=>');
                console.log(JSON.stringify(data));
                //document.getElementById("demo4").innerHTML = data;
                if(data && data.paymentID != null){
                    alert('[SUCCESS] data : ' + JSON.stringify(data));var value1=data.paymentID;
                    var value1=data.paymentID;
                    var value2=data.trxID;
                    var value3=data.amount;
                    var queryString = "?Payment ID = " + value1 + "&Transaction ID = " + value2+ "&Amount = " + value3;
                    window.location.href = "file:///android_asset/www/checkoutSuccess.html"+ queryString;
                }
                else {
                    bKash.execute().onError();
                }
            },
            error: function(){
                bKash.execute().onError();
            }
        });
    }
    });


      function callReconfigure(val){
     bKash.reconfigure(val);
     }

     function clickPayButton(){
     $("#bKash_button").trigger('click');
     }



    });

 
