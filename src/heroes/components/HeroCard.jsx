import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export const HeroCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters, }) => {
    const heroURL = `../images/${id}.jpg`;
    const CharactersByHero = ({ alter_ego, characters }) => {
        if (alter_ego === characters) { return (<></>); }
        return <p>{characters}</p>
    }

    return (
        <div className='col'>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4 animate__animated animate__fadeIn">
                        <img src={heroURL} alt={superhero} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className='card-title'>{superhero}</h5>
                            <p className='card-text'>{alter_ego}</p>
                            <CharactersByHero alter_ego={alter_ego} characters={characters} />
                            <p className='card-text'>
                                <small className='text-muted'>{first_appearance}</small>
                            </p>
                            <Link to={`/hero/${id}`}>
                                more...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

HeroCard.propTypes = {
    id: PropTypes.string.isRequired,
    superhero: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    alter_ego: PropTypes.string.isRequired,
    first_appearance: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired,
}
