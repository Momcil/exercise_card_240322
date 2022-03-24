//------fromForm.js--------------------------------------------
const cardsContainer = document.querySelector("[data-js=cards]");
const form = document.querySelector("[data-js=form]");

let cards = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const questionElement = form.elements.question;
  const answerElement = form.elements.answer;
  const tagsElement = form.elements.tags;

  const newCard = {
    question: questionElement.value,
    answer: answerElement.value,
    tags: tagsElement.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length),
  };

  cards = [newCard, ...cards];
  renderCards();

  form.reset();
  questionElement.focus();
});

function renderCards() {
  cardsContainer.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("li");
    cardElement.className = "card";
    cardElement.innerHTML = `
      <p>${card.question}</p>
      <p>${card.answer}</p>
      <ul role="list" class="card__tag-list">
        ${card.tags.map((tag) => `<li class="card__tag">${tag}</li>`).join("")}
      </ul>
    `;
    cardsContainer.append(cardElement);
  });
}
//------fromForm.js-finish--------------------------------------------
//------filterByTag.js------------------------------------------------
console.clear();

const filterForm = document.querySelector("[data-js=filter-form]");
const cardsContainer = document.querySelector("[data-js=cards]");

let currentFilter = "all";

const cards = [
  {
    question: "What is HTML?",
    tags: ["html", "basic", "web"],
  },
  {
    question: "What is CSS?",
    tags: ["css", "basic", "web"],
  },
  {
    question: "What is Git?",
    tags: ["git", "shell"],
  },
];

filterForm.addEventListener("change", () => {
  currentFilter = filterForm.elements["tag-filter"].value;
  renderCards();
});

renderCards();

function renderCards() {
  cardsContainer.innerHTML = "";

  cards
    .filter(
      (card) => card.tags.includes(currentFilter) || currentFilter === "all"
    )
    .forEach((card) => {
      const cardElement = document.createElement("li");
      cardElement.className = "card";
      cardElement.innerHTML = `
        <p>${card.question}</p>
        <ul role="list" class="card__tag-list">
          ${card.tags
            .map((tag) => `<li class="card__tag">${tag}</li>`)
            .join("")}
        </ul>
      `;
      cardsContainer.append(cardElement);
    });
}
