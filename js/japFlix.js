const url_MOVIES = "https://japceibal.github.io/japflix_api/movies-data.json";
let moviesArray = [];
let filterMoviesArray = [];
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("inputBuscar");
const scoreCero = '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreUno = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreDos = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreTres = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
const scoreCuatro = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';
const scoreCinco = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';


let getJSONData = function (url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
};

// Función para mostrar estrellas según vote_average
function showStars(score) {
    if (score < 2) {
        return scoreCero
    };

    if (score >= 2 && score < 4) {
        return scoreUno
    };

    if (score >= 4 && score < 6) {
        return scoreDos
    };

    if (score >= 6 && score < 8) {
        return scoreTres
    };

    if (score >= 8 && score < 10) {
        return scoreCuatro
    };

    if (score == 10) {
        return scoreCinco
    };

};

function showMovieInfo(movieId) {

    const movie = filterMoviesArray.find(({id}) => id===movieId);
    if(movie){ 


    document.getElementById("offcanvasTopLabel").innerHTML = movie.title;
    document.getElementById("bodyCanvas").innerHTML = movie.overview;
    for (let i = 0; i < movie.genres.length; i++) {
        let genre = movie.genres[i];
    document.getElementById("bodyCanvas").innerHTML += `<hr>
    <p>${genre.name}</p>
    `;
}
}
};

function showMoviesList() {
    //filtrado. Nuevo array
    filterMoviesArray = moviesArray.filter(({ title, genres, tagline, overview }) => 

        title.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||

        genres.some(({ name }) =>
            name.toLowerCase().includes(inputBuscar.value.toLowerCase())) ||

        tagline.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||

        overview.toLowerCase().includes(inputBuscar.value.toLowerCase())
    
    )
    //for
    for (let i = 0; i < filterMoviesArray.length; i++) {
        let movie = filterMoviesArray[i];
        let { title, tagline, vote_average, id } = movie; //desestructuración de movie

        //agregar contenido HTML
        document.getElementById("lista").innerHTML += `

<li class="lista-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onclick="showMovieInfo(${id})">
<h4><strong>${title}</strong></h4><p>${showStars(vote_average)}</p></li>
<li class="lista-item"><p>${tagline}</p></li>
</li>
<hr>

    `

    }
}


document.addEventListener("DOMContentLoaded", (e) => {
    getJSONData(url_MOVIES).then(function (resultado) {
        if (resultado.status === "ok") {
            moviesArray = resultado.data
            // console.log(moviesArray);
        };
    });
});

btnBuscar.addEventListener("click", (e) => {
    if (inputBuscar.value) {
        document.getElementById("lista").innerHTML = "";    
showMoviesList();
    }

})

