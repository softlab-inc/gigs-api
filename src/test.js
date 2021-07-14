$(document).ready(function () {
    jQuery.validator.addMethod("lettersonly", function(value, element)
    {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
    }, "Letters and spaces only please");

    $("#diasporaleadform").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            fullname: {
                required: true,
                minlength: 2,
                lettersonly: true
            },
            curraddress: {
                required: true,
                minlength: 2,
                lettersonly: false
            },
            phone: {
                required: true,
                minlength: 10
            },
            email: {
                required: true,
                email: true
            },
            // loanproduct: {
            //     required: false,
            // },
            currency: {
                required: true,
    
            },
            laonamount: {
                required: true,
    
            },
            loanterm: {
                required: true,
    
            },
            collateral: {
                required: true,
    
            },
            message: {
                required: true,
                minlength: 10
            },
        },
        // Specify validation error messages
        messages: {
            fullname: {
                required: "Please enter your full name.",
                minlength: "Please enter at least two characters",
                lettersonly: "Only letters Allowed"
            },
            curraddress: {
                required: "Please enter your Current address.",
                minlength: "Please enter at least two characters",
                lettersonly: "Only letters Allowed"
            },
            phone: {
                required: "Please enter your phone number.",
                minlength: "Please enter at least ten characters"
            },
            email: "Please enter a valid email address.",
            // loanproduct: {
            //     required: "Please enter product.",
            //     minlength: "Please enter at least ten characters"
            // },  
            currency: {
                required: "Please select currency.",
                minlength: "Please select one option applicable"
            },
            laonamount: {
                required: "Please enter amount.",
                minlength: "Please enter at least ten characters"
            },
            loanterm: {
                required: "Please enter the loan term.",
                minlength: "Please enter at least ten characters"
            },
            collateral: {
                required: "Please enter your Collateral.",
                minlength: "Please enter at least ten characters"
            },
            message: {
                required: "Please type your query here.",
                minlength: "Please enter at least ten characters"
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            // Create an FormData object
            // var formData = new FormData(form);
            var data = {
                name: $('input[name=fullname]').val(),
                subject: "Equity Diaspora - Loan application Request",
                message: "\n" +
                    "<!doctype html>\n" +
                    "<html>\n" +
                    "\n" +
                    "<head>\n" +
                    "  <meta charset=\"UTF-8\">\n" +
                    "  <title>Equity Kenya - Get a call back </title>\n" +
                    "  <style type=\"text/css\">\n" +
                    "    body {\n" +
                    "      margin-left: 0px;\n" +
                    "      margin-top: 0px;\n" +
                    "      margin-right: 0px;\n" +
                    "      margin-bottom: 0px;\n" +
                    "      font-family: Calibri-Regular, Arial, sans-serif;\n" +
                    "      font-size: 15px;\n" +
                    "      color: #212529;\n" +
                    "      font-weight: normal;\n" +
                    "    }\n" +
                    "\n" +
                    "    a {\n" +
                    "      text-decoration: none;\n" +
                    "      color: #ffba00;\n" +
                    "    }\n" +
                    "\n" +
                    "    p {\n" +
                    "      padding: 0;\n" +
                    "      margin: 0;\n" +
                    "      font-family: calibri-Light, Arial, sans-serif;\n" +
                    "      line-height: 19px;\n" +
                    "      font-weight: normal;\n" +
                    "    }\n" +
                    "\n" +
                    "    h1 {\n" +
                    "      color: #82bc00;\n" +
                    "      font-size: 23px;\n" +
                    "      font-family: Calibri-Regular, Arial, sans-serif;\n" +
                    "      padding: 0px 0px 0px;\n" +
                    "      margin: 0;\n" +
                    "      font-weight: normal;\n" +
                    "      position: relative;\n" +
                    "    }\n" +
                    "\n" +
                    "    h1 span {\n" +
                    "      font-weight: bold;\n" +
                    "    }\n" +
                    "\n" +
                    "\n" +
                    "    h2 {\n" +
                    "      color: #02495d;\n" +
                    "      font-size: 18px;\n" +
                    "      font-family: Calibri-Regular, Arial, sans-serif;\n" +
                    "      padding: 0px 0px 12px;\n" +
                    "      margin: 0;\n" +
                    "      font-weight: bold;\n" +
                    "      text-transform: uppercase;\n" +
                    "      position: relative;\n" +
                    "    }\n" +
                    "  </style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body>\n" +
                    "  <table width=\"600\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "    <tbody>\n" +
                    "      <tr>\n" +
                    "        <td width=\"600\" height=\"63\" align=\"left\" valign=\"middle\" style=\"padding:10px 20px\"><a\n" +
                    "            href='#'><img width=\"80\"\n" +
                    "              src=\"https://equitygroupholdings.com/ke/templates/equity/assets/img/equity-bank-logo.png\"\n" +
                    "              alt=\"Logo\"></a></td>\n" +
                    "        <td width=\"429\" height=\"30\" align=\"left\" valign=\"middle\" bgcolor=\"#ffffff\"></td>\n" +
                    "      </tr>\n" +
                    "\n" +
                    "      <tr>\n" +
                    "        <td colspan=\"2\" align=\"left\" valign=\"top\" style=\"padding: 20px; background-color: #e0dddb;\">\n" +
                    "          <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "            <tbody>\n" +
                    "              <tr>\n" +
                    "                <td colspan=\"2\" align=\"left\" valign=\"top\">\n" +
                    "                  <h1\n" +
                    "                    style=\"color: #422a21;font-size: 16px;font-family: Calibri-Regular, Arial, sans-serif;font-weight: bold;\">\n" +
                    "                    Dear Team,</h1>\n" +
                    "                </td>\n" +
                    "              </tr>\n" +
                    "              <tr>\n" +
                    "                <td colspan=\"2\" align=\"left\" valign=\"top\" style=\"padding: 10px 0px 10px;\">\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Full Name: </strong>" + document.getElementById("fullname").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Product: </strong>Equity Kenya</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Current Address: </strong>" + document.getElementById("curraddress").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Phone: </strong>" + document.getElementById("phone").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Email: </strong>" + document.getElementById("email").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Currency: </strong>" + document.getElementById("currency").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Loan Product: </strong>" + $('.twoem').text() + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Loan Amount: </strong>" + document.getElementById("loanamount").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Loan Term: </strong>" + document.getElementById("loanterm").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Collateral: </strong>" + document.getElementById("collateral").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Income: </strong><br/> " + document.getElementById("income").value + "</p>\n" +
                    "                  <p style=\"font-family: calibri-Light, Arial, sans-serif; color: #212529;font-size: 16px;line-height: 28px;\"><strong>Message: </strong><br/> " + document.getElementById("message").value + "</p>\n" +
                    "                </td>\n" +
                    "              </tr>\n" +
                    "            </tbody>\n" +
                    "          </table>\n" +
                    "        </td>\n" +
                    "      </tr>\n" +
                    "\n" +
                    "      <tr bgcolor=\"#ffffff\">\n" +
                    "        <td width=\"600\" style=\"padding: 0 35px\">\n" +
                    "          <br />\n" +
                    "          <table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "            <tbody>\n" +
                    "              <tr>\n" +
                    "                <td>\n" +
                    "                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "                    <tbody>\n" +
                    "                      <tr>\n" +
                    "                        <td>\n" +
                    "                          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "                            <tbody>\n" +
                    "                            </tbody>\n" +
                    "                          </table>\n" +
                    "                          <br />\n" +
                    "                        </td>\n" +
                    "                      </tr>\n" +
                    "                      <tr>\n" +
                    "                        <td>\n" +
                    "                        </td>\n" +
                    "                      </tr>\n" +
                    "                    </tbody>\n" +
                    "                  </table>\n" +
                    "                </td>\n" +
                    "                <td>&nbsp;</td>\n" +
                    "                <td></td>" +
                    "              </tr>\n" +
                    "            </tbody>\n" +
                    "          </table>\n" +
                    "          <br /><br />\n" +
                    "        </td>\n" +
                    "      </tr>\n" +
                    "    </tbody>\n" +
                    "  </table>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>" +
                    "<html>",
                recipient: "ugandans.abroad@equitybank.co.ug ",
                addcc: "camilla.mindru@equitybank.co.ug,winfred.warui@equitybank.co.ug"
            };
    
            $('#diasporaleadform').html('Loading...<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            $.ajax({
                type: "POST",
                url: "https://equity-queries-support.azurewebsites.net/api/EquityQueriesSupport?code=O5qgQ4oI/baoiWYbYvX7pc9rjcbsk3jYD8iK7t1BuQ17ct6YJ45aZw==",
                data: JSON.stringify(data),
                processData: false,
                contentType: false,
                cache: false,
                timeout: 800000,
                success: function (data) {
                    console.log(data);
                    var message = "<div class=\"alert alert-success\" role=\"alert\">\n" +
                        "  <h4 class=\"alert-heading\">Success</h4>\n" +
                        "  <p>We acknowledge receipt of your details; kindly expect a response within the next 24 working hours.</p>\n" +
                        "  <hr>\n" +
                        "  <p class=\"mb-0\">Thank you for contacting Equity.</p>\n" +
                        "</div>";
    
                    $("#output").slideDown(2000);
    
    
                    $("#diasporaleadform").prop("disabled", false);
                    $('#diasporaleadform').html('Thank you for your request. Our team will attend to your request shortly.')
                    form.reset();
    
                    setTimeout(function () {
                        $("#output2").slideUp(2000);
                    }, 5000);
    
                },
                error: function (xhr, status, error) {
                    console.log('error ' + error);
                    console.log('status ' + status);
                    console.log(xhr);
                    var message = "<div class=\"alert alert-danger\" role=\"alert\">\n" +
                        "  <h4 class=\"alert-heading\">Error</h4>\n" +
                        "  <p>An Error occurred when submitting your get a call back request</p>\n" +
                        "</div>";
                    $("#output2").append(message);
    
                    $("#diasporaleadform").prop("disabled", false);
                }
            });
    
        }
    });

});