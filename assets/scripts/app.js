const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");

// this function will open and close modal
const toggleMovieModal = () =>{
addMovieModal.classList.toggle("visible");
}



startAddMovieButton.addEventListener("click", toggleMovieModal);