import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'
import api from '../services/Api'
import { IAnime } from '../types/Anime'
import Loading from './Loading'

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
                    <Loading />
                ) : animes.length > 0 && !error && animesFetched ? (
                    animes.map((anime: IAnime, i) => (
                        <Card
                            key={anime._id}
                            anime={anime}
                            style={
                                {
                                    '--delay': `${`${i * 80}`}ms`,
                                } as React.CSSProperties
                            }
                        />
                    ))
                ) : (
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                )}
            </div>
        </section>
    )
}
