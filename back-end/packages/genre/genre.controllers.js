const response = require("../../util/response.json")
const GenreService = require('./genre.services');
export async function createNewGenre(req, res, next) {
  try {
    var data = await GenreService.createGenre(req.body);
    return response.success(res, data, 201);
  } catch (error) {
    return response.error(res, req, error)
  }
}

export function getAllGenre(req, res, next) {
  try {
    var data = await GenreService.getAllGenre(req.body);
    return response.success(res, data, 201);
  } catch (error) {
    return response.error(res, req, error)
  }
}

export function getGenReById(req, res, next) {

}

export function updateGenreById(req, res, next) {

}

export function deleteGenreById(req, res, next) {

}