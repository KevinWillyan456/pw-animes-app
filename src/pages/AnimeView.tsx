import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimeContent } from '../components/AnimeContent'
import Header from '../components/Header'
import api from '../services/Api'
import { IAnime } from '../types/Anime'
import Loading from '../components/Loading'

function AnimeView() {
    const { id } = useParams<{ id: string }>()
    const [anime, setAnime] = useState<IAnime | null>(null)

    const getAnime = async (id: string) => {
        const res = await api.get(`/animes/${id}`)
        const data = await res.data
        setAnime(data)
    }

    useEffect(() => {
        getAnime(id)
    }, [])

    return (
        <section className="anime-container">
            <Header />
            {anime ? <AnimeContent anime={anime} /> : <Loading />}
        </section>
    )
}

export default AnimeView
