// @flow
import type axios from "../../../flow-typed/npm/axios_vx.x.x";
type PersonEntry = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  ip_address: string
};

type AxiosRequest<T> = {
  data: T
};

type SearchRequest = {
  query: string
};

importScripts("/lib/axios.min.js");

(() => {
  const sendRequest: Promise<AxiosRequest<PersonEntry[]>> = axios.get(
    "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json"
  );

  const getData = sendRequest.then(x => x.data);

  onmessage = async function(event) {
    const resultList = await getData;
    const request: SearchRequest = event.data;

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
