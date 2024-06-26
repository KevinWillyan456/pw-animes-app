import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './AnimeContent.css'
import StorageService from '../utils/StorageService'
import { IAnime, IEpisodios } from '../types/Anime'
import { IonIcon, IonImg, IonToast } from '@ionic/react'
import {
    arrowForwardCircleOutline,
    arrowBackCircleOutline,
    heartOutline,
    heart,
} from 'ionicons/icons'

export function AnimeContent({ anime }: { anime: IAnime }) {
    const [episode, setEpisode] = useState(StorageService.read(anime._id + 1))
    const [indexEpisode, setIndexEpisode] = useState(
        StorageService.read(anime._id)
    )
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const loadRef = useRef<HTMLDivElement | null>(null)
    const episodeIndicatorRef = useRef<HTMLDivElement | null>(null)

    const totalEpisodes = anime.episodios.length

    const [isFavorite, setIsFavorite] = useState<boolean>(
        StorageService.readFavorites().includes(anime._id)
    )

    const [genres, setGenres] = useState<string[]>([])

    const [toastIsOpen, setToastIsOpen] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<
        'Adicionado aos favoritos' | 'Removido dos favoritos'
    >(isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos')

    useEffect(() => {
        setToastMessage(
            isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
        )
    }, [isFavorite])

    useEffect(() => {
        const genres = anime.genero.split(', ')
        genres.sort()

        setGenres(genres)
    }, [anime])

    const gerenciarEpisodioTela = () => {
        const episodios = anime.episodios
        const episodioEncontrado =
            episodios.find(
                (episodio: IEpisodios | undefined) =>
                    episodio?.episodioNumero == episode
            ) || episodios[0]
        if (loadRef.current) {
            loadRef.current.innerHTML = episodioEncontrado?.episodioUrl
                ? `<iframe src="https://drive.google.com/file/d/${episodioEncontrado?.episodioUrl}/preview" width="640" height="480" allow="autoplay" allowfullscreen="allowfullscreean"></iframe>`
                : '<h2 class="not-found-episode">Este episódio não está disponível</h2>'

            if (!isNaN(episode) && episode < 10) {
                const formattedEpisode = episode.toString().padStart(2, '0')
                if (episodeIndicatorRef.current)
                    episodeIndicatorRef.current.textContent = `EP ${formattedEpisode}`
            } else {
                if (episodeIndicatorRef.current)
                    episodeIndicatorRef.current.textContent = `EP ${
                        episode || 0
                    }`
            }
        }
    }

    const gerenciarEpisodioButton = (episodio: IEpisodios | undefined) => {
        setEpisode(episodio?.episodioNumero)
        setIndexEpisode(
            anime.episodios.findIndex(
                (objeto: IEpisodios | undefined) =>
                    objeto?.episodioNumero === episodio?.episodioNumero
            )
        )
        setSelectedEpisode(episodio?.episodioNumero || 1)
    }

    useEffect(() => {
        gerenciarEpisodioTela()
        setSelectedEpisode(episode)
    }, [episode])

    useEffect(() => {
        setEpisode(anime.episodios[indexEpisode]?.episodioNumero)
        StorageService.create(anime._id, indexEpisode)
    }, [indexEpisode])

    const handlePreviousEpisode = () => {
        if (indexEpisode > 0) {
            setIndexEpisode(indexEpisode - 1)
        }
    }

    const handleNextEpisode = () => {
        if (indexEpisode < totalEpisodes - 1) {
            setIndexEpisode(indexEpisode + 1)
        }
    }

    const handleFavorite = () => {
        if (StorageService.readFavorites().includes(anime._id)) {
            StorageService.removeFavorite(anime._id)
            setIsFavorite(false)
            setToastIsOpen(true)
        } else {
            StorageService.createFavorite(anime._id)
            setIsFavorite(true)
            setToastIsOpen(true)
        }
    }

    const classificacaoIndicativa: { [key: string]: string } = {
        L: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/443px-DJCTQ_-_L.svg.png',
        10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/1024px-DJCTQ_-_10.svg.png',
        12: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/400px-DJCTQ_-_12.svg.png',
        14: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/400px-DJCTQ_-_14.svg.png',
        16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/400px-DJCTQ_-_16.svg.png',
        18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/400px-DJCTQ_-_18.svg.png',
    }

    return (
        <section className="anime-content">
            <h1 className="anime-content-title">{anime.nome}</h1>
            <div className="anime-content-cover">
                <IonImg
                    src={anime.urlCapa}
                    alt={anime.nome}
                    onIonError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.src =
                            'https://m.media-amazon.com/images/I/41XsHyZVULL._AC_UF1000,1000_QL80_.jpg'
                    }}
                ></IonImg>
            </div>
            <div className="anime-content-genre">
                {genres.map((genre) => (
                    <span key={genre} className="genre">
                        {genre}
                    </span>
                ))}
            </div>
            <h2 className="anime-content-title-synopsis">Sinopse</h2>
            <div className="anime-content-synopsis-content">
                {anime.sinopse}
            </div>
            <div className="anime-content-episode">
                <div ref={episodeIndicatorRef} className="current-episode">
                    EP 01
                </div>
                <div className="age">
                    <IonImg
                        src={
                            classificacaoIndicativa[
                                anime.classificacaoIndicativa
                            ]
                        }
                        alt="Classificação Indicativa"
                        onIonError={(e) => {
                            const target = e.currentTarget as HTMLImageElement
                            target.src =
                                'https://m.media-amazon.com/images/I/41XsHyZVULL._AC_UF1000,1000_QL80_.jpg'
                        }}
                    ></IonImg>
                </div>
            </div>
            <div className="view-episode">
                <div ref={loadRef} className="load"></div>
            </div>

            <div className="actionButtons">
                <button
                    className={`prev ${
                        indexEpisode <= 0 || !episode ? 'forbidden' : ''
                    }`}
                    onClick={handlePreviousEpisode}
                    disabled={indexEpisode === 0}
                >
                    <IonIcon icon={arrowBackCircleOutline} size="large" />
                    <span>Anterior</span>
                </button>
                <button className="favorite" onClick={handleFavorite}>
                    <IonIcon
                        icon={isFavorite ? heart : heartOutline}
                        size="large"
                    />
                    <span>Favoritar</span>
                </button>
                <button
                    className={`next ${
                        indexEpisode === totalEpisodes - 1 || !episode
                            ? 'forbidden'
                            : ''
                    }`}
                    onClick={handleNextEpisode}
                    disabled={indexEpisode === totalEpisodes - 1}
                >
                    <IonIcon icon={arrowForwardCircleOutline} size="large" />
                    <span>Próximo</span>
                </button>
            </div>

            <div className="list-episodes">
                {anime.episodios.length > 0 ? (
                    anime.episodios.map((episodio: IEpisodios | undefined) => {
                        return (
                            <button
                                key={episodio?._id}
                                className={
                                    episodio?.episodioNumero === selectedEpisode
                                        ? 'btn-episode selected'
                                        : 'btn-episode'
                                }
                                onClick={() =>
                                    gerenciarEpisodioButton(
                                        episodio || undefined
                                    )
                                }
                            >
                                {`EP ${episodio?.episodioNumero || 1}`}
                            </button>
                        )
                    })
                ) : (
                    <h3 className="not-have-episodes">
                        Não há episódios disponíveis
                    </h3>
                )}
            </div>

            <IonToast
                isOpen={toastIsOpen}
                message={toastMessage}
                onDidDismiss={() => setToastIsOpen(false)}
                duration={3000}
                icon={isFavorite ? heart : heartOutline}
                style={{
                    '--background': '#333',
                    '--color': 'var(--color-white)',
                    fontSize: '18px',
                }}
            ></IonToast>
        </section>
    )
}
