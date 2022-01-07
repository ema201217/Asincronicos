const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesAPIController = {
  list: (req, res) => {
    db.Movie.findAll({
      include: ["genre"],
    }).then((movies) => {
      let respuesta = {
        meta: {
          status: 200,
          total: movies.length,
          url: "api/movies",
        },
        data: movies,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: ["genre"],
    }).then((movie) => {
        /* Le doy el formato para poder visualizarlo en el input tipo fecha */
        
       movie ? movie.release_date = moment(movie.release_date,"YYYY-MM-DD") : null
      let respuesta = {
        meta: {
          status: 200,
          url: "/api/movie/:id",
        },
        data: movie,
      };
      res.json(respuesta);
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      include: ["genre"],
      where: {
        rating: { [db.Sequelize.Op.gte]: req.params.rating },
      },
      order: [["rating", "DESC"]],
    })
      .then((movies) => {
        let respuesta = {
          meta: {
            status: 200,
            total: movies.length,
            url: "api/movies/recomended/:rating",
          },
          data: movies,
        };
        res.json(respuesta);
      })
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    let movie = Movies.findOne({
      where: {
        title: req.body.title,
      },
    });
    if (movie) {
      res.json({
        msg:"La pelicula ya existe en la base de datos"
        });
    } else {
      console.log("create", req.body, req.params);
      Movies.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      })
        .then((confirm) => {
          let respuesta;
          if (confirm) {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/movies/create",
              },
              data: confirm,
            };
          } else {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/movies/create",
              },
              data: confirm,
            };
          }
          res.json(respuesta);
        })
        .catch((error) => res.send(error));
    }
  },
  update: (req, res) => {
    let movieId = req.params.id;
    console.log(movieId);
    console.log(req.body);
    Movies.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      },
      {
        where: { id: movieId },
      }
    )
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/movies/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/movies/update/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
  destroy: (req, res) => {
    let movieId = req.params.id;
    console.log(movieId);
    db.ActorMovie.destroy({ where: { movie_id: movieId } }).then(() => {
      Movies.destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
        .then((confirm) => {
          let respuesta;
          console.log("confirm", confirm);
          if (confirm) {
            respuesta = {
              meta: {
                status: 200,
                total: confirm.length,
                url: "api/movies/delete/:id",
              },
              data: confirm,
            };
          } else {
            respuesta = {
              meta: {
                status: 204,
                total: confirm.length,
                url: "api/movies/destroy/:id",
              },
              data: confirm,
            };
          }
          res.json(respuesta);
        })
        .catch((error) => res.send(error));
    });
  },
};

module.exports = moviesAPIController;
