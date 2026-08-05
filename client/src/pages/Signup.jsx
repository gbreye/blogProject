import './css/login.css';
import { useState } from 'react';


function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password) {
            console.log('Form is invalid. Please fill in all fields.');
            return false;
        }
        if (formData.username.length < 3) {
            console.log('Form is invalid. Username must be at least 3 characters long.');
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
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Signup successful');
                console.log('Signup successful');
                navigate("/");
            } else {
                alert('Signup failed', error);
                console.error('Signup failed');
            }
        } catch (error) {
            console.log('Error during signup:', error);
        }
    };

    async function sendUserdata() {
        
    }

    return (
        <section className="heroSection">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2 className="loginFormTitle">Sign Up</h2>
                <input id = "username" value={formData.username} onChange={handleChange} name="username" type="text" placeholder="Username" className="loginFormInput" />
                <input id = "email" value={formData.email} onChange={handleChange} name="email" type="email" placeholder="Email" className="loginFormInput" />
                <input id = "password" value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Password" className="loginFormInput" />
                <button type="submit" className="loginFormButton">Sign Up</button>
                <p id="message"></p>
            </form>
        </section>
    );
}

export default Signup;