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
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        const genres = [
            ...new Set(
                ([] as string[]).concat(
                    ...animes.map((anime) => anime.genero.split(','))
                )
            ),
        ]

        setGenres(genres)
    }, [animes])

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
            {!animesFetched && !error ? (
                <Loading />
            ) : animes.length > 0 && !error && animesFetched ? (
                genres.length > 0 &&
                genres.map((genre) => (
                    <section key={genre} className="genre-section">
                        <h1
                            style={{
                                width: '100%',
                                gridColumn: '1 / -1',
                                marginBottom: '10px',
                            }}
                        >
                            {genre}
                        </h1>

                        {animes
                            .filter((anime) => anime.genero.includes(genre))
                            .map((anime: IAnime, i) => (
                                <Card
                                    key={anime._id}
                                    anime={anime}
                                    style={
                                        {
                                            '--delay': `${`${i * 80}`}ms`,
                                        } as React.CSSProperties
                                    }
                                />
                            ))}
                    </section>
                ))
            ) : (
                <h1 className="error">Erro ao comunicar com o servidor</h1>
            )}
        </section>
    )
}
