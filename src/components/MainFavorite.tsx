import { useEffect, useState } from 'react'
import { Card } from './Card'
import api from '../services/Api'
import { IAnime } from '../types/Anime'
import Loading from './Loading'
import './MainFavorite.css'
import StorageService from '../utils/StorageService'

function MainFavorite() {
    const [animes, setAnimes] = useState<IAnime[]>([])
    const [animesFetched, setAnimesFetched] = useState(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        api.get('/animes')
            .then((res) => {
                const data = res.data.filter((anime: IAnime) =>
                    StorageService.readFavorites().includes(anime._id)
                )

                setAnimesFetched(true)
                setAnimes(data)
            })
            .catch(() => {
                setAnimesFetched(true)
                setError(true)
            })
    }, [])

    return (
        <section className="container-animes-favorite">
            <h2 className="main-favorite-title">Meus Animes favoritos</h2>
            {!animesFetched && !error ? (
                <div className="container-loading-favorite">
                    <Loading />
                </div>
            ) : animes.length > 0 && animesFetched && !error ? (
                <div className="content-animes-favorite">
                    {animes.map((anime: IAnime, i) => (
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
                </div>
            ) : error ? (
                <div className="container-error-favorite">
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                </div>
            ) : (
                <div className="anime-not-found">
                    <div className="content">
                        Nenhum anime adicionado aos favoritos
                    </div>
                </div>
            )}
        </section>
    )
}

export default MainFavorite
