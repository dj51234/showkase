// This is the scss entry file
import "../styles/index.scss";

// We can import Bootstrap JS instead of the CDN link, if you do not use
// Bootstrap, please feel free to remove it.
import "bootstrap/dist/js/bootstrap.bundle";

// We can import other JS file as we like
import "../components/sidebar";

const results = document.querySelector(".results");
const searchValue = document.querySelector("#search");
const startSearch = document.querySelector("#start-search");
const searching = document.querySelector(".searching");
const detailsDiv = document.querySelector(".results-info");
const detailsTitle = document.querySelector(".results-info__title");
const detailsOverview = document.querySelector(".results-info__overview");
const criticScore = document.querySelector(".results-info__scores--critic");
const userScore = document.querySelector(".results-info__scores--user");

window.document.addEventListener("DOMContentLoaded", function () {
  window.console.log("dom ready 1");
});

function createResults(details) {
  detailsTitle.innerHTML = `${details[0].title} <span>(${details[0].year})</span>`;
  detailsOverview.textContent = details[0].plot_overview;

  // remove any previous classes

  criticScore.classList.remove(...criticScore.classList);
  userScore.classList.remove(...userScore.classList);

  // add color class based on scores

  details[0].critic_score >= 75
    ? criticScore.classList.add("great")
    : details[0].critic_score <= 65
    ? criticScore.classList.add("bad")
    : details[0].critic_score >= 65 && details[0].critic_score <= 75
    ? criticScore.classList.add("maybe")
    : criticScore.classList.remove(...criticScore.classList);

  details[0].user_rating >= 7.5
    ? userScore.classList.add("great")
    : details[0].user_rating <= 5.5
    ? userScore.classList.add("bad")
    : details[0].user_rating > 5.5 && details[0].user_rating < 7.5
    ? userScore.classList.add("maybe")
    : userScore.classList.remove(...userScore.classList);

  criticScore.innerHTML = details[0].critic_score
    ? `<span>Critic Score:</span> ${details[0].critic_score}`
    : `<span>Critic Score:</span> N/A`;

  userScore.innerHTML = details[0].user_rating
    ? `<span>User Score:</span> ${details[0].user_rating}`
    : `<span>Critic Score:</span> N/A`;

  // if title found, map sources in results div

  if (details) {
    details = details
      .map((result) => {
        return `
      <div class='result'>
      <p class='text-sm result-name'>${result.src}</p>
        <a target="_blank" href="${result.webUrl}"><img width="50px" src='${result.logo}'/></a>
      </div>
    `;
      })
      .forEach(
        (result) => results && results.insertAdjacentHTML("beforeend", result)
      );
  } else {
    detailsDiv.innerHTML = "";
  }
}

function getResults(e) {
  results.textContent = "No results found";
  e.preventDefault();
  const key = "ke3GLW2X1ap3hK4QOB3Lu2kIm32DZBBG2MMlznaF";
  const value = searchValue.value;
  const titleUrl = `https://api.watchmode.com/v1/search/?apiKey=${key}&search_field=name&search_value=${value}`;

  searching.innerHTML = `Showing results for <span>${value}</span>:`;

  axios({
    method: "get",
    url: titleUrl,
  }).then((res) => {
    const titleId = res.data.title_results[0].id; // Gets id of searched title

    axios({
      method: "get",
      url: `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${key}`,
    }).then((res) => {
      const allDetails = res.data; // Get details about search result from title id in previous fetch

      axios(
        {
          method: "get",
          url: `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${key}&regions=US`,
        },
        allDetails
      ).then((res) => {
        const sourceIds = []; // ids of sources linked to search result
        res.data.forEach((srcId) => {
          sourceIds.push({ id: srcId.source_id, url: srcId.web_url });
        });
        axios(
          {
            method: "get",
            url: `https://api.watchmode.com/v1/sources/?apiKey=${key}`,
          },
          allDetails
        ).then((res) => {
          const finalDetails = []; // array of objects containing src logo, name and type, overview, scores, sources
          sourceIds.forEach((id) => {
            const logoData = res.data;
            const { title, plot_overview, critic_score, user_rating, year } =
              allDetails;

            logoData.find((result) => {
              if (result.id === id.id) {
                finalDetails.push({
                  logo: result.logo_100px,
                  src: result.name,
                  webUrl: id.url,
                  title,
                  plot_overview,
                  critic_score,
                  user_rating,
                  year,
                });
              }
            });
          }, finalDetails);

          const uniqueValues = new Set();

          const newFinalDetails = finalDetails.filter((item) => {
            const isAnItem = uniqueValues.has(item.src);
            uniqueValues.add(item.src);
            return !isAnItem;
          });
          newFinalDetails && (results.textContent = null);
          createResults(newFinalDetails);
        });
      });
    });
  });
}

startSearch.addEventListener("click", (e) => {
  getResults(e);
});

searchValue.addEventListener("keypress", (e) => {
  e.key === "Enter" && getResults(e);
});

// final object per result:

// {
//   "logo": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png",
//   "src": "Google Play",
//   "webUrl": "https://play.google.com/store/tv/show?amp=&amp=&cdid=tvseason-0uaIRlgLkL4&gdid=tvepisode-vxByZAPvRJA&gl=US&hl=en&id=71Edzxe9gmo",
//   "title": "Game of Thrones",
//   "plot_overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
//   "critic_score": 85,
//   "user_rating": 8.7,
//   "year": 2011
// }
