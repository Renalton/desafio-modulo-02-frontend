const movies = document.querySelector('.movies');
//variável para controlar o número de páginas dentro do for no eixo i;


const input = document.querySelector('.input');

let btn_prev = document.querySelector('.btn-prev');
let btn_next = document.querySelector('.btn-next');


//Dados para preencher as informações do filme do dia
const highlight__video = document.querySelector('.highlight__video');
highlight__video.classList.add('highlight__video');
const highlight__title = document.querySelector('.highlight__title');
highlight__title.classList.add('highlight__title');
const highlight__rating = document.querySelector('.highlight__rating');
highlight__rating.classList.add('highlight__rating');
const highlight__genres = document.querySelector('.highlight__genres');
highlight__genres.classList.add('highlight__genres');
const highlight__launch = document.querySelector('.highlight__launch');
highlight__launch.classList.add('highlight__genre-launch');
const highlight__description = document.querySelector('.highlight__description');
highlight__description.classList.add('highlight__description');
const highlight__video_link = document.querySelector('.highlight__video-link');



//Função para realizar a pesquisa do filmes. Infelizmente não conseguir finalizar
function pesquisaFilme() {

    input.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            controle = 0;
            console.log(event);
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`).then(function (resposta) {
                const promiseBody = resposta.json();

                promiseBody.then(function (body) {



                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 5; j++) {
                            if (i < 4 && j < 5) {


                                const movie = document.createElement('div');
                                movie.classList.add('movie');
                                const movie_info = document.createElement('div');
                                movie_info.classList.add('movie__info');
                                const movie_title = document.createElement('span');
                                movie_title.classList.add('movie__title');
                                const movie_rating = document.createElement('span');
                                movie_rating.classList.add('movie__rating');
                                const img_star_movie = document.createElement('img');


                                movie.style.backgroundImage = `url('${body.results[j].poster_path}')`;
                                movie_title.textContent = body.results[j].title;
                                img_star_movie.src = "./assets/estrela.svg"
                                img_star_movie.alt = "Estrela";
                                movie_rating.textContent = body.results[j].vote_average;



                                movie_info.append(movie_title, movie_rating, img_star_movie);
                                movie.append(movie_info);
                                movies.append(movie);


                            }
                        }
                    }


                })
            })
        }

    })



}

//Nessa função eu uso o conceito de matriz (1xj) para controlar a quantidade de filmes exibidos o na posição j, a matriz faz o carregamento dos filmes. Infelizmente não conseguir finalizar
function gradeMovies() {


    const responseEndpoint = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false');
    responseEndpoint.then(function (resposta) {
        const responseBody = resposta.json();

        responseBody.then(function (body) {
            console.log(body);


            for (let i = 0; i < 1; i++) {
                for (let j = 0; j < 5; j++) {
                    if (i < 4 && j < 5) {


                        const movie = document.createElement('div');
                        movie.classList.add('movie');
                        const movie_info = document.createElement('div');
                        movie_info.classList.add('movie__info');
                        const movie_title = document.createElement('span');
                        movie_title.classList.add('movie__title');
                        const movie_rating = document.createElement('span');
                        movie_rating.classList.add('movie__rating');
                        const img_star_movie = document.createElement('img');


                        movie.style.backgroundImage = `url('${body.results[j].poster_path}')`;
                        movie_title.textContent = body.results[j].title;
                        img_star_movie.src = "./assets/estrela.svg"
                        img_star_movie.alt = "Estrela";
                        movie_rating.textContent = body.results[j].vote_average;



                        movie_info.append(movie_title, movie_rating, img_star_movie);
                        movie.append(movie_info);
                        movies.append(movie);
                    }
                }
            }


        })

    })

}


//Função para exibir o filme do dia
function filmeDoDia() {

    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
        const responseBody = resposta.json();

        responseBody.then(function (body) {
            highlight__video.style.backgroundImage = `url('${body.backdrop_path}')`;
            highlight__title.textContent = body.title;
            highlight__rating.textContent = body.vote_average
            highlight__genres.textContent = `${body.genres[0].name}, ${body.genres[1].name}, ${body.genres[2].name}, ${body.genres[3].name} / `;
            highlight__launch.textContent = new Date(body.release_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
            highlight__description.textContent = body.overview;


        });
    });
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
        const promiseBody = resposta.json();
        promiseBody.then(function (body) {
            console.log(body);
            highlight__video_link.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;

        })
    })

}


filmeDoDia();
pesquisaFilme();
gradeMovies();


