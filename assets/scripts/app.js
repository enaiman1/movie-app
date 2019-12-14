const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];

// what is shown to the user depending on if there are movies saved or not
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
}

const deleteMovie = movieId => {
    let movieIndex = 0
    for(const movie of movies){
    if ( movie.id === movieId){
        break;
    }
    movieIndex++;
}
movies.splice(movieIndex, 1);
const listRoot = document.getElementById("movie-list");
listRoot.children[movieIndex].remove()
}

const closeMovieDeletionModal = () => {
    toggleBackdrop()
    deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = movieId => {
deleteMovieModal.classList.add('visible');
toggleBackdrop()
    // deleteMovie(movieId)
};

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
    newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id ));
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
}

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible')
}

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
   closeMovieModal()
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
}

// event listener to display modal to add new movie
startAddMovieButton.addEventListener("click", showMovieModal);

// allows you to click on background to make modal disappear
backdrop.addEventListener("click", backdropClickHandler);

//allows the cancle button to make modal disapper
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);

//allow the confirm button to take input and make modal disappear
confirmAddMovieButton.addEventListener("click", addMovieHandler);
