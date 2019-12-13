const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop")

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

// this function will open and close modal
const toggleMovieModal = () =>{
addMovieModal.classList.toggle("visible");
toggleBackdrop();
}



startAddMovieButton.addEventListener("click", toggleMovieModal);