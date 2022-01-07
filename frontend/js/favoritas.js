window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  const favoritesStorage = JSON.parse(localStorage.getItem("favorites"));

  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  fetch(`http://localhost:3031/api/movies`)
    .then((res) => res.json())
    .then((peliculas) => {
      // Codigo que debemos usar para mostrar los datos en el frontend
      let data = peliculas.data;

      data?.forEach((movie) => {
        /* SI EXISTE ALGO EN EL ALMACENAMIENTO LOCAL, 
        PREGUNTA SI EL ID DE LA PELICULA QUE RECORRE EN ESE MOMENTO 
        ESTA EN EL ALMACENAMIENTO LOCAL */
        if (favoritesStorage?.includes(`${movie.id}`)) {
          /* DE SER ASI IMPRIMIME EN EL FRONTEND TODAS LAS PELICULAS QUE ESTAN PRESENTE COMO FAVORITOS */
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          const h1 = document.createElement("h1");
          h1.textContent = movie.title;

          const p = document.createElement("p");

          p.textContent = `Rating: ${movie.rating}`;

          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
        }
      });
    });
};
