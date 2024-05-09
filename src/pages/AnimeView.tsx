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
    const [error, setError] = useState<boolean>(false)

    const getAnime = async (id: string) => {
        api.get(`/animes/${id}`)
            .then((res) => {
                setAnime(res.data)
            })
            .catch(() => {
                setError(true)
            })
    }

    useEffect(() => {
        getAnime(id)
    }, [])

    return (
        <section className="anime-container">
            <Header />
            {anime && !error ? (
                <AnimeContent anime={anime} />
            ) : error ? (
                <div className="container-error">
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                </div>
            ) : (
                <div className="container-loading">
                    <Loading />
                </div>
            )}
        </section>
    )
}

export default AnimeView
