import './header.css'; 
import { useState } from 'react';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <section className="headerSection">
        <h1 className="headerTitle">My Blog</h1>
        <nav className="headerNav">
          <ul className={`headerNav-list ${isMenuOpen ? 'active' : ''}`}>
            <li className="headerNav-item"><a href="/" className="headerNav-link">Home</a></li>
            <li className="headerNav-item"><a href="/about" className="headerNav-link">About</a></li>
            <li className="headerNav-item"><a href="/contact" className="headerNav-link">Contact</a></li>
          </ul>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`bar1 ${isMenuOpen ? 'active' : ''}`}></div>
            <div className={`bar2 ${isMenuOpen ? 'active' : ''}`}></div>
            <div className={`bar3 ${isMenuOpen ? 'active' : ''}`}></div>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Header;