const btn_theme = document.querySelector('.btn-theme');


const modal = document.querySelector('.modal')
const modal__title = document.querySelector('.modal__title')
const modal__img = document.querySelector('.modal__img')
const modal__genre_average = document.querySelector('.modal__genre-average')
const modal__description = document.querySelector('.modal__description')
const modal__close = document.querySelector('.modal__close')
const modal__average = document.querySelector('.modal__average')
const modal__genres = document.querySelector('.modal__genres')

const highlight = document.querySelector('.highlight');
const highlight__video_link = document.querySelector('.highlight__video-link');
const highlight__video = document.querySelector('.highlight__video');
const highlight__info = document.querySelector('.highlight__info');
const highlight__title_rating = document.querySelector('.highlight__title-rating');
const highlight__title = document.querySelector('.highlight__title');

const highlight__genres = document.querySelector('.highlight__genres');
const highlight__launch = document.querySelector('.highlight__launch');
const highlight__description = document.querySelector('.highlight__description');
const highlight__rating = document.querySelector(".highlight__rating");

const movies = document.querySelector('.movies');
const input = document.querySelector('.input');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');
let tecla = false;
btn_theme.textContent = "claro";



function pesquisaFilmes(input) {
    input.addEventListener('keydown', function (event) {
        if (event.key === "Enter" && input.value !== '') {

            exibeFilmes(1);

        }
    })
}

function exibeFilmes(value) {

    if (value === 1) {
        movies.replaceChildren();
        fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`).then(function (resposta) {

            const responseBody = resposta.json();
            responseBody.then(function (body) {
                console.log("Entrou")

                carregarArrayFilmes(body);

                input.value = '';

            })
        })
    } else {
        fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (resposta) {
            const responseBody = resposta.json();
            responseBody.then(function (body) {


                carregarArrayFilmes(body);
            })

        })

    }
}

function carregarArrayFilmes(body) {
    let inicio = 0;
    let loop = 0;
    let tamanho = body.results.length;
    if (tamanho > 5) {
        loop = 5;
    } else {
        loop = tamanho;
    }
    let j = 0;


    for (j; j < loop; j++) {





        btn_next.addEventListener('click', function () {

            if (loop < tamanho) {

                if ((tamanho - 5) !== 0) {

                    j = loop;
                    loop += 1;
                }

            } else {
                j = 0, loop = 1;

            }

            for (j; j < loop; j++) {

                movie.style.backgroundImage = `url('${body.results[j].poster_path}')`;
                movie__title.textContent = body.results[j].title;

                rating.textContent = body.results[j].vote_average;
            }

        })

        btn_prev.addEventListener('click', function () {

            if (inicio === 1 && loop === 5) {

                j = (tamanho - 5);
                loop = j + 1;
                inicio = 0;

            } if (loop === 10 && j === 10) {
                j = 0;
                loop = j + 1;

            }
            if (loop === 15 && j === 15) {
                j = 5;
                loop = j + 1;

            } if (loop === 20 && j === 20) {
                j = 10;
                loop = j + 1;

            } if (loop === 5 && j === 5) {
                j = 15;
                loop = j + 1

            } else {
                j = j;
                loop = j + 1;

            }

            for (j; j < loop; j++) {

                movie.style.backgroundImage = `url('${body.results[j].poster_path}')`;
                movie__title.textContent = body.results[j].title;

                rating.textContent = body.results[j].vote_average;
            }

        })

        const movie = document.createElement('div')
        movie.classList.add('movie')
        const movie__info = document.createElement('div')
        movie__info.classList.add('movie__info')
        const movie__title = document.createElement('span')
        movie__title.classList.add('movie__title')
        const img = document.createElement('img')
        const movie__rating = document.createElement('span')
        const rating = document.createElement('span')
        rating.classList.add('movie__rating');
        movie__rating.classList.add('movie__rating')
        rating.textContent = body.results[j].vote_average;
        img.src = './assets/estrela.svg';
        img.alt = "Estrela";

        movie.style.backgroundImage = `url('${body.results[j].poster_path}')`;
        movie__title.textContent = body.results[j].title;

        movie__rating.append(img, rating);
        movie__info.append(movie__title, movie__rating);
        movie.append(movie__info)
        movies.append(movie);
        inicio = 1;

        movie.addEventListener('click', function (event) {

            modal.classList.remove('hidden');
            const idFilme = body.results.find((filme) => {
                return filme.title === event.target.lastChild.childNodes[0].innerText;
            })
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${idFilme.id}?language=pt-BR`).then(function (resposta) {
                const responseBody = resposta.json();
                responseBody.then(function (filme) {
                    const foo = filme;
                    console.log(filme);
                    modal__title.textContent = filme.title;
                    modal__img.style.backgroundImage = `url('${filme.backdrop_path}')`;
                    modal__description.textContent = filme.overview;

                    const voteAverage = document.createElement('span')
                    voteAverage.classList.add('.modal__average');
                    const modalGenres = document.createElement('span')
                    modalGenres.classList.add('.modal__genres')


                    voteAverage.textContent = filme.vote_average;
                    img.src = './assets/estrela.svg';

                    modal__average.append(img, voteAverage)
                    for (genre of filme.genres) {
                        const modalGenres = document.createElement('span')
                        modalGenres.classList.add('.modal__genres')
                        modalGenres.textContent = genre.name;
                        modal__genres.append(modalGenres);



                    }

                })
            })



        })

    }


}

function btntheme() {
 
    btn_theme.addEventListener('click', function () {
        if(btn_theme.textContent === 'claro'){
            btn_theme.src = "./assets/dark-mode.svg";
            btn_theme.textContent = 'escuro'
        }else{
            btn_theme.src = "./assets/light-mode.svg"
            btn_theme.textContent = 'claro'

        }
        
     
    })

}

function highlightInfo() {
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
        const responseBody = resposta.json();
        responseBody.then(function (body) {


            highlight__video.style.backgroundImage = `url('${body.backdrop_path}')`;
            highlight__title.textContent = body.title;
            highlight__rating.textContent = body.vote_average;

            highlight__genres.textContent = `${body.genres[0].name}, ${body.genres[1].name}, ${body.genres[2].name}, ${body.genres[3].name} / `;
            highlight__launch.textContent = new Date(body.release_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
            highlight__description.textContent = body.overview;


        })
    })
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
        const responseBody = resposta.json();
        responseBody.then(function (body) {


            highlight__video_link.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;

        })
    })
}

function modalClose() {
    modal__close.addEventListener('click', function () {
        modal.classList.add('hidden')
    })
    modal.addEventListener('click', function () {
        modal.classList.add('hidden');
    })
}
btntheme();
exibeFilmes(0);
modalClose();

highlightInfo();

pesquisaFilmes(input);