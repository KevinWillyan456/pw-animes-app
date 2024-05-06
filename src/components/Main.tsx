import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'
import api from '../services/Api'
import { IAnime } from '../types/Anime'

export function Main() {
    const [animes, setAnimes] = useState<IAnime[]>([])
    const [animesFetched, setAnimesFetched] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        api.get('/animes')
            .then((res) => {
                setAnimesFetched(true)
                setAnimes(res.data)
            })
            .catch(() => {
                setAnimesFetched(true)
                setError(true)
            })
    }, [])

    return (
        <section className="container-animes">
            <div className="content-animes">
                {!animesFetched && !error ? (
                    <h1 className="loading">Carregando...</h1>
                ) : animes.length > 0 && !error && animesFetched ? (
                    animes.map((anime: any) => (
                        <Card key={anime._id} anime={anime} />
                    ))
                ) : (
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                )}
            </div>
        </section>
    )
}
