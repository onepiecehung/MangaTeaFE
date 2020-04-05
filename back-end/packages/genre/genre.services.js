var GenreRepository = require('../repository/genre.repository');
export async function createGenre(genre) {
    try {
        return await GenreRepository.create(genre);
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function getAllGenre(genre) {
    try {
        return await GenreRepository.findAll();
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}