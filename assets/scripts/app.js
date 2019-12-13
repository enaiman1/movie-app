const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop")
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input')

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

// this function will open and close modal
const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
}

const cancelAddMovieHandler = () => {
    toggleMovieModal();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ) {
            alert("please enter valid values (rating between 1 and 5")
    }
}

// this function will toggle between a dark background when modal displays
const backdropClickHandler = () => {
    toggleMovieModal();
}

// event listener to display modal to add new movie
startAddMovieButton.addEventListener("click", toggleMovieModal);

// allows you to click on background to make modal disappear
backdrop.addEventListener("click", backdropClickHandler)

//allows the cancle button to make modal disapper
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler)

//allow the confirm button to take input and make modal disappear
confirmAddMovieButton.addEventListener("click", addMovieHandler);
