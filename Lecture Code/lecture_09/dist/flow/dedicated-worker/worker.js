//

importScripts("/lib/axios.min.js");

(() => {
  const sendRequest = axios.get(
    "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json"
  );

  const getData = sendRequest.then(x => x.data);

  onmessage = async function(event) {
    const resultList = await getData;
    const request = event.data;

    const lowerQuery = request.query.toLowerCase();

    const matches = resultList.filter(x => {
      if (x.email.toLowerCase().indexOf(lowerQuery) >= 0) return true;
      if (x.first_name.toLowerCase().indexOf(lowerQuery) >= 0) return true;
      if (x.last_name.toLowerCase().indexOf(lowerQuery) >= 0) return true;

      return false;
    });

    this.postMessage({ matches: matches });
  };
})();
