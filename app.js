const btn = document.querySelector('.btn');

// alert('Привет пользователь! Это интернет магазин, в котором ты можешь купить любое животное(российского загарбника)');

const animalArray = [];

const category = {
    pets: ['cat', 'dog', 'hamster'],
    wild: ['deer', 'bear', 'jaguar'],
    sea: ['cavy', 'tuna', 'clown fish']
};

function Animal(name, age, voice, category) {
    {
        this.name = name,
        this.age = age,
        this.voice = voice,
        this.giveVoice = function () {
            console.log(voice);
        },
        this.category = category
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
            showChoosenCategory(animalArray);
            break;
        
        case '2':
            showAllAnimals(animalArray);
            break;

        case '3':
            addNewAnimal(animalArray);
            break;

        case '4':
            deleteAnimal(animalArray);
            break;

        case '5':
            exit(animalArray);
            break;
    
        default:
            break;
    }

    if (choosenFunc != '5') {
        menu();
        return;
    }
}

// ------------------------------------------

function showChoosenCategory(animalArray) {
    console.log('showChoosenCategory');
}

// ------------------------------------------

function showAllAnimals(animalArray) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    } else {
        animalArray.forEach((elem) => {
            alert(`name: ${elem.name}
age: ${elem.age}
voice: ${elem.voice}`);
        });
    }
}

function isArrayEmpty(array) {
    if (array.length === 0) {
        return true;
    }
}

// ------------------------------------------

function addNewAnimal(animalArray) {
    const listOfCategory = Object.keys(category).join('\n');

    const animalName = prompt('Как зовут вашего животного?');
    const animalAge = prompt('Сколько лет вашему животному?');
    const animalVoice = prompt('Какой звук издает ваше животное?');
    const animalCategory = prompt(`К какой категории относится ваше животное?\n${listOfCategory}`);

    if (!checkAnimalData(animalName, animalAge, animalVoice, animalCategory)) {
        alert('Данные не валидны!');
        addNewAnimal(animalArray);
        return;
    }

    const animal = new Animal(animalName, animalAge, animalVoice, animalCategory);
    console.log(animal);
        
    if (animalArray.length === 0 || checkAnimalsNameOnSame(animalArray, animalName)) {
        animalArray.push(animal);
        console.log(animalArray);
    } else { 
        alert('Животное с таким именем уже существует!');
        addNewAnimal(animalArray);
        return;
    }
}

function checkAnimalData(name, age, voice, category) {
    if (
        checkNameData(name) &&
        checkAgeData(age) &&
        checkVoiceData(voice) &&
        checkCategoryData(category)
    ) {
        return true;
    }
}

function checkNameData(name) {
    if (name !== '' && name.length > 1 && !/[0-9]/.test(name)) {
        return true;
    }
}

function checkAgeData(age) {
    if (age !== '' && !isNaN(age)) {
        return true;
    }
}

function checkVoiceData(voice) {
    if (voice !== '' && !/[0-9]/.test(voice)) {
        return true;
    }
}

function checkCategoryData(category) {
    if (
        category !== '' &&
        (category === 'pets' ||
        category === 'wild' ||
        category === 'sea')
    ) {
        return true;
    }
}

function checkAnimalsNameOnSame(animalArray, nameForCheck) {
    return !animalArray.some((element) => element.name === nameForCheck);
}

// ------------------------------------------

function deleteAnimal(animalArray) {
    const animalForDelete = prompt('Какое имя у животного, которого ты хочешь удалить?');

    animalArray.forEach(function (elem, index) {
        if (elem.name === animalForDelete) {
            animalArray.splice(index, 1);
        }
    });

    console.log(animalArray);
}

// ------------------------------------------

function exit() {
    alert('Хорошего дня!');
}


btn.addEventListener('click', menu);




//* Функция ферма
//* Функционал :
// 1) Просмотреть все категории =>
// выбрать категорию => все животные
// данной категории
//* 2) Все животные
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