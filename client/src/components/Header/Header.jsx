import './Header.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) return;

        const data = await response.json();
        setIsAdmin(data.admin === 1);
      } catch (error) {
        console.log(error);
      }
    };

    verifyAdmin();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <section className="headerSection">
        <Title as="h1" className="headerTitle">
          <Link to="/" className="headerTitle-link" onClick={closeMenu}>My Blog</Link>
        </Title>

        <nav className="headerNav">
          <ul className={`headerNav-list ${isMenuOpen ? 'active' : ''}`}>
            <li className="headerNav-item">
              <Link to="/" className="headerNav-link" onClick={closeMenu}>Inicio</Link>
            </li>
            <li className="headerNav-item">
              <Link to="/allposts" className="headerNav-link" onClick={closeMenu}>Todos</Link>
            </li>
            <li className="headerNav-item">
              <Link to="/login" className="headerNav-link" onClick={closeMenu}>Login</Link>
            </li>
            {isAdmin && (
              <li className="headerNav-item">
                <Link to="/addpage" className="headerNav-link" onClick={closeMenu}>Adicionar Pagina</Link>
              </li>
            )}
          </ul>

          <div className="hamburger" onClick={() => setIsMenuOpen((open) => !open)}>
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
