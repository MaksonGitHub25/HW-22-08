const btn = document.querySelector('.btn');

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
        console.log(this.voice);
    }


    calculateAnimalAge() {
        console.log(`After ${this.FUTURE_AGE} years ur animal will be ${this.age + this.FUTURE_AGE} years old!`);
    }

    sleep() {}

    eat() {}
}

class Cat extends Animal {
    constructor(name, food) {
        super(name);
        this.food = food;
    }

    sleep() {
        console.log(`${this.name} is sleep. Zzzzzzzzzzzzz`);
    }

    eat() {
        console.log(`${this.name} is eating ${this.food} now`);
    }

    sayMeow() {
        console.log('meow');
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

function menu() {
    const userFunctionChoosen = prompt(`Какую функцию выберем?
1) Просмотреть конкретную категорию
2) Все животные
3) Добавить животное
4) Удалить животное
5) Сортировать список животных
6) Фильтровать по категории
7) Выйти
8) Создать кота для текста`);

    checkUserInput(userFunctionChoosen);

    functionChooseHandler(userFunctionChoosen);
}

function checkUserInput(userFunctionChoosen) {
    if (
        /1|2|3|4|5|6|7|8/g.test(userFunctionChoosen) &&
        !isNaN(+userFunctionChoosen)
    ) {
        return;
    } else {
        alert('Ты ввел неверное значение!');
        menu();
        return;
    }
}

function functionChooseHandler(choosenFunc) {
    // 1st variant
    // const functionArray = [showChoosenCategory, showAllAnimals, addNewAnimal, deleteAnimal, sortingAnimalArray, filterAnimalsInArray, exit];
    // functionArray[+choosenFunc - 1](animalArray);

    // 2nd variant
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
            sortingAnimalArray(animalArray);
            break;

        case '6':
            filterAnimalsInArray(animalArray);
            break;

        case '7':
            exit();
            break;

        case '8':
            // createCatForTest();
            break;
    
        default:
            break;
    }

    if (choosenFunc != '7') {
        menu();
        return;
    }
}

// ------------------------------------------

function showChoosenCategory(animalArray) {
    const choosenCategory = prompt('Животных какой категории тебе показать?');

    if (!checkChoosenCategoryData(choosenCategory)) {
        alert('Такой категории нету!');
        showChoosenCategory(animalArray);
        return;
    }

    animalArray.forEach(function (elem) {
        if (elem.category === choosenCategory) {
            alert(`name: ${elem.name}
age: ${elem.age}
voice: ${elem.voice}
category: ${elem.category}`);
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
    } else {
        animalArray.forEach((elem) => {
            alert(`name: ${elem.name}
age: ${elem.age}
voice: ${elem.voice}
category: ${elem.category}`);
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

    const animal = new Animal(animalName, animalAge, animalVoice, animalCategory, getRandomID());
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

function getRandomID() {
    return Math.floor(Math.random() * (999999 - 000001) + 000001);
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

function sortingAnimalArray(animalArray) {
    if (isArrayEmpty(animalArray)) {
        alert('Пока что нету никаких животных!');
        return;
    }

    const sortingFunc = prompt('Как будем сортировать животных?\n1) По увеличению\n2) По уменьшению');

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

    console.log(animalArray);
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

    console.log(arrayForFilter);
}

// ------------------------------------------

function exit() {
    alert('Хорошего дня!');
}

// ------------------------------------------

const animal = new Animal('hui', 18, 'uh', 'sea', 294389);
const cat = new Cat('nigga', 'fish');

function testClassOnCat() {
    // animal.eat();
    animal.sleep();
    animal.calculateAnimalAge();
    
    // cat.eat();
    // cat.sayMeow();
    cat.sleep();
}

function changeCatName() {
    console.log(cat.getName);
    cat.setNewName = prompt('Введите новое имя животного:');
    console.log(cat.getName);
}

function getAllAnimalData() {
    console.log(cat.getAllDataV1);
    console.log(cat.getAllDataV2);
}


btn.addEventListener('click', getAllAnimalData);



//* создать абстрактный класс для создания животных
//* добавить возможность редактировать имя животного
// дать каждому животному айДи, не вручную, а при помощи итератора
//* создать функцию гет при помощи которой будем получать все данные о животном
//? через прототип добавить возможность получать имя животного