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
