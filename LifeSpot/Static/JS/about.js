setTimeout(() => { alert('Добро пожаловать на страницу "О проекте"') }, 500);

function requestUserFeedback() {
    let review = new Map();

    
    //Имя пользователя
    do {
        review.set("userName", prompt("Введите Ваше имя (можно вымышленное)"));
        console.log(review.get("userName"));
    }
    while (review.get("userName") === ""); //Проверяю строку на пустоту, но позволяю выйти по Cancel (тогда userName == null)

    if (review.get("userName") == null) {
        return
    }

    //Отзыв пользователя
    do {
        review.set("message", prompt("Введите Ваш отзыв"));
        console.log(review.get("message"));
    }
    while (review.get("message") === ""); //Проверяю строку на пустоту, но позволяю выйти по Cancel (тогда message == null)

    if (review.get("message") == null) {
        return
    }

    //Дата-время, когда оставлен отзыв
    review.set("dateTime", new Date().toLocaleString());

    //Пишем на страницу
    writeReview(review);
}

/*
Стрелочная функция записи на страницу в блок <div> с классом review-block отзыва
Отзыв пишется в свой div с классом review-text. К нему можно применить стиль
*/
const writeReview = review => {
    let elem = document.getElementsByClassName("review-block")[0];

    elem.innerHTML += `<div class="review-text">\n` +
        `\t<p class="reviews-caption"><b>${review.get("userName")}</b> ${review.get("dateTime")}</p>\n` +
        `\t<p>${review.get("message")}</p>\n` +
        `</div>`;
}