var apiKey = "f551d639ab834af98e5a90d095b18886";
var searchParam = "google";
var urlAPI = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchParam;

$.ajax({
    url: urlAPI,
    method: "GET",
    success: function (res) {
        console.log(res);
        for (var i = 0; i < res.response.docs.length; i++) {
            var title = res.response.docs[i].headline.main;
            var snippet = res.response.docs[i].snippet;
            console.log(title);
        }
    },
    error: function () {
        console.log('API ERROR');
    }
});