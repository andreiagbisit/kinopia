import axios from 'axios'

export const getNowPlayingTrailers = async (req, res) => {
  try {
    // TMDB - GET MOVIES UNDER 'NOW PLAYING'
    const { data: nowPlayingData } = await axios.get(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
      }
    )

    const topMovies = nowPlayingData.results.slice(0, 4) // ONLY RETRIEVE 4 MOVIES
    const trailers = []

    // TMDB - FETCH TRAILERS FOR EACH MOVIE
    for (const movie of topMovies) {
      const { data: videosData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
        }
      )

      const ytTrailer = videosData.results
        .filter(v => v.site === 'YouTube' && v.type === 'Trailer')[0]

      if (ytTrailer) {
        trailers.push({
          image: `https://img.youtube.com/vi/${ytTrailer.key}/maxresdefault.jpg`,
          videoUrl: `https://www.youtube.com/watch?v=${ytTrailer.key}`
        })
      }
    }

    res.json(trailers)
  } catch (err) {
    console.error('Failed to fetch now playing trailers:', err.message)
    res.status(500).json({ error: 'Failed to fetch trailers' })
  }
}
