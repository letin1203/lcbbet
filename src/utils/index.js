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

export default {
  fetchUrl
};
