import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query('SELECT id, name FROM genres WHERE LOWER(name) = ?;', [lowerCaseGenre])

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [idMovie] = await connection.query('SELECT movieId FROM movie_genre WHERE genreId = ?;', [id])

      const [{ movieId }] = idMovie

      const [movies] = await connection.query('SELECT * FROM movies WHERE id = ?;', [movieId])

      return movies
    }

    const [movies] = await connection.query('SELECT * FROM movies')

    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query('SELECT * FROM movies WHERE id = ?;', [id])

    if (movie.length === 0) return []

    return movie
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query('INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?, ?);', [uuid, title, year, director, duration, poster, rate])
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query('SELECT * FROM movies WHERE id = ?;', [uuid])

    return movies[0]
  }

  static async delete ({ id }) {
    const result = await connection.query('DELETE FROM movies WHERE id = ?;', [id])

    return result
  }

  static async update ({ id, input }) {
    const [ResultHeader] = await connection.query('UPDATE movies SET ? WHERE id = ?;', [input, id])
    const { affectedRows } = ResultHeader
    console.log(affectedRows)

    if (affectedRows === 0) return null

    const movieUpdated = await connection.query('SELECT * FROM movies WHERE id = ?;', [id])

    return movieUpdated[0]
  }
}
