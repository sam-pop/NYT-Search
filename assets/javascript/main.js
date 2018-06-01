var apiKey = "f551d639ab834af98e5a90d095b18886";


function runApi() {
    $('.results').empty();
    var searchParam = $('#exampleFormControlInput1').val().trim();
    var numRecords = $('#exampleFormControlSelect1').val().trim();

    var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchParam;
    $.ajax({
        url: urlAPI,
        method: "GET",
        success: function (res) {

            for (var i = 0; i < numRecords; i++) {
                var title = res.response.docs[i].headline.main;
                var snippet = res.response.docs[i].snippet;
                var urls = res.response.docs[i].web_url;
                $('.results').append($('<div>').text(title));
                $('.results').append($('<div>').text("--" + snippet));
                $('.results').append($('<a>').attr('href', urls).text('Link'));
            }
        },
        error: function () {
            console.log('API ERROR');
        }
    });
}


$(function () {
    $('#searchBtn').click(function (e) {
        e.preventDefault();
        runApi();
    });
});