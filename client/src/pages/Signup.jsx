import './css/login.css';
import { useState } from 'react';


function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Signup successful');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    async function sendUserdata() {
        
    }

    return (
        <section className="mainSection">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2 className="loginFormTitle">Sign Up</h2>
                <input id = "username" value={formData.username} onChange={handleChange} name="username" type="text" placeholder="Username" className="loginFormInput" />
                <input id = "email" value={formData.email} onChange={handleChange} name="email" type="email" placeholder="Email" className="loginFormInput" />
                <input id = "password" value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Password" className="loginFormInput" />
                <button type="submit" className="loginFormButton">Sign Up</button>
            </form>
        </section>
    );
}

export default Signup;