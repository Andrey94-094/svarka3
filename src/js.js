$(document).ready(function() {

    // Form submit
    $("form").submit(function (event) {
        event.preventDefault();

        if(typeof sessionStorage !== 'undefined'){
            if(sessionStorage.getItem('formSubmitted')){
                if(!confirm('Вы уже отправили заявку, повторить?')){return false}
            }else{
                sessionStorage.setItem('formSubmitted', 'true')
            }
        }

        var data = $(this).serializeArray();
        data.push({
            name: "source",
            value: "Kslby"
        });
        data.push({
            name: "title",
            value: "Сварка"
        });
        data.push({
            name: "link",
            value: location.href
        });

        // console.log(JSON.stringify(data));
        // return false; // Testing

        $.ajax({
            type: "POST",
            url: atob("aHR0cHM6Ly9za2lka2EtdHV0LmJ5L2FjdGlvbi9pbmRleC5waHA="),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            dataType: "json",
            data: data
        }).done(function (response) {
            alert(response.text);
        }).fail(function (error, textStatus) {
            console.log(error, textStatus);
            alert('Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!');
        });

        // Event dispatcher for IE9+ included
        if(typeof(Event) === 'function') {
            document.dispatchEvent(new Event('app.form.send'));
        }else{
            var ev = document.createEvent('Event');
            ev.initEvent('app.form.send', false, false);
            document.dispatchEvent(ev);
        }

        //console.log(JSON.stringify(data))
        return false
    });

    $('body').mouseleave(function (event) {
        if (typeof sessionStorage !== 'undefined') {
            if (!sessionStorage.getItem('modalLeaveShowed') && event.clientY < -12) {
                sessionStorage.setItem('modalLeaveShowed', 'true');
                $('#modal-leave').modal('show');
            }
        }
    });

    // Smooth scroll
    $(".smoothscroll").click(function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 400);
        } // End if
    })

});

document.addEventListener('DOMContentLoaded', function(){

    try{
        /* countdown */
        let dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDay() ? dateEnd.getDate() - dateEnd.getDay() + 8 : dateEnd.getDate() + 1);
        dateEnd.setHours(0, 0, 0);
        let countdown = new LightCountdown('.countdown-week', dateEnd, {animation: "animated flipInX", animationDuration: "600ms"});
    }catch(e){console.error(e);}

    try{
        const itemArr = Array.from(
            document.querySelectorAll(".section-steps__item_text")
        );
        function showArticle(num) {
            let text = itemArr[num - 1];
            if (text.style.display === "none") {
                text.style.display = "block";
            } else {
                text.style.display = "none";
            }
        }
    }catch(e){console.error(e);}

});
