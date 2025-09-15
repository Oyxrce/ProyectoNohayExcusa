document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMsg = document.getElementById('login-msg');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if (email === '' || password === '') {
                loginMsg.textContent = 'Por favor, ingresa correo y contraseña.';
                loginMsg.style.color = '#e53935';
                return;
            }
            
            const user = localStorage.getItem(email);
            if (user) {
                if (user === password) {
                    loginMsg.textContent = '¡Bienvenido de nuevo!';
                    loginMsg.style.color = '#4CAF50';
                } else {
                    loginMsg.textContent = 'Contraseña incorrecta.';
                    loginMsg.style.color = '#e53935';
                }
            } else {
                localStorage.setItem(email, password);
                loginMsg.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
                loginMsg.style.color = '#4CAF50';
            }
        });
    }
});
