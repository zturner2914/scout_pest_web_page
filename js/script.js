$(function () {

    var cpyWrp = $('.copy-wrap');

//change color on over
    $(cpyWrp).mouseover(function () {
      $(this).addClass('this-hover');
    });

    $(cpyWrp).mouseout(function () {
        $(this).removeClass('this-hover');
    });

//add class to open slide
    $('.plus-wrap, .bug-copy').click(function (e) {
        e.preventDefault();
        var selectedTab = $(this);
        if (selectedTab.parent().hasClass('open')) {
            selectedTab.parent().removeClass('open');
        } else {
            selectedTab.parent().addClass('open');
        }
    });

//grab data ajax call to qualtrics
    $('.form-button').click(function (e) {
        e.preventDefault();

        var formEmail = $('#worm-section input[name=email]').val();
        var emailVal = validateEmail(formEmail);

        var valCount = [];

        var qpas = '{"QID1":"' + formEmail + '"}';

        if (emailVal === false || formEmail === '') {
            $('#worm-section input[name=email]').addClass('error');
            valCount.push(1);
        }



        if (valCount.length === 0) {

            var surl = "https://new.qualtrics.com/SE";


            $.ajax({
                url: surl,
                data: {
                    "Q_PostResponse": "true",
                    "SurveyID": "SV_260KzeOyKryEMcd",
                    "QR": qpas
                },
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonpcallback"
            });

            $('#worm-section .bug-input').hide();
            $('#worm-section .bug-thankyou').show();

        }

    });


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }



});
