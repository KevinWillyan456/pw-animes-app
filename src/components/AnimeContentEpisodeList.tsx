import { IEpisodios } from '../types/Anime'

interface IAnimeContentEpisodeList {
    buttonClass: string
    episodio: IEpisodios
    gerenciarEpisodioButton: (episodio: IEpisodios) => void
}

export function AnimeContentEpisodeList({
    buttonClass,
    episodio,
    gerenciarEpisodioButton,
}: IAnimeContentEpisodeList) {
    return (
        <>
            <li>
                <button
                    className={buttonClass}
                    onClick={() => gerenciarEpisodioButton(episodio)}
                >
                    {`EP ${episodio.episodioNumero}`}
                </button>
            </li>
        </>
    )
}
