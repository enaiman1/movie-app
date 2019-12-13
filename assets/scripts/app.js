const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop")
const cancelAddMovieButtom = addMovieModal.querySelector('.btn--passive');

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

// this function will open and close modal
const toggleMovieModal = () =>{
addMovieModal.classList.toggle("visible");
toggleBackdrop();
}

const cancelAddMovie = () => {
    toggleMovieModal();
}

// this function will toggle between a dark background when modal displays
const backdropClickHandler = () => {
    toggleMovieModal();
}

// event listener to display modal to add new movie
startAddMovieButton.addEventListener("click", toggleMovieModal);

// allows you to click on background to make modal disapper
backdrop.addEventListener("click", toggleMovieModal)

//allows the cancle button to make modal disapper
cancelAddMovieButtom.addEventListener("click", cancelAddMovie)
