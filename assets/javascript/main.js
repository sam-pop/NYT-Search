const API_KEY = "f551d639ab834af98e5a90d095b18886"; // NYT api key
var numRecords; // number of records to show

// get the search parameter from the user input field
function getSearchParam() {
    let $search = $('#searchTerm');
    return $search.val().trim();
}
// get the number of articles to show from the drop down field
function getNumArticles() {
    let $numArticles = $('#recordNum');
    return $numArticles.val().trim();
}

// populates the page with the generated results
function showResults(res) {
    clearResults();
    let $results = $('.results');

    for (let i = 0; i < getNumArticles(); i++) {
        let title = res.response.docs[i].headline.main;
        let snippet = res.response.docs[i].snippet;
        let link = res.response.docs[i].web_url;

        let $article = $('<div>').addClass('card').append('<div>').addClass('card-body');
        $article.append($('<h3>').addClass('card-title').text(`${i+1}. ` + title));
        $article.append($('<p>').addClass('card-text').text(snippet));
        $article.append($('<a>').attr({
            'href': link,
            'target': '_blank'
        }).append($('<button>').addClass('btn').text('Show Article')));
        $results.append($article);
    }
}

// clear the results from the page
function clearResults() {
    let $results = $('.results');
    $results.empty();
}

// fetch query results from the NYT API
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

// DOCUMENT READY
$(function () {
    $('form').submit(function (e) {
        e.preventDefault();
    });
    $('#searchBtn').click(function (e) {
        e.preventDefault();
        runApi();
    });
    $('#clearBtn').click(function (e) {
        e.preventDefault();
        clearResults();
    });
});