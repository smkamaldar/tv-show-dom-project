//You can edit ALL of the code here
const searchBox = document.getElementById("search");
let allEpisodes = null;

// runs once,only when page loads.
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // for first time we havent searched anything,so it means
  // we can pass allEpisodes array as a search result.(73/73)
  displayCount(allEpisodes);
}

// for search
// first I need to create input search in my html
// then I need a refrence to it
// so whenever I type in input box,I need to listen to it
// then filter the list with the value of the input against name OR summary fields
// then call makePageForEpisodes function with filtered array
// The display should update immediately after each keystroke changes the input.using keyup
searchBox.addEventListener("keyup", (e) => {
  let searchPhrase = e.target.value;
  let searchResult = search(searchPhrase, allEpisodes);
  makePageForEpisodes(searchResult);
  displayCount(searchResult);
});

function search(phrase, episodes) {
  const filteredEpisodes = episodes.filter((episode) => {
    return episode.name.includes(phrase) || episode.summary.includes(phrase);
  });
  return filteredEpisodes;
}

// this function calculate length of both searched and allEpisodes arrays.
// and display them on the screen.
function displayCount(searchedEpisodes) {
  const displayCountEl = document.getElementById("result-count");
  const totalEpisodesLength = allEpisodes.length;
  const searchedEpisodesLength = searchedEpisodes.length;
  displayCountEl.innerText = `Displaying ${searchedEpisodesLength}/${totalEpisodesLength} episodes`;
}

function createEpisodeCard(episode) {
  const li = document.createElement("li");
  const cardTitleWrapper = document.createElement("div");
  const episodeTitle = document.createElement("p");
  const image = document.createElement("img");
  const description = document.createElement("p");

  li.setAttribute("class", "card");
  cardTitleWrapper.setAttribute("class", "card-title-wrapper");

  episodeTitle.setAttribute("class", "episode-title");
  let season = episode.season;
  let number = episode.number;
  let title = episode.name;
  title += season < 10 ? `-S0${season}` : `-S${season}`;
  title += number < 10 ? `E0${number}` : `E${number}`;
  episodeTitle.innerText = title;

  image.setAttribute("class", "card-img");
  image.setAttribute("src", episode.image.medium);
  description.setAttribute("class", "card-desc");
  description.innerHTML = episode.summary;

  li.appendChild(cardTitleWrapper);
  cardTitleWrapper.appendChild(episodeTitle);
  li.appendChild(image);
  li.appendChild(description);
  return li;
}

// to clear all cards from the DOM. inorder to add new cards.
// this function need to be called inside  makePageForEpisodes function
function clearCards(ul) {
  ul.innerHTML = "";
}

function makePageForEpisodes(episodeList) {
  const ul = document.getElementById("cards");
  clearCards(ul);
  episodeList.forEach((episode) => {
    const li = createEpisodeCard(episode);
    ul.appendChild(li);
  });
}

window.onload = setup;
