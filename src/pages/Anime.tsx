import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { AnimeContent } from '../components/AnimeContent'
import Header from '../components/Header'

export function Anime() {
    const { id } = useParams<{ id: string }>()
    const [anime, setAnime] = useState<any>(null)

    const getAnime = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        setAnime(data)
    }

    useEffect(() => {
        const animeUrl = `https://pw-animes-react-database.kevinsouza456.repl.co/animes/${id}`
        getAnime(animeUrl)
    }, [])

    return (
        <>
            <section className="anime-container">
                <Header />
                {anime && <AnimeContent anime={anime} />}
                <Footer />
            </section>
        </>
    )
}
