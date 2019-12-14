const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}
// what is shown to the user depending on if there are movies saved or not
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
}
// this function will delete the movie by id
const deleteMovieHandler = movieId => {
    let movieIndex = 0
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
}


// this on click event will confirm the deletion in the modal
const startDeletionHandler = movieId => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    // cancle button
    const cancelBtn = deleteMovieModal.querySelector(".btn--passive");
    // yes button
    let confirmBtn = deleteMovieModal.querySelector(".btn--danger");

    // replace confirm btn and clones a new object so all previous listeners can be deleted
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    // get access back to the yes button
    confirmBtn = deleteMovieModal.querySelector(".btn--danger");

    cancelBtn.removeEventListener("click", closeMovieDeletionModal);
    // event listener for cancel button
    cancelBtn.addEventListener("click", closeMovieDeletionModal);
    // event lister for the dyes button
    confirmBtn.addEventListener("click", deleteMovieHandler.bind(null, movieId));


};

// Once user click submit this function renders the user input on to the page
const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
 <div class="movie-element__image">
 <img src="${imageUrl}" alt="${title}">
 </div>
 <div class="movie-element__info">
<h2>${title}</h2>
<p>${rating}/ 5 stars</p>
</div>

 `;
    newMovieElement.addEventListener("click", startDeletionHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
}


// this function will make the modal go away
const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}
// this function will make the user input modal appear
const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
}

//this function clear user input in the modal
const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = "";
    }
}

// allows use to use the cancle button
const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

// takes in user input and save it in an array
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
        alert("please enter valid values (rating between 1 and 5");
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

// this function will toggle between a dark background when modal displays
const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
}

// event listener to display modal to add new movie
startAddMovieButton.addEventListener("click", showMovieModal);

// allows you to click on background to make modal disappear
backdrop.addEventListener("click", backdropClickHandler);

//allows the cancle button to make modal disapper
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);

//allow the confirm button to take input and make modal disappear
confirmAddMovieButton.addEventListener("click", addMovieHandler);
