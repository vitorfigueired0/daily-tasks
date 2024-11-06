import { useState } from 'react';
import './SignUp.css';
import obucLogo from '../../../assets/obuc-logo.png';

export const SignUp = () => {
	const [isSignUp, setIsSignUp] = useState(false);

	const toggleMode = () => {
		setIsSignUp((prev) => !prev);
	};

	return (
		<div id='main-wrapper'>
			<div id='form-div' className={isSignUp ? 'form-div-sigup' : 'form-div-sigin'}>
				<div id='form-header'>
					<figure><img src={obucLogo} alt='Logo' /></figure>
				</div>

				<form className={isSignUp ? 'form-signup' : 'form-signin'}>
					{isSignUp && (
						<input
							type='text'
							className='login-input'
							placeholder='Nome'
						/>
					)}
					<input
						type='email'
						className='login-input'
						placeholder='Email'
					/>
					<input
						type='password'
						className='login-input'
						placeholder='Senha'
					/>
					{isSignUp && (
						<input
							type='password'
							className='login-input'
							placeholder='Confirmar Senha'
						/>
					)}

					<button
						type='submit'
						className='submit-button'
					>
						{isSignUp ? 'Sing Up' : 'Sign In'}
					</button>
				</form>

				<p onClick={toggleMode} className='toggle-mode'>
					{isSignUp
						? 'Already have an account? Login'
						: `Don't have an account? Sign Up`}
				</p>
			</div>
		</div>
	);
};
