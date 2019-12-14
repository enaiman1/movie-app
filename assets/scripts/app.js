const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movies = [];

// what is shown to the user depending on if there are movies saved or not
const updateUI = () =>{
if (movies.length === 0){
    entryTextSection.style.display="block";
} else{
    entryTextSection.style.display="none";
}
}

const renderNewMovieElement = (title, imageUrl, rating) => {
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
const listRoot = document.getElementById("movie-list");
listRoot.append(newMovieElement);
}

// create a backdrop when modal appears
const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

// this function will open and close modal
const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
}

//this function clear user input in the modal
const clearMovieInput =() =>{
    for(const usrInput of userInputs){
        usrInput.value = "";
    }
}

// allows use to use the cancle button
const cancelAddMovieHandler = () => {
    toggleMovieModal();
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
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

// this function will toggle between a dark background when modal displays
const backdropClickHandler = () => {
    toggleMovieModal();
}

// event listener to display modal to add new movie
startAddMovieButton.addEventListener("click", toggleMovieModal);

// allows you to click on background to make modal disappear
backdrop.addEventListener("click", backdropClickHandler);

//allows the cancle button to make modal disapper
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);

//allow the confirm button to take input and make modal disappear
confirmAddMovieButton.addEventListener("click", addMovieHandler);
