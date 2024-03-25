let activeSlideIndex; //Индекс текущего (активного) слайда

let slidesList; // список слайдов

let indicatorsList; // Список индикаторов (кругов)
let activeTownName; //Название города на активном слайде

let buttonPrev; //Кнопка перехода назад
let buttonNext; //Кнопка перехода вперед

let townNames = ['Санкт-Петербург', 'Нью-Йорк', 'Лондон']; //Массив городов

/*
* Класс отслеживания действий мышью
*/
let mouseTracker = {
    isBegin: false, //Начало возможного перелистывания слайда
    positionX: 0, //Позиция указателя мыши при событии mouseDown
    allowSwipeRight: true, //Возможность листать вправо (начальная позиция - 1-й слайд)
    allowSwipeLeft: false //Возможность листать влево (начальная позиция - 1-й слайд)
};

Initialise();

/*
* Функция инициализации переменных - получение элементов DOM-дерева
*/
function Initialise() {
    activeSlideIndex = 0;

    slidesList = document.getElementsByClassName('slider-item');
    indicatorsList = document.getElementsByClassName('slider-indicator');
    activeTownName = document.getElementById('activeTownName');

    buttonPrev = document.getElementById('bt-prev');
    buttonNext = document.getElementById('bt-next');

    if (slidesList.length != indicatorsList.length || slidesList.length != townNames.length || indicatorsList.length != townNames.length) {
        console.log('Разработчик! Исправь количество элементов (слайды, индикаторы, массив городов)!');
    }

    //Отображаем первый слайд (предыдущего слайда не было => -1)
    displayActiveSlide(-1);
}

/*
* Функция вызова переключения слайда вперед (вправо)
*/
function goForward () {
    let lastIndex = activeSlideIndex
    activeSlideIndex++;
    displayActiveSlide(lastIndex);
}

/*
* Функция вызова переключения слайда назад (влево)
*/
function goBack() {
    let lastIndex = activeSlideIndex
    activeSlideIndex--;
    displayActiveSlide(lastIndex);
}

/*
* Функция переключения слайда
*/
function displayActiveSlide(lastIndex) {
    if (lastIndex != -1) {
        slidesList[lastIndex].classList.remove('slider-item-active');
        indicatorsList[lastIndex].classList.remove('slider-indicator-selected');

        //Удаляю события с "ушедшего" слайда
        slidesList[lastIndex].children[0].removeEventListener('mousedown', mouseEventHandler);
        slidesList[lastIndex].children[0].removeEventListener('mousemove', mouseEventHandler);
        slidesList[lastIndex].children[0].removeEventListener('mouseup', mouseEventHandler);
    }

    slidesList[activeSlideIndex].classList.add('slider-item-active');
    indicatorsList[activeSlideIndex].classList.add('slider-indicator-selected');
    activeTownName.innerText = townNames[activeSlideIndex];

    // Навешиваем событие на активный слайд для свапа
    slidesList[activeSlideIndex].children[0].addEventListener('mousedown', mouseEventHandler);
    slidesList[activeSlideIndex].children[0].addEventListener('mousemove', mouseEventHandler);
    slidesList[activeSlideIndex].children[0].addEventListener('mouseup', mouseEventHandler);

    if (activeSlideIndex == 0) {
        buttonPrev.style.display = "none";
        mouseTracker.allowSwipeLeft = false;
    }
    else {
        buttonPrev.style.display = "unset";
        mouseTracker.allowSwipeLeft = true;
    }

    if (activeSlideIndex == slidesList.length - 1) {
        buttonNext.style.display = "none";
        mouseTracker.allowSwipeRight = false;
    }
    else {
        buttonNext.style.display = "unset";
        mouseTracker.allowSwipeRight = true;
    }
}

/*
* Функция вызова переключения слайда через индикаторы (круги)
*/
function change(id) {
    let lastIndex = activeSlideIndex
    activeSlideIndex = id;
    displayActiveSlide(lastIndex);
}


/*
* Обработчик событий мыши (свайпер)
*/
function mouseEventHandler(event) {
    switch (event.type)
    {
        case 'mousedown':
            event.preventDefault(); //Иначе при mouseMove не срабатывает mouseUp
            mouseTracker.isBegin = true;
            mouseTracker.positionX = event.clientX;
            break;

        case 'mousemove':
            if (mouseTracker.isBegin) {
                if (mouseTracker.positionX - event.clientX > 100) {
                    mouseTracker.isBegin = false;
                    if (mouseTracker.allowSwipeLeft) {
                        goBack();
                    }                    
                }

                if (mouseTracker.positionX - event.clientX < -100) {
                    mouseTracker.isBegin = false;
                    if (mouseTracker.allowSwipeRight) {
                        goForward();
                    }                    
                }
            }
            break;

        case 'mouseup':
            mouseTracker.isBegin = false;
            break;
    }
}
