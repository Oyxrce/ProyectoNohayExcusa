document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const msg = document.getElementById('auth-msg');

    const isPageInSubfolder = window.location.pathname.includes('pages/');
    const indexPath = isPageInSubfolder ? '../INDEX.html' : 'INDEX.html';

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                msg.textContent = 'Completa todos los campos.';
                msg.style.color = '#e53935';
                return;
            }
            
            const userData = JSON.parse(localStorage.getItem(email));
            
            if (userData && userData.password === password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUserEmail', email);
                
                msg.textContent = 'Iniciando sesión...';
                msg.style.color = '#4CAF50';
                
                setTimeout(() => {
                    window.location.href = indexPath;
                }, 1000);
            } else {
                msg.textContent = 'Credenciales incorrectas.';
                msg.style.color = '#e53935';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const errors = document.querySelectorAll('.error-msg');
            errors.forEach(el => el.textContent = '');
            
            const nombre = document.getElementById('register-nombre').value.trim();
            const apellido = document.getElementById('register-apellido').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const telefono = document.getElementById('register-telefono').value.trim();
            const genero = document.getElementById('register-genero').value;
            const fecha = document.getElementById('register-fecha').value;
            const password = document.getElementById('register-password').value;
            
            let isValid = true;
            
            if (!nombre || nombre.length < 2) {
                document.getElementById('error-nombre').textContent = 'Mínimo 2 caracteres.';
                isValid = false;
            }
            
            if (!apellido || apellido.length < 2) {
                document.getElementById('error-apellido').textContent = 'Mínimo 2 caracteres.';
                isValid = false;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('error-email').textContent = 'Email inválido.';
                isValid = false;
            } else if (localStorage.getItem(email)) {
                document.getElementById('error-email').textContent = 'Email ya registrado.';
                isValid = false;
            }
            
            if (!telefono) {
                document.getElementById('error-telefono').textContent = 'Campo requerido.';
                isValid = false;
            }
            
            if (!genero) {
                document.getElementById('error-genero').textContent = 'Selecciona una opción.';
                isValid = false;
            }
            
            if (!fecha) {
                document.getElementById('error-fecha').textContent = 'Campo requerido.';
                isValid = false;
            } else {
                const hoy = new Date();
                const nacimiento = new Date(fecha);
                let edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mes = hoy.getMonth() - nacimiento.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                    edad--;
                }
                
                if (edad < 18) {
                    document.getElementById('error-fecha').textContent = 'Debes ser mayor de 18 años.';
                    isValid = false;
                }
            }
            
            if (!password || password.length < 6) {
                document.getElementById('error-password').textContent = 'Mínimo 6 caracteres.';
                isValid = false;
            }
            
            if (isValid) {
                const userData = {
                    nombre,
                    apellido,
                    email,
                    telefono,
                    genero,
                    fecha,
                    password
                };
                
                localStorage.setItem(email, JSON.stringify(userData));
                
                msg.textContent = 'Registro exitoso.';
                msg.style.color = '#4CAF50';
                
                registerForm.reset();
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                msg.textContent = 'Corrige los errores.';
                msg.style.color = '#e53935';
            }
        });
    }
});
