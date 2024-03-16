//@@@setTimeout(() => { alert('Добро пожаловать на страницу "О проекте"') }, 500);

function Comment() {
    //Имя пользователя
    do {
    this.author = prompt("Введите Ваше имя (можно вымышленное)")
    }
    while (this.author === ""); //Проверяю строку на пустоту, но позволяю выйти по Cancel (тогда userName == null)

    if (this.author == null) {
        return
    }

    //Отзыв пользователя
    do {
        this.text = prompt("Введите Ваш отзыв")
    }
    while (this.text === ""); //Проверяю строку на пустоту, но позволяю выйти по Cancel (тогда message == null)

    if (this.text == null) {
        return
    }

    //Дата-время, когда оставлен отзыв
    this.date = new Date().toLocaleString();
}

/*
* Оставить комментарий
* Доавляем коммент, вызываю функцию добавления коммента, а затем из него через протитип деляем отзыв с атрибутом разрешения лаков
* */
function addComment() {
    let comment = new Comment();

    //Этот код из модуля не работает!
    // проверяем, успешно ли юзер осуществил ввод
    //if (comment.empty) {
    //    return;
    //}

    //Если есть свойство даты коммента, значит пользовательский ввод успешен - не отконсолен
    if (!comment.hasOwnProperty("date")) {
        return;
    }

    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать Ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}

/*
Стрелочная функция записи на страницу в блок <div> с классом review-block отзыва/коммента
Отзыв пишется в свой div с классом review-text. К нему можно применить стиль
*/
const writeReview = review => {
    let likeCounter = '';

    // Для проверки, является ли объект отзывом, используем свойство hasOwnProperty
    if (review.hasOwnProperty('rate')) {
        likeCounter += `           <b style="color: chocolate">Рейтинг:</b>   <button id ="${getRandomInt()}" onclick=addLike(this.id)>❤️   ${review.rate}</button>`;
    }

    //Ищем элемент-контейнер для всех отзывов по имени класса
    let elem = document.getElementsByClassName("review-block")[0];

    // Запишем результат
    elem.innerHTML += `<div class="review-text">\n` +
        `\t<p class="reviews-caption"><b>${review['author']}</b> ${review['date']}${likeCounter}</p>\n` +
        `\t<p>${review['text']}</p>\n` +
        `</div>`;
}

/*
* Получение случайного числа
*/
function getRandomInt() {
    min = Math.ceil(0); //Минимальное значение
    max = Math.floor(10001); //Максимальное значение (10000) + 1
    return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);

    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ')

    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);

    // Увеличим счётчик
    resultNum += 1

    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`

    // Обновим текст элемента
    element.innerText = array.join(' ')
}