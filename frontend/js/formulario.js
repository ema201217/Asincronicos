window.onload = () => {
  /* agregar */
  const title = document.querySelector("#title");
  const rating = document.querySelector("#rating");
  const awards = document.querySelector("#awards");
  const release_date = document.querySelector("#release_date");
  const length = document.querySelector("#length");
  const id = document.querySelector("#id");

  /* actions */
  const add = document.querySelector(".botonAgregar");
  const edit = document.querySelector(".botonEditar");
  const remove = document.querySelector(".botonBorrar");


  /*  TRAIGO LOS DATOS DE UNA PELICULA EN PARTICULAR */
  fetch("http://localhost:3031/api/movies/28")
    .then((res) => res.json())
    .then((movie) => {
      id.value = movie.data.id;
      title.value = movie.data.title;
      rating.value = movie.data.rating;
      awards.value = movie.data.awards;
      release_date.value = movie.data.release_date; /* formato de fecha */
      length.value = movie.data.length;
    })
    .catch((err) => {
      console.log(err);
    });

  /* BORRAR LA PELICULA */
  remove.addEventListener("click", () => {

    fetch(`http://localhost:3031/api/movies/delete/${id && id.value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      location.reload();
    });
  });

  add.addEventListener("click",()=>{
    const url = "http://localhost:3031/api/movies/create"
    const data = {
        title:title.value,
        rating:rating.value,
        awards:awards.value,
        release_date:release_date.value,
        length:length.value,
        genre_id:null
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res=>{
      console.log(res);
      location.pathname = "/frontend/home.html"
    }) 

   })
   
   
   edit.addEventListener("click",()=>{
    const url = `http://localhost:3031/api/movies/update/${id.value}`
    const data = {
        title:title.value,
        rating:rating.value,
        awards:awards.value,
        release_date:release_date.value,
        length:length.value,
        genre_id:null
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res=>{
      console.log(res);
      location.reload()
    }) 
   })
};
