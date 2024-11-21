import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Tere tulemast ülesannete haldamise süsteemi!</h1>
            <p>Palun logige sisse või registreeruge.</p>

            <div style={{ marginTop: '20px' }}>
                <Link to="/login">
                    <button style={{ marginRight: '10px' }}>Sisse</button>
                </Link>
                <Link to="/register">
                    <button>Registreerimine</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
