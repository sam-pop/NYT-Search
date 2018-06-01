var apiKey = "f551d639ab834af98e5a90d095b18886";
var searchParam = "google";
var numRecords;
var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchParam;



function getSearchParam() {
    searchParam = $('#exampleFormControlInput1').val();
}

function getRecordNum() {
    numRecords = $('exampleFormControlSelect1"').val();
}

function runApi() {
    $.ajax({
        url: urlAPI,
        method: "GET",
        success: function (res) {
            for (var i = 0; i < numRecords; i++) {
                var title = res.response.docs[i].headline.main;
                var snippet = res.response.docs[i].snippet;
            }
        },
        error: function () {
            console.log('API ERROR');
        }
    });
}

$(function () {

});