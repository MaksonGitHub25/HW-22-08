const btn = document.querySelector('.btn');

alert('Привет пользователь! Это интернет магазин, в котором ты можешь купить любое животное(российского загарбника)');

function menu() {
    const userFunctionChoosen = prompt(`Какую функцию выберем?
1) Просмотреть конкретную категорию
2) Все животные
3) Добавить животное
4) Удалить животное
5) Выйти`);

    checkUserInput(userFunctionChoosen);

    functionChooseHandler(userFunctionChoosen);
}

function checkUserInput(userFunctionChoosen) {
    if (/1|2|3|4|5/.test(userFunctionChoosen)) {
        return;
    } else {
        alert('Ты ввел неверное значение!');
        menu();
        return;
    }
}

function functionChooseHandler(choosenFunc) {
    const functionArray = [showChoosenCategory, showAllAnimals, addNewAnimal, deleteAnimal, exit];

    functionArray[+choosenFunc - 1]();

    // switch (choosenFunc) {
    //     case '1':
    //         showChoosenCategory();
    //         break;
        
    //     case '2':
    //         showAllAnimals();
    //         break;

    //     case '3':
    //         addNewAnimal();
    //         break;

    //     case '4':
    //         deleteAnimal();
    //         break;

    //     case '5':
    //         exit();
    //         break;
    
    //     default:
    //         break;
    // }
}

function showChoosenCategory() {
    console.log('showChoosenCategory');
}

function showAllAnimals() {
    console.log('showAllAnimals');
}

function addNewAnimal() {
    console.log('addNewAnimal');
}

function deleteAnimal() {
    console.log('deleteAnimal');
}

function exit() {
    alert('Хорошего дня!');
}

btn.addEventListener('click', menu);



//Функция ферма
// Функционал :
// 1) Просмотреть все категории =>
// выбрать категорию => все животные
// данной категории
// 2) Все животные
// 3) Добавить животное
// 4) Удалить животное
// 5) Закончить работу с программой

// 1) Создайте три объекта :
// птица , скот , домашние животные .
// В объектах ключами и айДи , категория
// - значение будет массив
// 2) При помощи функцииФермы мы
// предоставляем юзеру возможность
// производить новых животных в
// массивах , животные появляются в виде
// объектов с ключами : имя , возраст ,
// издаваемый звук , издать звук
// 3) В массиве не должно быть животных
// с одинаковыми именами
// 4) Животных можно сортировать по
// возрасту , можно фильтровать по
// категории
// 5) Можно убирать и добавлять новых
// животных