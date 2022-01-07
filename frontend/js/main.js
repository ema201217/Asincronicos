window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  const favoritesStorage = JSON.parse(localStorage.getItem("favorites"));

  container.setAttribute("class", "container");
  app.appendChild(container);
  /* Al recargar el navegador se pregunta si existe alguna movie en favoritos */
  if (favoritesStorage) {
    /* CREAMOS EL ITEM DE LISTA Y EL LINK CUANDO EXISTE ELEMENTOS EN EL LOCAL STORAGE */
    const listaD = document.querySelector(".navbar ul");
    const listItem = document.createElement("li");
    const linkFavorite = document.createElement("a");
    linkFavorite.textContent = "Mis películas favoritas";
    linkFavorite.setAttribute("href", "/frontend/favoritas.html");

    listItem.appendChild(linkFavorite);
    listaD.appendChild(listItem);
  }

  // Aqui debemos agregar nuestro fetch

  /* CONSULTAMOS LA API REST QUE NOS PROVEE EL BACKEND */
  fetch(`http://localhost:3031/api/movies`)
    .then((data) => data.json())
    .then((peliculas) => {
      // Codigo que debemos usar para mostrar los datos en el frontend
      let data = peliculas.data;

      /* RECORREMOS TODAS LAS MOVIES */
      data.forEach((movie) => {
        /* CREAMOS UN DIV */
        const card = document.createElement("div");
        /* LE COLOCAMOS AL DIV UNA CLASE */
        card.setAttribute("class", "card");

        /* CREAMOS UN H1 */
        const h1 = document.createElement("h1");
        /* LE METEMOS EL TITULO DE LA PELICULA */
        h1.textContent = movie.title;

        /* CREAMOS UNA ETIQUETA <i> y le colocamos */
        const star = document.createElement("i");
        /* LE COLOCAMOS UNA CLASE PARA EL ICONO DE ESTRELLA */
        star.setAttribute("class", "far fa-star");
        /* LE COLOCAMOS UN DATA-ID PARA PASAR EL ID PARA QUE PODAMOS IDENTIFICAR QUE ELEMENTO ES AL QUE AGREGAMOS A FAVORITOS */
        star.setAttribute("data-id", `${movie.id}`);

        /* CREAMOS UNA ETIQUETA <p> */
        const p = document.createElement("p");
        /* LE COLOCAMOS DENTRO LA CALIFICACION DE LA PELICULA */
        p.textContent = `Rating: ${movie.rating}`;

        /* CREAMOS OTRA ETIQUETA <p> */
        const duracion = document.createElement("p");

        /* LE COLOCAMOS LA DURACION DE LA PELICULA */
        duracion.textContent = `Duración: ${movie.length}`;

        /* UNA VEZ CREADOS LOS ELEMENTOS METEMOS TODO DENTRO DEL CONTENEDOR QUE CORRESPONDE */
        container.appendChild(card);
        h1.appendChild(star);
        card.appendChild(h1);
        card.appendChild(p);

        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
    })
    .then(() => {
      /* BUSCAMOS TODAS LAS ESTRELLITAS */
      const stars = document.querySelectorAll(".fa-star");

      /* DECLARAMOS UNA ARRAY Y USAMOS UN OPERADOR DE CORTO CIRCUITO EN EL CUAL SI EXISTE EN EL ALMACENAMIENTO LOCAL ALGUNA PELICULA COMO FAVORITOS LA VARIABLE RECIBE ESE VALOR Y SI NO EXISTE RECIVE EL VALOR DE UN ARRAY VACIO */
      let arr = favoritesStorage || [];

      /* SI EXISTEN LAS ESTRELLAS LAS RECORREMOS */
      stars?.forEach((star) => {
        /* SI EXISTE ALGO EN EL ALMACENAMIENTO LOCAL CON LA PROPIEDAD "favorites" ASIGNADO MAS ABAJO LOS RECORREMOS*/
        favoritesStorage?.forEach((id) => {
          /* SI EL ID EXISTENTE EN EL ALMACENAMIENTO LOCAL ES IGUAL A LA ESTRELLA EN LA PROPIEDAD data-id */
          if (id == star.dataset.id) {
            /* LE SACAMOS LA CLASE "far" PARA QUE LA ESTRELLA DEJE DE TENER RELLENO INTERNO*/
            star.classList.remove("far");
            /* LE AGREGAMOS LA CLASE "fas" PARA QUE LA ESTRELLA TENGA RELLENO Y SIMULE LA SELECCION DE FAVORITO */
            star.classList.add("fas");
          }
        });

        /* A CADA ESTRELLA QUE RECORREMOS LE ASIGNAMOS EL EVENTO CLICK */
        star.addEventListener("click", function (e) {
          /* EN UNA VARIABLE ASIGNAMOS EL VALOR DEL data-id QUE CONTIENE EL ICONO DE DICHA ESTRELLA */
          let id = e.target.dataset.id;

          /* SI NO EXISTE VALORES EN EL ALMACENAMIENTO LOCAL ("favoritesStorage?") PREGUNTA SI NO ESTA INCLUIDO EL ID ("!") */
          if (!favoritesStorage?.includes(id)) {
            /* AGREGAMOS EN LA VARIABLE arr EL "id" */
            arr.push(id);
            /* LE SACAMOS LA CLASE "far" PARA QUE LA ESTRELLA DEJE DE TENER RELLENO INTERNO*/
            e.target.classList.remove("far");

            /* LE AGREGAMOS LA CLASE "fas" PARA QUE LA ESTRELLA TENGA RELLENO Y SIMULE LA SELECCION DE FAVORITO */
            e.target.classList.add("fas");
          } else {
            /* SI PULSAMOS SOBRE ESE ELEMENTO Y YA EXISTE EN EL ALMACENAMIENTO LOCAL ENTONCES IDENTIFICAMOS LA UBICACION DEL INDICE Y LUEGO CON splice LO ELIMINAMOS PASANDOLE COMO PRIMER PARAMETRO DICHO INDICE Y DESPUES LA CANTIDAD DE ELEMENTOS A BORRAR DESDE ESE INDICE */
            arr.splice(arr.indexOf(id), 1);

            e.target.classList.remove("fas");
            e.target.classList.add("far");
          }
          /* POR ULTIMO AGREGAMOS AL ALMACENAMIENTO LOCAL LA VARIABLE arr STRINGIFICADO */
          localStorage.setItem("favorites", JSON.stringify(arr));
        });
      });
    });
};
