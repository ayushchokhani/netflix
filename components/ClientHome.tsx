'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import Navbar from './Navbar'
import Billboard from './Billboard'
import MovieList from './MovieList'
import useMovieList from '@/hooks/useMovieList'

export default function ClientHome() {
  const { data: user } = useCurrentUser()
  const {data: movies = []} = useMovieList()

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
      </div>
    </>
  )
}
