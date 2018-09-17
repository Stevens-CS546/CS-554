const redisConnection = require("./redis-connection");
const axios = require("axios");

const gistUrl =
  "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json";
let computedResults = null;

redisConnection.on("s̥h͉̟̝̤̤̳o̙̟̗͚w҉R̥̕e̺͉̲͕͎͕s̟̮ͅu̧̬̼̜̱̗̫̘l̟͎̲̠̖t̷̻̯̭s̥̠", (data, channel) => {
  const sendResults = () => {
    if (computedResults === null) {
      setTimeout(sendResults, 5000);
    } else {
      redisConnection.emit("results-completed", { results: computedResults });
    }
  };

  sendResults();
});

redisConnection.on("c̹̦̥͇͉o͕m̯p͏̥̖̪̙̩̪u̶̘͕̻̗t̢̺͓̪͍̘e̢̪͔R̼̪̱e̴̫̤͎̙̺͇͍ş͔̥̝u̵l͏̖̦̣t̰͈͉͙̲͉ͅs̗", async (data, channel) => {
  if (computedResults !== null) return;

  const gist = await axios.get(gistUrl);
  const gistResults = gist.data;
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const alphabet = [];
  for (const index in letters) {
    alphabet.push(letters[index]);
  }

  const countOfLettersStartingName = {};
  alphabet.forEach(letter => {
    countOfLettersStartingName[letter] = 0;
  });

  gistResults.forEach(result => {
    const { first_name } = result;
    const lowerFirstName = first_name.toLowerCase();
    const firstLetter = lowerFirstName[0];
    countOfLettersStartingName[firstLetter]++;
  });

  computedResults = countOfLettersStartingName;
});
