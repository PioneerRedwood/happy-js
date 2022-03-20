const quotes = [
  {
    quote:
      "You are my melted gold. The sweet escape with a beautiful person ..",
    author: "Redwood(actually me! 😁)",
  },
  {
    quote: "A rose by any other name would smell as sweet.",
    author: "William Shakespeare",
  },
  {
    quote: "Ask, and it shall be given you; seek, and you shall find.",
    author: "the Bible",
  },
  {
    quote: "Elementary, my dear Watson.",
    author: "Sherlock Holmes (character)",
  },
  {
    quote:
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
  },
  {
    quote:
      "You can fool all of the people some of the time, and some of the people all of the time, but you can't fool all of the people all of the time.",
    author: "Abraham Lincoln",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
