import './header.css'; 
import { useState } from 'react';
import { useEffect } from "react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      
      const verifyAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          console.log('Erro em enviar/receber as informações', response.statusText);
          return;
        }
        const data = await response.json()
        if(data.isAdmin === true) {
          setIsAdmin(true);
       }
        else {
          setAddPage(false)
        }
      } catch(error) {
        console.log(error)
      }
      }
      verifyAdmin();
    }, []);
    
  return (
    <header className="header">
      <section className="headerSection">
        <h1 className="headerTitle">My Blog</h1>
        <nav className="headerNav">
          <ul className={`headerNav-list ${isMenuOpen ? 'active' : ''}`}>
            <li className="headerNav-item"><a href="/" className="headerNav-link">Home</a></li>
            <li className="headerNav-item"><a href="/allPosts" className="headerNav-link">All posts</a></li>
             <li className="headerNav-item"><a href="/login" className="headerNav-link">Login</a></li>
            {isAdmin && (
              <li className="headerNav-item">
                <a href="/addPage" className="headerNav-link">Add Page</a>
              </li>
            )}
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