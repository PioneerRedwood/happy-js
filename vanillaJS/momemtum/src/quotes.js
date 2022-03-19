const quotes = [
  {
    quote:
      "You are my melted gold. The sweet escape with a beautiful person ..",
    author: "Redwood and Jimmy",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
