  // Функция для переключения видимости меню тем
        function toggleThemeOptions() {
            const options = document.getElementById('themeOptions');
            options.style.display = options.style.display === 'block' ? 'none' : 'block';
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
            document.getElementById('themeOptions').style.display = 'none';
        }
        
        // При загрузке страницы восстанавливаем сохраненную тему
        window.addEventListener('DOMContentLoaded', (event) => {
            const savedTheme = localStorage.getItem('selectedTheme') || 'default';
            setTheme(savedTheme);
        });
        
        // Закрываем меню выбора тем при клике вне его
        document.addEventListener('click', function(event) {
            const themeSwitcher = document.querySelector('.theme-switcher');
            if (!themeSwitcher.contains(event.target)) {
                document.getElementById('themeOptions').style.display = 'none';
            }
        });


document.getElementById('submitBtn').addEventListener('click', function() {
  const btn = this;
  const btnText = btn.querySelector('.btn-text');
  const loadingSpinner = btn.querySelector('.loading-spinner');

  // Проверка существования элементов
  if (!btnText || !loadingSpinner) {
    console.error('Не найдены необходимые элементы внутри кнопки');
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

function resetButtonState(btn, btnText, loadingSpinner) {
  btnText.style.display = 'inline';
  loadingSpinner.style.display = 'none';
  btn.disabled = false;
  btn.style.minWidth = ''; // Убираем фиксированную ширину
}









class TimeTravelStory {
    constructor() {
        this.currentScene = 1;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupRippleEffects();
    }

    setupEventListeners() {
        // Запуск машины времени
        document.getElementById('startBtn').addEventListener('click', (e) => {
            if (!this.isTransitioning) {
                this.activateTimeMachine(e);
            }
        });

        // Рестарт истории
        document.getElementById('restartBtn').addEventListener('click', (e) => {
            this.createRipple(e);
            this.restartStory();
        });
    }

    setupRippleEffects() {
        document.querySelectorAll('.ripple').forEach(button => {
            button.addEventListener('click', this.createRipple.bind(this));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Удаляем старые ripple эффекты
        const oldRipples = button.querySelectorAll('.ripple-effect');
        oldRipples.forEach(oldRipple => {
            oldRipple.remove();
        });

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    if (entry.target.classList.contains('scene')) {
                        this.currentScene = parseInt(entry.target.id.replace('scene', ''));
                        this.updateSceneIndicator();
                    }
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        });

        document.querySelectorAll('.pyramid, .character, .castle, .spaceship, .scene').forEach(el => {
            observer.observe(el);
        });
    }

    async activateTimeMachine(e) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const portal = document.getElementById('portal');
        const startBtn = document.getElementById('startBtn');
        const btnText = startBtn.querySelector('.btn-text');
        const loadingSpinner = startBtn.querySelector('.loading-spinner');

        // Показываем спиннер
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
        startBtn.disabled = true;

        // Создаем ripple эффект
        this.createRipple(e);

        // Анимация активации портала
        portal.style.animation = 'portal-activate 2s forwards';
        
        // Создаем частицы для эффекта телепортации
        this.createParticles();

        // Ждем завершения анимации
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Переход к следующей сцене
        document.getElementById('scene2').scrollIntoView({ 
            behavior: 'smooth' 
        });

        // Восстанавливаем кнопку
        setTimeout(() => {
            btnText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
            startBtn.disabled = false;
            this.isTransitioning = false;
        }, 3000);
    }

    createParticles() {
        const portal = document.getElementById('portal');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        portal.appendChild(particlesContainer);

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Используем CSS переменные для случайных значений
                const randomX = Math.random();
                const randomY = Math.random();
                particle.style.setProperty('--random-x', randomX);
                particle.style.setProperty('--random-y', randomY);
                
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 0.5 + 's';
                
                particlesContainer.appendChild(particle);

                // Удаляем частицу после анимации
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }, i * 60);
        }

        // Удаляем контейнер частиц после завершения
        setTimeout(() => {
            particlesContainer.remove();
        }, 3000);
    }

    updateSceneIndicator() {
        console.log(`Текущая сцена: ${this.currentScene}`);
        // Можно добавить визуальный индикатор прогресса
    }

    restartStory() {
        document.getElementById('scene1').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Сбрасываем анимации
        setTimeout(() => {
            const portal = document.getElementById('portal');
            portal.style.animation = 'portal-glow 3s ease-in-out infinite alternate';
            
            document.querySelectorAll('.visible').forEach(el => {
                el.classList.remove('visible');
            });
            
            this.currentScene = 1;
        }, 1000);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', () => {
    new TimeTravelStory();
});
