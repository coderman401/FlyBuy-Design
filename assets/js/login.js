
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input');
    var form, url;
    $(document).on('click', '.submit-form', function(e) {
        e.preventDefault();
        var check = true;
        var type = $(this).data('type');
        console.log('here', type)
        check = validateAllInput();
        if (check) {
            if (type == 'login') {
                // submit login form
                form = $('#login-form');
                url = "{{ url_for('view.user_login') }}";
            }
            if (type == 'register') {
                // submit register form
                form = $('#register-form');
                url = "{{ url_for('view.registration') }}";
            }
            submitAjax(url, form);
        }
    });

    $('.send-reset-link').on('click', function(e) {
        e.preventDefault();
        var check = true;
        check = validateAllInput();
        if(check) {
            var form = $('#forget-form');
            var url = "{{ url_for('view.forgot_password') }}";
            submitAjax(url, form);
        }
    });

    $(document).on('click', '.reset-password', function(e) {
        e.preventDefault();
        var check = true;
        check = validateAllInput();
        if (check) {
            var url = "{{ url_for('view.forgot_password') }}";
            var form = $('#reset-form');
            submitAjax(url, form);
        }
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validateAllInput() {
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    }

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
            if ($(input).val() != '' && $(input).closest('.validvalidate-form').find('.password').val() != $(input).val()) {
                console.log('here')
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

    function submitAjax(url, form) {
        $.ajax({
            // headers: {
            //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            // },
            type: "POST",
            url: url,
            dataType: "json",
            data: form.serialize(),
            success: function(data) {
                console.log(data);
                // here is process after ajax success
            },
            error : function(data) {
                console.log(data);
                // here is the process of after ajax fail
            }
        });
    }

})(jQuery);