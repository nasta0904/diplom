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

  // Показываем спиннер, скрываем текст
  btnText.style.display = 'none';
  loadingSpinner.style.display = 'inline';

  // Делаем кнопку неактивной
  btn.disabled = true;

  // Эмулируем отправку данных (через 3 секунды возвращаем исходное состояние)
  setTimeout(function() {
    btnText.style.display = 'inline';
    loadingSpinner.style.display = 'none';
    btn.disabled = false;
  }, 3000);
});
