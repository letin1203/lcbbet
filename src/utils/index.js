function fetchUrl(payload) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  fetch(proxyUrl + payload.url)
    .then(response => response.text())
    .then(contents => {
      if (payload.callback) {
        payload.callback(contents);
      }
    })
    .catch(() => {
      if (payload.error) {
        payload.error();
      }
    });
}

function getCreatedString(createdBy, createdAt) {
  return 'Created by ' + createdBy + ' on ' + new Date(createdAt);
}

function isBo2(bestOf) {
  return bestOf.includes("2");
}

function getDrawRate(rateRed, rateBlue) {
  return 100 - Number(rateRed) - Number(rateBlue);
}

export default {
  fetchUrl,
  getCreatedString,
  isBo2,
  getDrawRate
};
