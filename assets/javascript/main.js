var apiKey = "f551d639ab834af98e5a90d095b18886";


function runApi() {
    var searchParam = $('#exampleFormControlInput1').val();
    var numRecords = $('#exampleFormControlSelect1').val();

    var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchParam;
    $.ajax({
        url: urlAPI,
        method: "GET",
        success: function (res) {
            for (var i = 0; i < numRecords; i++) {
                var title = res.response.docs[i].headline.main;
                var snippet = res.response.docs[i].snippet;
                $('.results').append($('<div>').text(title));
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