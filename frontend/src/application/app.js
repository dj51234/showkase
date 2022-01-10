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

let div = document.createElement("div");
div.classList.add("result");
let p = document.createElement("p");
p.classList.add("result-name");
p.classList.add("text-sm");
p.textContent = "The name";
div.appendChild(p);
results.insertAdjacentElement("afterbegin", div);
