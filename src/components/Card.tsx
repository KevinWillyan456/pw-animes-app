import { IAnime } from '../types/Anime'
import './Card.css'

interface ICard {
    anime: IAnime
}

export function Card({ anime }: ICard) {
    return (
        <a href={`/anime/${anime._id}`}>
            <div className="card">
                <div className="card-img">
                    <img src={anime.urlCapa} />
                </div>
                <div className="card-title">{anime.nome}</div>
            </div>
        </a>
    )
}
