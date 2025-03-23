import React, { useContext, useState } from 'react';
import { LetterContext } from '../context/LetterContext';

const Header = () => {
    const { selectLetterHandler } = useContext(LetterContext);
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const [activeLetter, setActiveLetter] = useState(null);
    const [isNavActive, setIsNavActive] = useState(false);

    const handleLetterClick = (letter) => {
        setActiveLetter(letter);
        selectLetterHandler(letter);
        setIsNavActive(false); // Close the navigation menu when a letter is clicked
    };

    const handleHamburgerClick = () => {
        setIsNavActive(!isNavActive);
    };

    return (
        <header>
            <h1>
                Book Library
                <span>Click on a letter to see books starting with that letter.</span>
            </h1>

            <nav className={`nav ${isNavActive ? 'active' : ''}`} id="nav">
                <button className={`hamburger ${isNavActive ? 'active' : ''}`} id="hamburger" onClick={handleHamburgerClick}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
                <ul id="alphabet-glossary" className={isNavActive ? 'active' : ''}>
                    {alphabet.map((letter) => (
                        <li
                            key={letter}
                            id={letter.toUpperCase()}
                            className={activeLetter === letter ? 'selected' : ''}
                            onClick={() => handleLetterClick(letter)}
                        >
                            {letter.toUpperCase()}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
