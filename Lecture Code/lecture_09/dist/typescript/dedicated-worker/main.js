/// <reference path ="../../../node_modules/@types/jquery/index.d.ts"/>
(function() {
  var searchForm = $("#search-form");
  var searchQuery = $("#search-query");
  var answerList = $("#answer-list");
  var dedicatedWorker = new Worker("/assets/flow/dedicated-worker/worker.js");
  searchForm.on("submit", function(e) {
    e.preventDefault();
    var query = searchQuery.val();
    if (!query) return;
    dedicatedWorker.postMessage({ query: query });
  });
  dedicatedWorker.onmessage = function(message) {
    var results = message.data;
    var newListItems = results.matches
      .map(function(person) {
        return (
          "<li>" +
          person.first_name +
          " " +
          person.last_name +
          "; " +
          person.email +
          "</li>"
        );
      })
      .join("");
    var newListElements = $(newListItems);
    answerList.empty();
    answerList.append(newListElements);
  };
})();
//# sourceMappingURL=main.js.map
