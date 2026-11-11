import { useEffect, useState } from 'react';
import Title from '../components/Title/Title';
import './css/dashboard.css';

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const receiveUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/dashboard', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          alert('Erro em devolver as informações do usuario');
          return;
        }

        setUser(await response.json());
      } catch (error) {
        console.log('Erro em requisitar as informações do usuario!', error);
      }
    };

    receiveUserData();
  }, []);

  return (
    <section className="dashboard">
      <Title as="h1" className="dashboard__title">{user.username}</Title>
      <p className="dashboard__email">{user.email}</p>
    </section>
  );
}

export default Dashboard;
