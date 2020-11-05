
(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input');

    $(document).on('click', '.submit-form', function(e) {
        e.preventDefault();
        var check = true;
        var type = $(this).data('type');
        console.log('here', type)
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            if (type == 'login') {
                // submit login form
                console.log('login');
                alert('ajax call or request for login form');
            }
            
            if (type == 'register') {
                // submit register form
                console.log('register');
                alert('ajax call or request for regster form')
            }

        }
    });
    $(document).on('click', '.reset-password', function(e) {
        e.preventDefault();
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            alert('process to update the password');

        }
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else if($(input).attr('name') == 'confirm-password') {
            if ($(input).val() == '') {
                $(input).closest('.wrap-input').attr('data-validate', 'Confirm Password requried.')
                return false;
            }
            if ($(input).val() != '' && $(input).closest('.register-form').find('.password').val() != $(input).val()) {
                $(input).closest('.wrap-input').attr('data-validate', 'Password does not match.')
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);