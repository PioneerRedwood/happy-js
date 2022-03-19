const backgroundImages = ["black.jpg", "ocean.jpg", "Ristonia.jpg", "valley.jpg"];
const selectedImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
const background = document.createElement("img");

background.src = `images/${selectedImage}`;

document.body.appendChild(background);
