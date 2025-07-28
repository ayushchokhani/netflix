'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import Navbar from './Navbar'
import Billboard from './Billboard'
import MovieList from './MovieList'

import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from './InfoModal'
import useInfoModal from '@/hooks/useInfoModal'

export default function ClientHome() {
  const { data: user } = useCurrentUser()
  const {data: movies = []} = useMovieList()
  const {data: favorites = []} = useFavorites()

  const {isOpen, closeModal} = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />

      <div className="pt-[66px]">
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
          <MovieList title="My List" data={favorites} />
        </div>
      </div>
    </>
  )
}
