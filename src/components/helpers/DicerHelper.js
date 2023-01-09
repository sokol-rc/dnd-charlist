export const randomCubeRoll = (cubeCount, cubeSide, additionalValue = 0, negativeValue = false) => {
    let min = Math.ceil(1);
    let max = Math.floor(cubeSide);
    let cubeCountInt = Math.floor(cubeCount);
    //создаем массив с результатами кубов
    let singleCubeResultArray = Array(cubeCountInt).fill(0).map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    //складываем результаты
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let cubeArr = [...singleCubeResultArray];
    /*
    Uncomment for hide true dice value if only one dice rolled. 1d20 = 17
     */
    // if (singleCubeResultArray.length <= 1) {
    //     cubeArr = null;
    // }
    let sum = singleCubeResultArray.reduce(reducer, 0) + Math.floor(additionalValue);
    if (negativeValue) {
        sum = singleCubeResultArray.reduce(reducer, 0) - Math.floor(additionalValue);
    }
    return {
        'sum': sum,
        'cubeValues': cubeArr
    };
}

export const getMainStatModifier = (stat) => {
    let res = Math.floor((stat - 10) / 2);
    return res < 0 ? res : "+" + res;
}

export const getSignFromNum = (value) => {
    let valueSign = Math.sign(value);
    let result = '+';
    if (valueSign === -1) {
        result = '-';
    } else if (valueSign === 0) {
        result = '+';
    }
    return result;
}

export const getDiceResult = (diceText) => {
    //search in input regular like 2d6
    let regexp = /(\d{1,2})[d,д,в,l](\d{1,3})/g;

    let matchAll = diceText.matchAll(regexp);

    matchAll = Array.from(matchAll);

    let firstMatch = matchAll[0];
    let cubeCount = firstMatch[1];
    let cubeSide = firstMatch[2];

    return {cubeCount, cubeSide}
}

export const cubeSideToInt = (match) => {
    let cubeOptions = getDiceResult(match);
    let result = randomCubeRoll(cubeOptions.cubeCount, cubeOptions.cubeSide);
    return result.sum;
}

export const getResultOptions = (str, regexp) => {
    let isCrit = false;
    let isLose = false;
    let cubeArr = [];

    let matchAll = str.matchAll(regexp);
    matchAll = Array.from(matchAll);

    matchAll.forEach((elem) => {
        let cubeCount = elem[1];
        let cubeSide = elem[2];
        let result = randomCubeRoll(cubeCount, cubeSide);

        if (matchAll.length === 1) {
            //critical shot
            if (+cubeSide === 20 && +cubeCount === 1 && +cubeSide === +result.cubeValues) {
                isCrit = true;
            }
            //lose
            if (+cubeSide === 20 && +cubeCount === 1 && +result.cubeValues === 1) {
                isLose = true;
            }
        }

        cubeArr = [...cubeArr, ...result.cubeValues]
    })

    return {
        cubeValues: cubeArr,
        isCrit,
        isLose
    }
}

export const getFullResult = (str, regexp) => {
    //clean up input string
    let input = str.replace(/[^0-9+-dlвдДВ.]/g,'');
    let re = new RegExp(regexp);
    //first element are impotant
    let diceArr = [1];
    while(re.test(input)) {
        diceArr.push(randomCubeRoll(RegExp.$1,RegExp.$2));
    }
    let diceArrCopy = [...diceArr];
    let resultSum = eval(input.replace(regexp, () => {

        diceArrCopy.shift();
        console.log(diceArrCopy[0]);
        return diceArrCopy[0].sum;
    }));
    //need to delete first element!
    diceArr.shift();
    return {
        'sum': resultSum,
        'cubeValues': diceArr.map((elem) => ([...elem.cubeValues]))
    }
}
//TODO: WTF??
export const getPersonName = (personID) => {
    switch(personID) {
        case 24:
            return 'Тайрэн Корнин'
        case 23:
            return 'Арсус'
        case 9:
            return 'Мини-Малини'
        case 6:
            return 'Морган (Ледяная Борода)'
        default:
            return ''
    }
}