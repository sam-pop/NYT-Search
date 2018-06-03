const API_KEY = "f551d639ab834af98e5a90d095b18886"; // NYT api key
var numRecords; // number of records to show
var thisYear = new Date().getFullYear(); // get this year

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

// returns the start year field 
function getStartYear() {
    let $startYear = $('#startYear').val().trim();
    if ((parseInt($startYear)) && ($startYear <= thisYear)) {
        return $startYear;
    }
}

// returns the end year field 
function getEndYear() {
    let $endYear = $('#endYear').val().trim();
    if ((parseInt($endYear)) && ($endYear <= thisYear)) {
        return $endYear;
    }
}

// populates the page with the generated results
function showResults(res) {
    $('.topArticles').show();
    let $results = $('.results');

    for (let i = 0; i < getNumArticles(); i++) {
        let title = res.response.docs[i].headline.main;
        let snippet = res.response.docs[i].snippet;
        let link = res.response.docs[i].web_url;

        let $article = $('<div>').addClass('card');
        let $articleBody = $('<div>').addClass('card-body');
        let $articleLink = $('<a>').attr({
            'href': link,
            'target': '_blank'
        });

        $articleLink.append($('<h3>').addClass('card-title').text(`${i+1}. ` + title));
        $articleLink.append($('<p>').addClass('card-text').text(snippet));
        // $articleBody.append($('<a>').attr({
        //     'href': link,
        //     'target': '_blank'
        // }).append($('<button>').addClass('btn').text('Show Article')));
        $article.append($articleBody.append($articleLink));
        $results.append($article);
    }
}

// clear the results from the page
function clearResults() {
    let $results = $('.results');
    $results.empty();
    $('.topArticles').hide();

}

// fetch query results from the NYT API
function runApi() {
    apiParam = {
        'api-key': API_KEY,
        'q': getSearchParam()
    };
    //checks that the years are correct
    if ((getStartYear() !== getEndYear()) && (getStartYear() < getEndYear())) {
        apiParam.begin_date = getStartYear() + '0101';
        apiParam.end_date = getEndYear() + '0101';
    }

    var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param(apiParam);
    $.ajax({
        url: urlAPI,
        method: "GET",
        success: function (res) {
            clearResults();
            showResults(res);
        },
        error: function () {
            console.log('API ERROR');
        }
    });
}

// DOCUMENT READY
$(function () {
    clearResults();
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