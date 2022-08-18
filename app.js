const btn = document.querySelector('.btn');

// alert('Привет пользователь! Это интернет магазин, в котором ты можешь купить любое животное(российского загарбника)');

const animalArray = [];

function Animal(name, age, sound) {
    {
        this.name = name,
        this.age = age,
        this.sound = sound,
        this.giveVoice = function () {
            console.log(sound);
        }
    }
}

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
    // const functionArray = [showChoosenCategory, showAllAnimals, addNewAnimal, deleteAnimal, exit];
    // functionArray[+choosenFunc - 1]();

    switch (choosenFunc) {
        case '1':
            showChoosenCategory();
            menu();
            break;
        
        case '2':
            showAllAnimals(animalArray);
            menu();
            break;

        case '3':
            addNewAnimal(animalArray);
            menu();
            break;

        case '4':
            deleteAnimal(animalArray);
            menu();
            break;

        case '5':
            exit();
            break;
    
        default:
            break;
    }
}

function showChoosenCategory() {
    console.log('showChoosenCategory');
}

function showAllAnimals(animalArray) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    } else {
        animalArray.forEach((elem) => console.log(elem));
    }
}

function isArrayEmpty(array) {
    if (array.length === 0) {
        return true;
    }
}

function addNewAnimal(animalArray) {
    const animalName = prompt('Как зовут вашего животного?');
    const animalAge = prompt('Сколько лет вашему животному?');
    const animalVoice = prompt('Какой звук издает ваше животное?');

    if (!checkAnimalData(animalName, animalAge, animalVoice)) {
        alert('Данные не валидны!');
        addNewAnimal(animalArray);
        return;
    }

    const animal = new Animal(animalName, animalAge, animalVoice);
    console.log(animal);
        
    if (animalArray.length === 0 || checkAnimalsName(animalArray, animalName)) {
        animalArray.push(animal);
        console.log(animalArray);
    } else { 
        alert('Животное с таким именем уже существует!');
        addNewAnimal(animalArray);
        return;
    }
}

function checkAnimalData(name, age, voice) {
    if (
        name !== '' &&
        age !== '' &&
        voice !== '' &&
        name.length > 1 &&
        !/[0-9]/.test(name) &&
        !isNaN(age)
    ) {
        return true;
    }
}

function checkAnimalsName(animalArray, nameForCheck) {
    return !animalArray.some((element) => element.name === nameForCheck);
}

function deleteAnimal(animalArray) {
    const animalForDelete = prompt('Какое имя у животного, которого ты хочешь удалить?');

    animalArray.forEach(function (elem, index) {
        if (elem.name === animalForDelete) {
            animalArray.splice(index, 1);
        }
    });
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
//* 3) Добавить животное
//* 4) Удалить животное
//* 5) Закончить работу с программой

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
//* 3) В массиве не должно быть животных
// с одинаковыми именами
// 4) Животных можно сортировать по
// возрасту , можно фильтровать по
// категории
//* 5) Можно убирать и добавлять новых
//* животных