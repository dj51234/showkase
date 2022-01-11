// This is the scss entry file
import "../styles/index.scss";

// We can import Bootstrap JS instead of the CDN link, if you do not use
// Bootstrap, please feel free to remove it.
import "bootstrap/dist/js/bootstrap.bundle";

// We can import other JS file as we like
import "../components/sidebar";

const results = document.querySelector(".results");

window.document.addEventListener("DOMContentLoaded", function () {
  window.console.log("dom ready 1");
  // const div = document.createElement("div");
  // div.classList.add("result");
  // div.textContent = "this is name";
});

function createResults(source_url) {
  let result = document.createElement("div");
  let title = document.createElement("p");
  result.classList.add("result");
  title.classList.add("result-name");
  title.classList.add("text-sm");
  title.textContent = source_url;
  result.appendChild(title);
  results.insertAdjacentElement("afterbegin", result);
}

const key;
const value = "game of thrones";
const titleUrl = `https://api.watchmode.com/v1/search/?apiKey=${key}&search_field=name&search_value=${value}`;

axios({
  method: "get",
  url: titleUrl,
}).then((res) => {
  const titleId = res.data.title_results[0].id; // Gets id of searched title
  axios({
    method: "get",
    url: `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${key}`,
  }).then((res) => {
    const allDetails = res.data; // Most details about search result
    axios({
      method: "get",
      url: `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${key}&regions=US`,
    }).then((res) => {
      const sourceIds = []; // ids of sources linked to search result
      res.data.forEach((srcId) => {
        sourceIds.push({ id: srcId.source_id, url: srcId.web_url });
      });
      axios({
        method: "get",
        url: `https://api.watchmode.com/v1/sources/?apiKey=${key}`,
      }).then((res) => {
        const sourcesArray = []; // array of objects containing src logo, name and type
        sourceIds.forEach((id) => {
          const logoData = res.data;
          logoData.find((result) => {
            if (result.id === id.id) {
              sourcesArray.push({ srcInfo: result, webUrl: id.url });
            }
          });
          console.log(sourcesArray);
        });
      });
    });
  });
});
