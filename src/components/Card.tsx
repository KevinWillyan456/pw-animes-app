import { Link } from 'react-router-dom'
import { IAnime } from '../types/Anime'
import './Card.css'
import { IonImg } from '@ionic/react'

interface ICard {
    anime: IAnime
    style: React.CSSProperties
}

export function Card({ anime, style }: ICard) {
    return (
        <Link to={`/anime/${anime._id}`}>
            <div className="card" style={style}>
                <div className="card-img">
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
                <div className="card-title">{anime.nome}</div>
            </div>
        </Link>
    )
}
