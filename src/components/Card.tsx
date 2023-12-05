import PropTypes from "prop-types";

import "./Card.css";

export function Card({ anime }: any) {
    return (
        <a href={`/anime/${anime.id}`}>
            <div className="card">
                <div className="card-img">
                    <img src={anime.urlCapa} />
                </div>
                <div className="card-title">{anime.nome}</div>
            </div>
        </a>
    );
}

Card.propTypes = {
    anime: PropTypes.shape({
        urlCapa: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
};
