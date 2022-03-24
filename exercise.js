/*const cardsContainer = document.querySelector("[data-js=cards]");
const form = document.querySelector("[data-js=form]");
const filterForm = document.querySelector("[data-js=filter-form]");

let currentFilter = "all";
let cards = [
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

filterForm.addEventListener("change", () => {
  currentFilter = filterForm.elements["tag-filter"].value;
  renderCards();
});

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
      <p>${card.answer}</p>
      <ul role="list" class="card__tag-list">
        ${card.tags.map((tag) => `<li class="card__tag">${tag}</li>`).join("")}
      </ul>
    `;
      cardsContainer.append(cardElement);
    });
}*/


const form = document.querySelector('[data-js=form]'); 

let cards = JSON.parse(localStorage.getItem('allCards')) || [];
const deleteButton = document.querySelector('.delete-btn');


deleteButton.addEventListener('click', () => {
  localStorage.setItem('allCards', '');
  cards = [];
  cardsContainer.innerHTML = '';
})


form.addEventListener('submit', event => {
  event.preventDefault();
  
  const questionElement = form.elements.question;
  const answerElement = form.elements.answer;
  const tagsElement = form.elements.tags;
  
  const newCard = {
    question: questionElement.value,
    answer: answerElement.value,
    tags: tagsElement.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length)
  };
  
  cards = [newCard, ...cards];
  const stringifyCards = JSON.stringify(cards)
  localStorage.setItem('allCards', stringifyCards)
  renderCards();
  
  form.reset();
  questionElement.focus();
})

// function renderCards() {
//   cardsContainer.innerHTML = '';
//   alert('function1')
//   cards.forEach(card => {
//     const cardElement = document.createElement('li')
//     cardElement.className = 'card';
//     cardElement.innerHTML = `
//       <p>${card.question}</p>
//       <p>${card.answer}</p>
//       <ul role="list" class="card__tag-list">
//         ${card.tags.map(tag => `<li class="card__tag">${tag}</li>`).join('')}
//       </ul>
//     `;
//     cardsContainer.append(cardElement);
//   })
// }


let currentFilter = 'all';


const tagsWithDuplicates = cards.flatMap(card => card.tags);
const uniqueTags = new Set(tagsWithDuplicates); // uniqueTags is a Set
const sortedTags = [...uniqueTags].sort(); // make an array from uniqueTags, then sort it
const filterForm = document.querySelector('[data-js=filter-form]');
const tagFieldset = filterForm.querySelector('fieldset')
const cardsContainer = document.querySelector('[data-js=cards]');



['all', ...sortedTags].forEach( (tag, index) => {
  const inputElement = document.createElement('input');
  inputElement.name = 'tag-filter';
  inputElement.type = 'radio';
  inputElement.value = tag;
  inputElement.style.marginRight = '2px';
  inputElement.id = 'tag-' + tag;
  inputElement.checked = index === 0;
  
  const labelElement = document.createElement('label');
  labelElement.htmlFor = 'tag-' + tag;
  labelElement.style.marginRight = '4px';
  labelElement.append(inputElement);
  labelElement.append(tag);
  
  tagFieldset.append(labelElement);
})


filterForm.addEventListener('change', () => {
  currentFilter = filterForm.elements['tag-filter'].value;
  renderCards();
})

renderCards();

function renderCards() {
  cardsContainer.innerHTML = '';
  //alert('function2')
  //console.log(cardsContainer.innerHTML)
  cards
    .filter(card => card.tags.includes(currentFilter) || currentFilter === 'all')
    .forEach(card => {
      const cardElement = document.createElement('li')
      cardElement.className = 'card';
      cardElement.innerHTML = `
        <p>${card.question}</p>
        <button data-js="card-button">Toggle answer</button>
        <button 
        class="card__bookmark${card.isBookmarked ? ' card__bookmark--active' : ''}" 
        data-js="bookmark">
      </button>
      <p data-js="answer" hidden>${card.answer}</p>
      <ul role="list" class="card__tag-list">
          ${card.tags.map(tag => `<li class="card__tag">${tag}</li>`).join('')}
        </ul>
      `;
      cardsContainer.append(cardElement);
    const answerButton = cardElement.querySelector('[data-js=card-button]');
    const answerElement = cardElement.querySelector('[data-js=answer]');
    
    answerButton.addEventListener('click', () => {
      answerElement.toggleAttribute('hidden');
      })
      const bookmarkElement = cardElement.querySelector('[data-js=bookmark]');
    bookmarkElement.addEventListener('click', () => {
      card.isBookmarked = !card.isBookmarked;
      bookmarkElement.classList.toggle('card__bookmark--active');
  })
      
})
  }
