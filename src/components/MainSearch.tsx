import { useEffect, useState } from 'react'
import { Card } from './Card'
import { useLocation } from 'react-router-dom'
import api from '../services/Api'
import { IAnime } from '../types/Anime'

export function MainSearch() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const [animes, setAnimes] = useState<IAnime[]>([])
    const [query] = useState(searchParams.get('q'))
    const [animesFetched, setAnimesFetched] = useState(false)

    const getSearchedAnimes = async (url: any) => {
        const res = await api.get(url)
        const data = await res.data
        setAnimesFetched(true)

        if (!query) return

        const dataSerched = data.filter((anime: IAnime) => {
            return anime.nome.toLowerCase().includes(query.toLowerCase())
        })

        dataSerched.sort((a: IAnime, b: IAnime) => {
            const nomeA = a.nome.toUpperCase()
            const nomeB = b.nome.toUpperCase()

            if (nomeA < nomeB) {
                return -1
            }
            if (nomeA > nomeB) {
                return 1
            }
            return 0
        })

        setAnimes(dataSerched)
    }

    useEffect(() => {
        getSearchedAnimes('/animes')
    }, [query])

    return (
        <section className="container-animes">
            <h2 className="main-search-title">
                Resultados da pesquisa:
                <div className="main-search-result">{query}</div>
            </h2>
            <div className="content-animes">
                {!animesFetched ? (
                    <h1 className="loading">Carregando...</h1>
                ) : animes.length > 0 && animesFetched ? (
                    animes.map((anime: IAnime) => (
                        <Card key={anime._id} anime={anime} />
                    ))
                ) : (
                    <div className="anime-not-found">
                        <div className="content">
                            Nenhum anime foi encontrado
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
