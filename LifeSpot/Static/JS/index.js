/*
* Сессия теперь создается в общей области видимости.
* Будет "захватываться" тремя функциями
*/
let session = new Map();

/*
* Задание 29.1.1
* Функция для фильтрации контента
* Будет вызываться благодаря атрибуту oninput на index.html
*/
function filterContent() {
    // Находим контейнеры с видео, которые необходимо фильтровать
    let elements = document.getElementsByClassName('video-container');

    // Пробегаемся по контейнерам
    for (let i = 0; i < elements.length; i++) {
        // Вытаскиваем текст описания видео, которое необходимо отфильтровать
        let videoText = elements[i].querySelector(".video-title").innerText;
        // Выполняем фильтрацию, сравнивая значения в нижнем регистре
        if (!videoText.toLowerCase().includes(inputParseFunction/* Задание 29.5.4 - Захват переменной теперь происходит с помощью замыкания */.toLowerCase())) {
            // Скрываем неподходящие
            elements[i].style.display = 'none';
        }
        else {
            // Показываем подходящие
            elements[i].style.display = 'inline-block';
        }
    }
}

/*
* Задание 29.1.2
* Функция для проверки и сохранения  данных пользователя
* Также блокирует доступ к сайту лицам, не подтвердившим свой возраст
*/

function handleSession() {
    // Сохраним время начала сессии
    session.set("startDate", new Date().toLocaleString())
    // Сохраним UserAgent
    session.set("userAgent", window.navigator.userAgent)
}

function checkAge() {
    // Запросим возраст пользователя и тоже сохраним
    session.set("age", prompt("Пожалуйста, введите ваш возраст"))

    // Проверка на возраст и сохранение сессии
    if (session.get("age") >= 18) {        
        alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + new Date().toLocaleString());
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

//Задание 29.3.8
const sessionLog = function logSession() {
    // Вывод в консоль
    for (let result of session) {
        console.log(result)
    }
}

function getUserInput() {
    return document.getElementsByTagName('input')[0].value.toLowerCase();
}

setTimeout(function () { alert('Подпишитесь на наш инстаграмм') }, 60000);