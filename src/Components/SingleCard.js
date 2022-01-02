import React from 'react';
import '../styles/card.scss';

const SingleCard = ({card, handleCardChoice, flipped, disabled}) => {

    const handleBackCard = () => {
        if(!disabled){
            handleCardChoice(card)
        }
    }
    return (
        <div className="card-container">
            <div className={flipped ? "card-flipped" : ""}>
                <img className='front' src={card.src} alt="card front" />
                <img className='back' src="/assets/background.png" alt="card back" onClick={handleBackCard}/>
            </div>
        </div>
    );
};

export default SingleCard;