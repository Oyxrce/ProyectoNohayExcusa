document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const msg = document.getElementById('auth-msg');

    const isPageInSubfolder = window.location.pathname.includes('pages/');
    const indexPath = isPageInSubfolder ? '../INDEX.html' : 'INDEX.html';

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email === '' || password === '') {
                msg.textContent = 'Por favor, ingresa correo y contraseña.';
                msg.style.color = '#e53935';
                return;
            }
            
            const userPassword = localStorage.getItem(email);
            if (userPassword && userPassword === password) {
                localStorage.setItem('currentUserEmail', email);
                msg.textContent = '¡Bienvenido de nuevo! Redirigiendo...';
                msg.style.color = '#4CAF50';
                setTimeout(() => {
                    window.location.href = indexPath;
                }, 1500);
            } else {
                msg.textContent = userPassword ? 'Contraseña incorrecta.' : 'Usuario no registrado. Por favor, regístrate.';
                msg.style.color = '#e53935';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            if (email === '' || password === '') {
                msg.textContent = 'Por favor, ingresa correo y contraseña para registrarte.';
                msg.style.color = '#e53935';
                return;
            }

            if (localStorage.getItem(email)) {
                msg.textContent = 'Ese correo ya está registrado. Intenta iniciar sesión.';
                msg.style.color = '#e53935';
                return;
            }

            localStorage.setItem(email, password);
            msg.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
            msg.style.color = '#4CAF50';
            registerForm.reset();
        });
    }
});
