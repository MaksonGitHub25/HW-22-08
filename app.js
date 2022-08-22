const mainBtnArray = document.querySelectorAll('.main-task-btn');
const secondBtnArray = document.querySelectorAll('.second-task-btn');
const blackboard = document.querySelector('#blackboard');

// alert('Привет пользователь! Это интернет магазин, в котором ты можешь купить любое животное(российского загарбника)');

const animalArray = [];

const category = {
    pets: ['cat', 'dog', 'hamster'],
    wild: ['deer', 'bear', 'jaguar'],
    sea: ['cavy', 'tuna', 'clown fish']
};

class Animal {
    FUTURE_AGE = 10;

    constructor(name, age, voice, category, id) {
        this.name = name,
        this.age = age,
        this.voice = voice,
        this.category = category,
        this.id = id
    }
    
    giveVoice() {
        addToBlackboard(this.voice);
    }


    calculateAnimalAge() {
        addToBlackboard(`After ${this.FUTURE_AGE} years ur animal will be ${this.age + this.FUTURE_AGE} years old!`);
    }

    sleep() {}

    eat() {}
}

class Cat extends Animal {
    constructor(name, age, voice, category, id, food) {
        super(name, age, voice, category, id);
        this.food = food;
    }

    sleep() {
        addToBlackboard(`${this.name} is sleep. Zzzzzzzzzzzzz`);
    }

    eat() {
        addToBlackboard(`${this.name} is eating ${this.food} now`);
    }

    sayMeow() {
        addToBlackboard('meow');
    }

    get getName() {
        return this.name;
    }

    set setNewName(newName) {
        this.name = newName;
    }

    get getAllDataV1() {
        return this;
    }

    get getAllDataV2() {
        return [this.name, this.age, this.voice, this.category, this.id, this.food];
    }
}


function showChoosenCategory(animalArray) {
    const choosenCategory = prompt('Животных какой категории тебе показать?');

    if (!checkChoosenCategoryData(choosenCategory)) {
        alert('Такой категории нету!');
        return;
    }

    printSeparator();
    animalArray.forEach(function (elem) {
        if (elem.category === choosenCategory) {
            addToBlackboard(`name: ${elem.name}
age: ${elem.age}
voice: ${elem.voice}
category: ${elem.category}
id: ${elem.id}`);
        }
    });
}

function checkChoosenCategoryData(choosenCategory) {
    return Object.keys(category).some((elem) => elem === choosenCategory);
}

// ------------------------------------------

function showAllAnimals(animalArray) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    }

    printSeparator();
    animalArray.forEach((elem) => {
        addToBlackboard(`name: ${elem.name}
age: ${elem.age}
voice: ${elem.voice}
category: ${elem.category}
id: ${elem.id}`);
    });
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

    //! var 1 (old)
    //? const animal = new Animal(animalName, animalAge, animalVoice, animalCategory, getID(animalArray));
    //? console.log(animal);
    
    //! var 2 (new)
    printSeparator();
    const animal = new Animal(animalName, animalAge, animalVoice, animalCategory, 228);
    addToBlackboard(convertObjDataToText(animal));
    
    if (animalArray.length === 0 || checkAnimalsNameOnSame(animalArray, animalName)) {
        animalArray.push(animal);
        getIdEachAnimal(animalArray);
    } else { 
        alert('Животное с таким именем уже существует!');
        addNewAnimal(animalArray);
        return;
    }
}

function getIdEachAnimal(array) {
    //! var 1
    for (let i = 0; i < array.length; i++) {
        array[i].id = i+1;
    }

    //! var 2
    //? array.forEach(function (elem, index) {
    //?     elem.id = index+1;
    //? });
}

function getID(array) {
    return array.length+1;
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

function convertObjDataToText(animal) {
    return `name: ${animal.name}\nage: ${animal.age}\nvoice: ${animal.voice}\ncategory: ${animal.category}\nid: ${animal.id}`;
}

// ------------------------------------------

function deleteAnimal(animalArray) {
    const animalForDelete = prompt('Какое имя у животного, которого ты хочешь удалить?');

    animalArray.forEach(function (elem, index) {
        if (elem.name === animalForDelete) {
            animalArray.splice(index, 1);
        }
    });

    printSeparator();
    addToBlackboard('Животное удаленно!');
}

// ------------------------------------------

function sortingAnimalArray(animalArray) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    }

    const sortingFunc = prompt('Как будем сортировать животных?\n1) По увеличению\n2) По уменьшению\nНапиши q, чтоб выйти');

    if (sortingFunc === 'q') {
        return;
    }

    if (!checkSortingFuncData(sortingFunc)) {
        alert('Данные не валидны!');
        sortingAnimalArray(animalArray);
        return;
    }

    switch (sortingFunc) {
        case '1':
            sortingByAscending(animalArray);
            break;

        case '2':
            sortingByDecreasing(animalArray);
            break;
    
        default:
            break;
    }

    printSeparator();
    addToBlackboard('Список животных отсортирован!');
}

function checkSortingFuncData(sortingFunc) {
    if (
        /1|2/g.test(sortingFunc) &&
        !isNaN(+sortingFunc)
    ) {
        return true;
    }
}

function sortingByAscending(arrayForSort) {
    arrayForSort.sort(function (a, b) {
        if (+a.age > +b.age) {
            return 1;
        }
        
        if (+a.age < +b.age) {
            return -1;
        }

        return 0;
    });
}

function sortingByDecreasing(arrayForSort) {
    arrayForSort.sort(function (a, b) {
        if (+a.age < +b.age) {
            return 1;
        }
        
        if (+a.age > +b.age) {
            return -1;
        }

        return 0;
    });
}

// ------------------------------------------

function filterAnimalsInArray(arrayForFilter) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    }

    const categoryForFilter = prompt('Выбери какую категорию хочешь оставить(все животные других категорий удалятся)?\nНапиши q, чтоб выйти');

    if (categoryForFilter === 'q') {
        return;
    }

    // arrayForFilter = arrayForFilter.filter((elem) => elem.category === categoryForFilter); //dont work, damn...

    arrayForFilter.forEach(function (elem, index) {
        if (elem.category !== categoryForFilter) {
            arrayForFilter.splice(index, 1);
        }
    });

    printSeparator();
    addToBlackboard('Список животных отфильтрован!');
}

// ------------------------------------------

function clearBlackboard() {
    blackboard.textContent = '';
}

// ------------------------------------------

const animal = new Animal('hui', 18, 'uh', 'sea', 294389);
const cat = new Cat('nigga', 9, 'gug', 'pets', 130459, 'fish');

function printAllTestInstans() {
    printSeparator();

    addToBlackboard(`-------------------------[animal]--------------------------\n${convertObjDataToText(animal)}`);
    addToBlackboard(`---------------------------[cat]----------------------------\n${convertObjDataToText(cat)}`);
}

function testClassOnCat() {
    printSeparator();

    animal.eat();
    animal.sleep();
    animal.calculateAnimalAge();
    
    cat.sayMeow();
    cat.eat();
    cat.sleep();
}

function changeCatName() {
    printSeparator();

    getAnimalNameByPrototype(); // надо запустить эту fucktion, чтоб инициализировать cat.getAnimalNameByPrototype()

    addToBlackboard(`[old name]: ${cat.getAnimalNameByPrototype()}`);
    cat.setNewName = prompt('Как теперь будут звать вашего питомца?');
    addToBlackboard(`[new name]: ${cat.getAnimalNameByPrototype()}`);
}

function getAllAnimalData() {
    printSeparator();

    addToBlackboard(`Cat data: ${cat.getAllDataV2.join(' ')}`);
}

function getAnimalNameByPrototype() {
    Cat.prototype.getAnimalNameByPrototype = function () { return this.name }

    printSeparator();
    addToBlackboard(`[name]: ${cat.getAnimalNameByPrototype()}`);
}


function addToBlackboard(text) {
    blackboard.textContent += `${text}\n`;
}

function printSeparator() {
    addToBlackboard('===================================');
}

(function () {
    const mainFunction = [showChoosenCategory, showAllAnimals, addNewAnimal, deleteAnimal, sortingAnimalArray, filterAnimalsInArray, clearBlackboard];
    const secondFunction = [printAllTestInstans, testClassOnCat, changeCatName, getAllAnimalData, getAnimalNameByPrototype];

    for (let i = 0; i < mainBtnArray.length; i++) {
        mainBtnArray[i].addEventListener('click', function () {
            mainFunction[i](animalArray);
        });
    }

    for (let i = 0; i < secondBtnArray.length; i++) {
        secondBtnArray[i].addEventListener('click', function () {
            secondFunction[i](animalArray);
        });
    }
})();