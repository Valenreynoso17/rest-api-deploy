const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Crime', 'Romance', 'Sci-Fi', 'Animation'])
  )
})

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}