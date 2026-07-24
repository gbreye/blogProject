import './css/login.css';



function Signup() {
    async function sendUserdata() {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
    }

    return (
        <section className="mainSection">
            <form className="loginForm">
                <h2 className="loginFormTitle">Sign Up</h2>
                <input id = "username" type="text" placeholder="Username" className="loginFormInput" />
                <input id = "email" type="email" placeholder="Email" className="loginFormInput" />
                <input id = "password" type="password" placeholder="Password" className="loginFormInput" />
                <button type="submit" className="loginFormButton">Sign Up</button>
            </form>
        </section>
    );
}

export default Signup;