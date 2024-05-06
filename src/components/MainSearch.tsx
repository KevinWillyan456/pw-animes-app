import { useEffect, useState } from 'react'
import { Card } from './Card'
import { useLocation } from 'react-router-dom'
import api from '../services/Api'
import { IAnime } from '../types/Anime'

export function MainSearch() {
    const [animes, setAnimes] = useState<IAnime[]>([])
    const [animesFetched, setAnimesFetched] = useState(false)
    const [error, setError] = useState<boolean>(false)
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('q') || ''

    useEffect(() => {
        async function fetchAnimes() {
            try {
                if (!query) {
                    setAnimes([])
                    setAnimesFetched(true)
                    return
                }

                const response = await api.get('/animes')
                const data = response.data.filter((anime: IAnime) =>
                    anime.nome.toLowerCase().includes(query.toLowerCase())
                )
                setAnimes(data)
                setAnimesFetched(true)
            } catch (error) {
                console.log(error)
                setAnimesFetched(true)
                setError(true)
            }
        }

        fetchAnimes()
    }, [query])

    return (
        <section className="container-animes">
            <h2 className="main-search-title">
                Resultados da pesquisa:
                <div className="main-search-result">{query}</div>
            </h2>
            <div className="content-animes">
                {!animesFetched && !error ? (
                    <h1 className="loading">Carregando...</h1>
                ) : animes.length > 0 && animesFetched && !error ? (
                    animes.map((anime: IAnime) => (
                        <Card key={anime._id} anime={anime} />
                    ))
                ) : error ? (
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                ) : (
                    <div className="anime-not-found">
                        <div className="content">Nenhum anime encontrado</div>
                    </div>
                )}
            </div>
        </section>
    )
}
