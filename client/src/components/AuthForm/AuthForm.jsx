import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import Button from '../Button/Button';
import { Popup } from '../Popup/Popup';
import './AuthForm.css';

const EMPTY_FORM = { username: '', email: '', password: '' };

function AuthForm({ mode = 'login' }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const navigate = useNavigate();
  const isSignup = mode === 'signup';

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return 'Preencha todos os campos obrigatórios.';
    }
    if (isSignup && (!formData.username || formData.username.length < 3)) {
      return 'O nome de usuário deve ter pelo menos 3 caracteres.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Digite um e-mail válido.';
    }
    if (formData.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    return '';
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsPopupOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/${isSignup ? 'signup' : 'login'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setIsPopupOpen(true);
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(data.error || data.message || 'Falha na autenticação.');
        setIsPopupOpen(true);
      }
    } catch (err) {
      console.error(`Error during ${isSignup ? 'signup' : 'login'}:`, err);
      setError('Erro de conexão com o servidor.');
      setIsPopupOpen(true);
    }
  };

  return (
    <section className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <Title as="h2" className="auth__title">
          {isSignup ? 'Sign Up' : 'Login'}
        </Title>

        {isSignup && (
          <input
            className="auth__input"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        )}

        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="button auth__button">
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>

        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title={error ? 'Erro' : 'Sucesso!'}
          content={
            error ||
            (isSignup
              ? 'Conta criada com sucesso!'
              : 'Você foi logado com sucesso!')
          }
        />

        <p className="auth__message">
          {isSignup ? 'Already have an account? ' : 'Does not have an account? '}
          <Link to={isSignup ? '/login' : '/signup'}>
            {isSignup ? 'Login' : 'Sign Up'}
          </Link>
        </p>
      </form>
    </section>
  );
}

export default AuthForm;