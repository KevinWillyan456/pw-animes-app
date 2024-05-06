import { Link } from 'react-router-dom'
import { IAnime } from '../types/Anime'
import './Card.css'

interface ICard {
    anime: IAnime
    style: React.CSSProperties
}

export function Card({ anime, style }: ICard) {
    return (
        <Link to={`/anime/${anime._id}`}>
            <div className="card" style={style}>
                <div className="card-img">
                    <img src={anime.urlCapa} />
                </div>
                <div className="card-title">{anime.nome}</div>
            </div>
        </Link>
    )
}
