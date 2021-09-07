const router = require("express").Router();
const Celebrity = require("../models/celebrity-model");
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/celebrities', async(req, res) => {
  const celebrities = await Celebrity.find();
  res.render('celebrities/index', {celebrities})
})

router.get('/celebrities/:celebrityId', async(req, res) => {
  const celebrity = await Celebrity.findById(req.params.celebrityId);
  res.render("celebrities/show", celebrity);
})

router.get('/create-celebrity', async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render('celebrities/create-celebrity', {celebrities});
});

router.post('/create-celebrity', async(req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  await Celebrity.create({name, occupation, catchPhrase});
  res.redirect('/celebrities-view');
})

router.post('/celebrities/:celebrityId/delete', async(req, res) => {
  await Celebrity.findByIdAndDelete(req.params.celebrityId);
  res.redirect('/celebrities-view');
})

router.get('/celebrities/:celebrityId/edit', async(req, res) => {
  const {name, occupation, catchPhrase} = req.body;
   const celebrity = await Celebrity.findById(req.params.celebrityId);
   res.render("celebrities/celebrity-edit", celebrity);
});

router.post('/celebrities/:celebrityId/edit', async(req, res) => {
  const {name, occupation, catchPhrase} = req.body;
   await Celebrity.findByIdAndUpdate(req.params.celebrityId, {
     name,
     occupation,
     catchPhrase,
   });
   res.redirect(`/celebrities/${req.params.celebrityId}`);
});

router.get('/movies', async(req, res) => {
  const movies = await Movie.find();
  res.render('movies/index', {movies});
});

router.get('/movies/new', async(req, res) => {
  const movie = await Movie.find();
  res.render('movies/create-movie', movie)
});

router.post('/movies', async(req, res) => {
  const {title, genre, plot, cast} = req.body;
  await Movie.create({title, genre, plot, cast});
  res.redirect('/movies')
});

router.get('/movies/:movieId', async(req, res) => {
  const movie = await Movie.findById(req.params.movieId).populate("cast");
  res.render('movies/movie-details', movie)
})

router.get('/movies/:movieId/edit', async(req, res) => {
  const celebrityNames = await Celebrity.find();
  const movie = await Movie.findById(req.params.movieId).populate("cast");
  res.render('movies/movie-edit', {movie, celebrityNames})
})

router.post('/movies/:movieId/edit', async(req, res) => {
  const {title, genre, plot, cast} = req.body;
   await Movie.findByIdAndUpdate(req.params.movieId, {
     title,
     genre,
     plot,
     cast,
   });
   res.redirect(`/movies/${req.params.movieId}`);
});

router.post('/movies/:movieId/delete', async(req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.movieId);
  res.redirect('/movies');
})




module.exports = router;
