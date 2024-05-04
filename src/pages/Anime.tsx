import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { AnimeContent } from '../components/AnimeContent'
import Header from '../components/Header'
import api from '../services/Api'

export function Anime() {
    const { id } = useParams<{ id: string }>()
    const [anime, setAnime] = useState<any>(null)

    const getAnime = async (id: string) => {
        const res = await api.get(`/animes/${id}`)
        const data = await res.data
        setAnime(data)
    }

    useEffect(() => {
        // const animeUrl = `https://pw-animes-react-database.kevinsouza456.repl.co/animes/${id}`
        getAnime(id)
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
