import { useEffect, useState } from 'react';
import "./HomePage.css";
import Header from '@/components/header';
import { LetterContext } from '../context/LetterContext';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState('');
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch("/api/data");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setBooks(result.data);
            } catch (error) {
                console.error("Error fetching books:", error.message);
                setError("Failed to fetch books");
            }
        }

        fetchBooks();
    }, []);

    const selectLetterHandler = (letter) => {
        setSelectedLetter(letter);
        console.log(`Selected letter: ${letter}`);
    };

    return (
        <LetterContext.Provider value={{ selectLetterHandler }}>
            <div>
                <Header />
                <main>
                    <div className="content-container" id="content-container">
                        {error && <p>{error}</p>}
                        {alphabet.map((letter) => (
                            <div key={letter} className={`content ${selectedLetter === letter ? 'active' : ''}`} id={`div_${letter}`}>
                                {books.filter(book => book.title.toLowerCase().startsWith(letter)).map((book) => (
                                    <div key={book.id} className="card" id={`book-${book.id}`}>
                                        <img src={book.cover_image} alt={`${book.title} cover`} />
                                        <h3>{book.title}</h3>
                                        <em>by {book.author}</em>
                                        <br />
                                        <small>{book.publication_year}</small>
                                        <br />
                                        <p>{book.description}</p>
                                        <br />
                                        <span>Genres: {book.genre.join(', ')}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </LetterContext.Provider>
    );
}
