// Функция для переключения видимости меню тем
function toggleThemeOptions() {
    const options = document.getElementById('themeOptions');
    if (options) {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    }
}

// Функция для установки темы
function setTheme(themeName) {
    // Удаляем все классы тем
    document.body.classList.remove('default-theme', 'dark-theme', 'light-theme', 'neutral-theme', 'kids-theme');
    
    // Добавляем выбранную тему
    document.body.classList.add(themeName + '-theme');
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('selectedTheme', themeName);
    
    // Скрываем меню выбора тем
    const themeOptions = document.getElementById('themeOptions');
    if (themeOptions) {
        themeOptions.style.display = 'none';
    }
}

// При загрузке страницы восстанавливаем сохраненную тему
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(savedTheme);
    
    // Инициализация кнопки с загрузкой
    initSubmitButton();
});

// Закрываем меню выбора тем при клике вне его
document.addEventListener('click', function(event) {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeOptions = document.getElementById('themeOptions');
    
    if (themeSwitcher && themeOptions) {
        if (!themeSwitcher.contains(event.target)) {
            themeOptions.style.display = 'none';
        }
    }
});

// Функция для инициализации кнопки отправки
function initSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            // Создаем ripple эффект
            createRippleEffect(e);
            
            const btn = this;
            const btnText = btn.querySelector('.btn-text');
            const loadingSpinner = btn.querySelector('.loading-spinner');

            // Проверка существования элементов
            if (!btnText || !loadingSpinner) {
                console.error('Не найдены необходимые элементы внутри кнопки');
                return;
            }

            // Если кнопка уже в состоянии загрузки, выходим
            if (btn.disabled) {
                return;
            }

            // Сохраняем исходную ширину кнопки, чтобы избежать скачков
            const originalWidth = btn.offsetWidth;
            btn.style.minWidth = `${originalWidth}px`;

            // Показываем спиннер, скрываем текст
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'flex';
            btn.disabled = true;

            // Эмулируем отправку данных
            setTimeout(function() {
                resetButtonState(btn, btnText, loadingSpinner);
            }, 3000);
        });
    }
}

// Функция для сброса состояния кнопки
function resetButtonState(btn, btnText, loadingSpinner) {
    if (btnText && loadingSpinner) {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        btn.disabled = false;
        btn.style.minWidth = ''; // Убираем фиксированную ширину
    }
}

// Функция для создания ripple эффекта
function createRippleEffect(event) {
    const button = event.currentTarget;
    
    // Создаем элемент для эффекта
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    // Получаем позицию клика
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Устанавливаем стили
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Удаляем старые ripple эффекты
    const oldRipples = button.querySelectorAll('.ripple-effect');
    oldRipples.forEach(oldRipple => {
        oldRipple.remove();
    });
    
    // Добавляем новый ripple
    button.appendChild(ripple);
    
    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        if (ripple.parentNode === button) {
            ripple.remove();
        }
    }, 600);
}

// Добавляем обработчики для всех кнопок с классом .btn
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для обычных кнопок
    document.querySelectorAll('.btn:not(#submitBtn)').forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});
