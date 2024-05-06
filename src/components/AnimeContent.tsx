import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './AnimeContent.css'
import StorageService from '../utils/StorageService'
import { IAnime, IEpisodios } from '../types/Anime'

const storageService = new StorageService()

export function AnimeContent({ anime }: { anime: IAnime }) {
    const [episode, setEpisode] = useState(storageService.read(anime._id + 1))
    const [indexEpisode, setIndexEpisode] = useState(
        storageService.read(anime._id)
    )
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const loadRef = useRef<any>(null)
    const episodeIndicatorRef = useRef<any>(null)

    const totalEpisodes = anime.episodios.length

    const gerenciarEpisodioTela = () => {
        const episodios = anime.episodios
        const episodioEncontrado =
            episodios.find(
                (episodio: IEpisodios) => episodio.episodioNumero == episode
            ) || episodios[0]
        if (loadRef.current) {
            loadRef.current.innerHTML = `<iframe src="https://drive.google.com/file/d/${episodioEncontrado.episodioUrl}/preview" width="640" height="480" allow="autoplay" allowfullscreen="allowfullscreean"></iframe>`

            if (!isNaN(episode) && episode < 10) {
                const formattedEpisode = episode.toString().padStart(2, '0')
                episodeIndicatorRef.current.textContent = `EP ${formattedEpisode}`
            } else {
                episodeIndicatorRef.current.textContent = `EP ${episode}`
            }
        }
    }

    const gerenciarEpisodioButton = (episodio: IEpisodios) => {
        setEpisode(episodio.episodioNumero)
        setIndexEpisode(
            anime.episodios.findIndex(
                (objeto: IEpisodios) =>
                    objeto.episodioNumero === episodio.episodioNumero
            )
        )
        setSelectedEpisode(episodio.episodioNumero)
    }

    useEffect(() => {
        gerenciarEpisodioTela()
        setSelectedEpisode(episode)
    }, [episode])

    useEffect(() => {
        setEpisode(anime.episodios[indexEpisode].episodioNumero)
        storageService.create(anime._id, indexEpisode)
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

    const classificacaoIndicativa: { [key: string]: string } = {
        L: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/443px-DJCTQ_-_L.svg.png',
        10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/1024px-DJCTQ_-_10.svg.png',
        12: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/400px-DJCTQ_-_12.svg.png',
        14: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/400px-DJCTQ_-_14.svg.png',
        16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/400px-DJCTQ_-_16.svg.png',
        18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/400px-DJCTQ_-_18.svg.png',
    }

    return (
        <>
            <h1 className="anime-content-title">{anime.nome}</h1>
            <h2 className="anime-content-title-synopsis">Sinopse</h2>
            <div className="anime-content-synopsis-content">
                {anime.sinopse}
            </div>
            <div className="anime-content-episode">
                <div ref={episodeIndicatorRef} className="current-episode">
                    EP 01
                </div>
                <div className="age">
                    <img
                        src={
                            classificacaoIndicativa[
                                anime.classificacaoIndicativa
                            ]
                        }
                        alt="Classificação Indicativa"
                    />
                </div>
            </div>
            <div className="view-episode">
                <div ref={loadRef} className="load"></div>
            </div>

            <div className="actionButtons">
                <button
                    className={`prev ${indexEpisode <= 0 ? 'forbidden' : ''}`}
                    onClick={handlePreviousEpisode}
                    disabled={indexEpisode === 0}
                >
                    Anterior
                </button>
                <button
                    className={`next ${
                        indexEpisode === totalEpisodes - 1 ? 'forbidden' : ''
                    }`}
                    onClick={handleNextEpisode}
                    disabled={indexEpisode === totalEpisodes - 1}
                >
                    Próximo
                </button>
            </div>

            <div className="list-episodes">
                <ul>
                    {anime.episodios.map((episodio: IEpisodios) => {
                        return (
                            <li key={episodio._id}>
                                <button
                                    className={
                                        episodio.episodioNumero ===
                                        selectedEpisode
                                            ? 'selected'
                                            : ''
                                    }
                                    onClick={() =>
                                        gerenciarEpisodioButton(episodio)
                                    }
                                >
                                    {`EP ${episodio.episodioNumero}`}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
