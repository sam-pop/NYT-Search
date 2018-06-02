const API_KEY = "f551d639ab834af98e5a90d095b18886";
var numRecords;

function getSearchParam() {
    let $search = $('#searchTerm');
    return $search.val().trim();
}

function getNumArticles() {
    let $numArticles = $('#recordNum');
    return $numArticles.val().trim();
}

function showResults(res) {
    let $results = $('.results');
    $results.empty();

    for (var i = 0; i < getNumArticles(); i++) {

        var title = res.response.docs[i].headline.main;
        var snippet = res.response.docs[i].snippet;
        var urls = res.response.docs[i].web_url;

        $results.append($('<h3>').text(`${i+1}) ` + title));
        $results.append($('<p>').text("--" + snippet));
        $results.append($('<a>').attr('href', urls).text('Link'));
    }

}


function runApi() {
    apiParam = {
        'api-key': API_KEY,
        'q': getSearchParam()
    };

    var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param(apiParam);

    $.ajax({
        url: urlAPI,
        method: "GET",
        success: function (res) {
            showResults(res);
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