let slideIndex = 1; // Initialize slideIndex to 1
let timeout;

showSlides(slideIndex); // Pass the initial slideIndex

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  // If n is greater than the number of slides, reset it to 1
  if (n > slides.length) {
    slideIndex = 1;
  }

  // If n is less than 1, set it to the number of slides
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Display the current slide
  slides[slideIndex - 1].style.display = "block";

  // Clear previous timeout to prevent multiple timeouts running simultaneously
  clearTimeout(timeout);

  // Set timeout for the next slide change
  timeout = setTimeout(() => showSlides(slideIndex += 1), 14000); // Change image every 14 seconds
}

function plusSlides(n) {
  clearTimeout(timeout); // Clear timeout when manually navigating through slides
  showSlides(slideIndex += n); // Adjust slideIndex by n and show the slide
}