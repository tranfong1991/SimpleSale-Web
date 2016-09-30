var PAYMENT_URL = "https://venmo.com/?txn=pay"
var BITLY_ACCESS_TOKEN = "fd46ad5065c863be75ca5b6c83297ca228cc7657";
var BITLY_API_URL = "https://api-ssl.bitly.com/v3/shorten?format=txt&access_token=" + BITLY_ACCESS_TOKEN + "&longurl=";
var QR_CODE_API_URL = "http://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";

function construct_payment_link(recipient, description, price, audience){
    var result = "";
    
    result = result.concat("&recipients=");
    result = result.concat(recipient);
    result = result.concat("&amount=");
    result = result.concat(price);
    result = result.concat("&note=");
    result = result.concat(encodeURI(description));
    result = result.concat("&audience=");
    result = result.concat(audience.toLowerCase());
    
    return result;
}

function retrieve_info(recipient, description, price, audience){
    var payment_link = construct_payment_link(recipient, description, price, audience);
    var encoded_payment_link = encodeURIComponent(PAYMENT_URL + payment_link);

    $.get(BITLY_API_URL + encoded_payment_link, function(data){
        $("#url").text(data);
        $("#url").attr("href", data);
        $("#qr-code").attr('src', QR_CODE_API_URL + encodeURIComponent(data));
    });
}

$(document).ready(function(){
    $("#print").on('click', function(){
        window.print();
    });

    $("#back").on('click', function(){
        window.history.back();
    });

    retrieve_info(venmo_username, item_description, item_price, audience);
});