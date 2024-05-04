import { useEffect, useState } from 'react'
import { Card } from './Card'
import { useLocation } from 'react-router-dom'
import api from '../services/Api'

export function MainSearch() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const [animes, setAnimes] = useState([])
    const [query] = useState(searchParams.get('q'))

    const getSearchedAnimes = async (url: any) => {
        const res = await api.get(url)
        const data = await res.data

        if (!query) return

        const dataSerched = data.filter((anime: any) => {
            return anime.nome.toLowerCase().includes(query.toLowerCase())
        })

        dataSerched.sort((a: any, b: any) => {
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
        // const searchWithQueryURL =
        //     'https://pw-animes-react-database.kevinsouza456.repl.co/animes'
        getSearchedAnimes('/animes')
    }, [query])

    return (
        <>
            <section className="container-animes">
                <h2 className="main-search-title">
                    Resultados da pesquisa:
                    <div className="main-search-result">{query}</div>
                </h2>
                <div className="content-animes">
                    {animes.length > 0 ? (
                        animes.map((anime: any) => (
                            <Card key={anime.id} anime={anime} />
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
        </>
    )
}
