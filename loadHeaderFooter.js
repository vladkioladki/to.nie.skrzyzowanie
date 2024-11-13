// Функция для загрузки HTML содержимого
function loadHTML(id, filename) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with ID '${id}' not found.`);
        return;
    }

    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            
            // После загрузки проверяем, нужно ли инициализировать меню
            if (id === 'header-container') {
                initializeMenuToggle();
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
            element.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        });
}

// Загружаем header и footer после полной загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
    loadHTML('header-container', 'header.html');
    loadHTML('footer-container', 'footer.html');
});

// Инициализация меню
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Для клика по заголовку
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

/////////////////////////////////////////////////////////BINARY_RAIN/////////////////////////////////////////////

const canvas = document.querySelector('.binary-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = '01';
const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(draw, 33);
// Массив символов, из которых будет происходить выбор
const symbols = [''];

// Функция для создания символа
function createSymbol() {
  const symbol = document.createElement('div');
  
  // Выбор случайного символа из массива
  symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  
  // Настройка стилей для символа
  symbol.style.position = 'fixed';
  symbol.style.left = Math.random() * window.innerWidth + 'px';
  symbol.style.top = -50 + 'px'; // Стартовая позиция выше экрана
  symbol.style.color = '#fff';
  symbol.style.fontSize = (Math.random() * 30 + 20) + 'px'; // Размер шрифта от 20px до 50px
  symbol.style.zIndex = '1';
  symbol.style.opacity = '0.5';
  symbol.style.transition = 'top 5s linear, opacity 5s linear'; // Плавное падение и исчезновение
  
  // Добавление символа на страницу
  document.body.appendChild(symbol);

  // Анимация для перемещения символа вниз и исчезновения
  setTimeout(() => {
    symbol.style.top = window.innerHeight + 'px'; // Опускаем символ до низа экрана
    symbol.style.opacity = '0'; // Символ станет прозрачным
  }, 10); // Начинаем анимацию сразу после добавления элемента
}

// Вызов функции каждую секунду для появления символов
setInterval(createSymbol, 1000);

/////////////////////////////////////////////////////////////////////POSTS///////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.querySelector('#articles-container');

    // List of articles to load
    const articles = ['posts/article1.html', 'posts/article2.html']; // Add your article paths here

    // Function to load articles dynamically
    function loadArticles() {
        articles.forEach(article => {
            fetch(article)
                .then(response => response.text())
                .then(html => {
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    const articleElement = div.querySelector('.article');
                    postsContainer.appendChild(articleElement);
                })
                .catch(err => console.warn('Error loading article:', err));
        });
    }

    loadArticles();

    // Handle click event for opening PDF
    postsContainer.addEventListener('click', function(event) {
        const article = event.target.closest('.article');
        
        if (article) {
            // Check if the clicked element has a link to a PDF
            const pdfLink = article.querySelector('.pdf-link');
            if (pdfLink) {
                // Open the PDF in a new tab
                window.open(pdfLink.href, '_blank');
            }
        }
    });
});
