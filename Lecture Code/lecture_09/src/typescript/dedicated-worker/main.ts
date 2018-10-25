/// <reference path ="../../../node_modules/@types/jquery/index.d.ts"/>
interface IPerson {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

interface IResponseMessageData {
  matches: Array<IPerson>;
}

(() => {
  const searchForm = $("#search-form");
  const searchQuery = $("#search-query");
  const answerList = $("#answer-list");

  const dedicatedWorker = new Worker("/assets/flow/dedicated-worker/worker.js");

  searchForm.on("submit", function(e) {
    e.preventDefault();

    const query = searchQuery.val();
    if (!query) return;

    dedicatedWorker.postMessage({ query: query });
  });

  dedicatedWorker.onmessage = message => {
    const results: IResponseMessageData = message.data;

    const newListItems = results.matches
      .map(
        person =>
          `<li>${person.first_name} ${person.last_name}; ${person.email}</li>`
      )
      .join("");
    const newListElements = $(newListItems);
    answerList.empty();
    answerList.append(newListElements);
  };
})();
