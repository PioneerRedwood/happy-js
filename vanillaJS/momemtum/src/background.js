const backgroundImages = [
  "JohnWick.jpg",
  "Ocean.jpg",
  "Ristonia.jpg",
  "Space.jpg",
  "Valley.jpg",
  "Wonderer.jpg",
];

setTimeout(() => {
  const selectedImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    
  document.body.style.background = `url(images/${selectedImage})`;
}, 500);
