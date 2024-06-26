import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'
import api from '../services/Api'
import { IAnime } from '../types/Anime'
import Loading from './Loading'
import {
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    useIonRouter,
} from '@ionic/react'
import { App } from '@capacitor/app'

export function Main() {
    const [animes, setAnimes] = useState<IAnime[]>([])
    const [animesFetched, setAnimesFetched] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [genres, setGenres] = useState<string[]>([])
    const [genre, setGenre] = useState<string>('')

    useEffect(() => {
        const genres = [
            ...new Set(
                ([] as string[]).concat(
                    ...animes.map((anime) => anime.genero.split(', '))
                )
            ),
        ]

        genres.sort()

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

    const ionRouter = useIonRouter()
    document.addEventListener('ionBackButton', (ev: any) => {
        ev.detail.register(-1, () => {
            if (!ionRouter.canGoBack()) {
                App.exitApp()
            }
        })
    })

    return (
        <section className="container-animes">
            {!animesFetched && !error ? (
                <div className="container-loading">
                    <Loading />
                </div>
            ) : animes.length > 0 && !error && animesFetched ? (
                <section className="genre-section">
                    <section className="genre-filter">
                        <IonList>
                            <IonItem>
                                <IonSelect
                                    aria-label="Select genre"
                                    interface="action-sheet"
                                    placeholder="Selecione um gênero"
                                    onIonChange={(e) =>
                                        setGenre(e.detail.value)
                                    }
                                    value={genre}
                                >
                                    <IonSelectOption value="">
                                        Tudo
                                    </IonSelectOption>

                                    {genres.map((genre) => (
                                        <IonSelectOption
                                            key={genre}
                                            value={genre}
                                        >
                                            {genre}
                                        </IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </section>

                    {animes
                        .filter((anime) => {
                            return genre === '' || anime.genero.includes(genre)
                        })
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
            ) : (
                <div className="container-error">
                    <h1 className="error">Erro ao comunicar com o servidor</h1>
                </div>
            )}
        </section>
    )
}
