import './css/login.css';
import { useState } from 'react';


function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            console.log('Form is invalid. Please fill in all fields.');
            return false;
        }
        if (formData.password.length < 6) {
            console.log('Form is invalid. Password must be at least 6 characters long.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            console.log('Form is invalid. Please enter a valid email address.');
            return false;
        }
        return true;
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            if (!validateForm()) {
                return;
            }
            else {
                console.log('Form is valid. Proceeding with signup...');
            }
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('login sucedido');
                console.log('deu certo ai paezão');
                navigate("/");
            } else {
                alert('erro no login');
                console.error('login deu ruim ai tropa');
            }
        } catch (error) {
            console.log('Error during signup:', error);
        }
    };

    async function sendUserdata() {
        
    }

    return (
        <section className="mainSection">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2 className="loginFormTitle">Login</h2>
                <input id = "email" value={formData.email} onChange={handleChange} name="email" type="email" placeholder="Email" className="loginFormInput" />
                <input id = "password" value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Password" className="loginFormInput" />
                <button type="submit" className="loginFormButton">Sign Up</button>
                <p id="message"></p>
            </form>
        </section>
    );
}

export default Login;