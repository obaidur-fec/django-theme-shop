jQuery(document).ready(function($){
    var currentCountry = JSON.parse($.cookie("current_country"));
    $('.currency').text(currentCountry.currency.code);
    
    if($.cookie("qco_amount")){
        var c_amount = $.cookie("qco_amount");
        $("#qco_amount").text(c_amount + ".00");
    }
    
    if ($('body#qco-acc-step1').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-processing.html";
        });
    }
    
    if ($('body#qco-btc-step1').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-btc-step2.html";
        });
    }
    
    if ($('body#qco-btc-step2').length > 0){
        $("#copy-tab").on("click", function(e){
            $(this).addClass("active");
            $("#scan-tab").removeClass("active");
            $(".payment-tabs__slider").css("right", "0%");
            $("#scan").removeClass("active");
            $("#copy").addClass("active");
        })
        
        $("#scan-tab").on("click", function(e){
            $(this).addClass("active");
            $("#copy-tab").removeClass("active");
            $(".payment-tabs__slider").css("right", "50%");
            $("#copy").removeClass("active");
            $("#scan").addClass("active");
        })
        
        $("#btc_payment").on("click", function(e){
            e.preventDefault();
            window.open("/popup.html", "_blank", "titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,height=736,width=402");
        })
        
        $("#btc_return").on("click", function(e){
            if($.cookie("wco_via_qco") == 1 ){
                window.location.href = "wco-success.html";
            }
            else{
                window.location.href = "qco-success.html";
            }
        })
    }
    
    if ($('body#btc-popup').length > 0){
        $("#btc_confirm_button").on("click", function(e){
            window.opener.btcPayment();
            window.close();
        });
    }
    
    if ($('body.klarna').length > 0){
        $(".klarna_amount").html(currentCountry.currency.symbol + " " + c_amount + ".00");
    }
    
    if ($('body#qco-sft-step1').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-sft-step2.html";
        });
    }
    
    if ($('body#qco-sft-step2').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            $(".main").hide();
            $(".footer").hide();
            $(".loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-sft-step3.html";
            }, 2000);
        });
    }
    
    if ($('body#qco-sft-step3').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            $(".main").hide();
            $(".footer").hide();
            $(".loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-sft-step4.html";
            }, 2000);
        });
    }
    
    if ($('body#qco-sft-step4').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            $(".main").hide();
            $(".footer").hide();
            $(".loading").show();
            
            setTimeout(function(){
                if($.cookie("wco_via_qco") == 1){
                    window.location.href = "wco-success.html";
                }else{
                    window.location.href = "qco-sft-success.html";
                }
            }, 3200);
        });
    }
    
    if ($('body#qco-gir-step1').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-processing.html";
        });
    }
    
    if ($('body#qco-ntl-step1').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-processing.html";
        });
    }
       
    if ($('body#qco-psc-step1').length > 0){
        $("#qco-psc-step1 #qco_amount2").text(c_amount + ".00");
        
        $("#classicPin-addPinField").keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            if($('#classicPin-addPinField').val().length > 15){
                e.preventDefault();
            }
        });
        
        $("#payBtn").on("click", function(e){
            $(this).html("");            
            $(this).addClass("working");
            setTimeout(function(){
                $("#payBtn").removeClass("working");
                $("#payBtn").addClass("done");
                $(".payment-amount-info strong").css("color", "#008102");
            }, 1200);
            
            setTimeout(function(){
                if($.cookie("wco_via_qco") == 1){
                    window.location.href = "wco-success.html";
                }else{
                    window.location.href = "qco-psc-success.html";
                }
            }, 2500);
        });
    }
    
    if ($('body#qco-rap-step5').length > 0){
        setTimeout(function(){
            window.location.href = "qco-rap-step6.html";
        }, 2500);
    }

    if ($('body#qco-rap-step6').length > 0){
        var c_amount = $.cookie("qco_amount");
        $("#qco-rap-step6 #qco_amount2").text(c_amount + ".00");
        
        if($.cookie("wco_via_qco") == 1){
            
            $("#back_to_skrill").on("click", function(e){
                e.preventDefault();
                window.location.href = "wco-success.html";
            });
        }
    }
    
    if ($('body#qco-tru-step1').length > 0){
        $(".core_method").on("click", function(e){
            e.preventDefault();
            
            $("#core_order_holder").hide();
            $("#loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-tru-step2.html";
            }, 1200);
        });
    }
    
    if ($('body#qco-tru-step2').length > 0){
        $("#next_button").on("click", function(e){
            e.preventDefault();
            
            $("#core_order_holder").hide();
            $("#loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-tru-step3.html";
            }, 1200);
        });
    }
    
    if ($('body#qco-tru-step3').length > 0){
        $("#next_button").on("click", function(e){
            e.preventDefault();
            
            $("#core_order_holder").hide();
            $("#loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-tru-step4.html";
            }, 1200);
        });
    }
    
    if ($('body#qco-tru-step4').length > 0){
        $("#next_button").on("click", function(e){
            e.preventDefault();
            
            $("#core_order_holder").hide();
            $("#loading").show();
            
            setTimeout(function(){
                window.location.href = "qco-tru-step5.html";
            }, 1200);
        });
    }
    
    if ($('body#qco-tru-step5').length > 0){
        var c_amount = $.cookie("qco_amount");
        $("#qco-tru-step5 #qco_amount2").text(c_amount + ".00");
        
        $("#next_button").on("click", function(e){
            e.preventDefault();
            
            $("#core_order_holder").hide();
            $("#loading").show();
            
            setTimeout(function(){
                if($.cookie("wco_via_qco") == 1){
                    window.location.href = "wco-success.html";
                }else{
                    window.location.href = "confirmation.html";
                }
            }, 2500);
        });
    }
    
    if ($('body#qco-wlt-step1').length > 0){
        $("#login_btn").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-wlt-step2.html";
        });
    }
    
    if ($('body#qco-wlt-step2').length > 0){
        $("#pay_button").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-processing.html";
        });
    }
    
    if ($('body#qco-pch-step1').length > 0){
        $("#registerBtn").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-pch-step2.html";
        });
        $("#backToLoginLink").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-pch-step1a.html";
        });
    }
    
    if ($('body#qco-pch-step1a').length > 0){
        $("#connectBtn").on("click", function(e){
            e.preventDefault();
            window.location.href = "qco-pch-step2.html";
        });
    }
    
    if ($('body#qco-pch-step2').length > 0){
        $("#qco-pch-step2 #qco_amount2").text(c_amount + ".00");
    }
});