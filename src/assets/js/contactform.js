class FormValidator {
    selector: JQuery;
    constructor(selector) {
        this.Validate(selector);
    }
    Validate(selector) {
        this.LengthValidate(5);
        // this.TextareaValidate();
        this.SendValues()
    }

    LengthValidate(min: number, max?: number) {
        $("input, textarea").on('keyup', (event: JqueryEventObject) => {
            var target: Jquery = $(event.target);
            var value = target.val();
            if (value.length < min) {
                target.addClass("error");
            }
            else {
                target.removeClass("error");
            }
        });
    }
    TextareaValidate() {
        var selector: string = $("textarea");
        $("textarea").on('blur', (event: JqueryEventObject) => {
            var target: Jquery = $(event.target);
            var value = target.val();
            if (value) {
                target.addClass('error');
            }
            else {
                target.removeClass();
            }
        });
    }
    SendValues() {
        $(".send").click((event: JqueryEventObject) => {
            var errorsClass = $('form').find('.error').length;
            var EmptyInputs = $("input, textarea");
            var errors = [];
            EmptyInputs.each((index: number, elem: any) => {
                var target = $(elem);
                if (target.val().length <= 0) {
                    errors.push(target);
                    target.addClass("error");
                }
            });
            if (!errorsClass && errors.length == 0) {
              var url = "";
              var data = [];
                  
                  $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    beforeSend: ()=> {
                      $(".send").text("Sending...");
                    },
                      success: ()=>{
                       setTimeout(()=>{
                         alert("Form Sent");
                       $(".send").text("Form Sent");
                    },10000);
                     
                    }
                  })
            }
            else {
                alert("Fields contain errors");
                event.preventDefault();
            }
        });
    }
}

new FormValidator();