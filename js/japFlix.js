const url_MOVIES = "https://japceibal.github.io/japflix_api/movies-data.json";
let moviesArray = [];

// let getJSONdata = function (url) {
//     let dataJapFlix = fetch(url);
//     dataJapFlix.then(function (respuesta) {

//         return respuesta.json();
//     })
//         .then((data) => {
//             dataJapFlix = data
//         })
//         .catch(() => {
//             console.log("error")
//         })
// }

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


document.addEventListener("DOMContentLoaded", (e) => {
getJSONData(url_MOVIES).then(function(resultado){
    if (resultado.status === "ok") {
        moviesArray = resultado.data
        // console.log(moviesArray);
};
});
});

document.getElementById("btnBuscar").addEventListener("click", (e) =>{
    if (document.getElementById("inputBuscar").value) {

    }

})

function showMoviesList() {


    //for

    document.getElementById("lista").innerHTML += `



    `

}
