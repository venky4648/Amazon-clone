import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Make sure this path is correct

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Sign-in successful:', userCredential);
                navigate('/');
            })
            .catch((error) => {
                console.error('Sign-in error:', error);
                alert('Sign-in failed: ' + error.message);
            });
    };

    const register = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Registration successful:', userCredential);
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration error:', error);
                alert('Registration failed: ' + error.message);
            });
    };

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt="Amazon logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={signIn}>
                    <h5>E-mail</h5>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type='submit' className='login__signInButton'>
                        Sign In
                    </button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>
                    Create your Amazon Account
                </button>
            </div>
        </div>
    );
}

export default Login;
