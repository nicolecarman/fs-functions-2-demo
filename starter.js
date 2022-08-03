////////////////////////
////// CALCULATOR //////
////////////////////////

// CODE HERE
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const calculator = (num1, num2, callback) => {
    // our if statement checks to see if we can convert our variables to numbers
    if (+num1 && +num2) {
        // if our variables can be changed to numbers, convert them to numbers
        num1 = +num1;
        num2 = +num2;

        return callback(num1, num2);
    } else {
        console.log("You need to enter numbers.")
    }
}

const result = calculator(3, 4, add);
const otherResult = calculator(3, 4, multiply);
//console.log(result, otherResult);




///////////////////////
////// PET STORE //////
///////////////////////

/*
You’re given an array of dog products and one of cat products, we’ll be looping these and changing values. The base price is the normal price that would be charged, display is how it should show up on the website. We want to be able to loop over the arrays separately and apply discounts by percentage (25% off) or by rate ($5 off).

We also want to be able to apply these to all products in an array, or according to category (sale on toys specifically), or according to inventory (trying to sell the last little bit to make room for more products, get it while it lasts type of sale). Start with the discount functions, these will eventually be called as callbacks, they’ll both take in a product to change and the size of the discount.

The percent discount subtracts the discount from 1 to get the actual percentage, so make sure you’re entering percentages as decimals (.25 for 25%, then it will actually give you .75 of the basePrice).
*/

const dogProducts = [
    {
      name: 'leash',
      colors: ['red', 'blue', 'green'],
      category: 1,
      inventory: 30,
      basePrice: 13.99, 
      displayPrice: 13.99
    }, 
    {
      name: 'chew toy',
      colors: ['brown'],
      category: 2,
      inventory: 120,
      basePrice: 6.00, 
      displayPrice: 6.00
    }, 
    {
      name: 'rope',
      colors: ['blue & green', 'red & yellow'],
      category: 2,
      inventory: 75,
      basePrice: 4.99, 
      displayPrice: 4.99
    }
]

const catProducts = [
  {
    name: 'mouse toy', 
    colors: ['pink', 'grey', 'black'], 
    category: 2, 
    inventory: 125, 
    basePrice: 2.50, 
    displayPrice: 2.50
  },
  {
    name: 'cat sweater',
    colors: ['black'],
    category: 1,
    inventory: 15,
    basePrice: 10.00, 
    displayPrice: 10.00
  }, 
  {
    name: 'scratching post',
    colors: ['tan'],
    category: 2,
    inventory: 40,
    basePrice: 22.99, 
    displayPrice: 22.99
  }
]



// CODE HERE
const applyPercentDiscount = (product, discount) => {
    product.displayPrice = product.basePrice * (1 - discount);
};

const applyFlatRateDiscount = (product, discount) => {
    product.displayPrice = product.basePrice - discount;
};



// First, we want to be able to loop over either array and apply a change to each product, this would be for a store-wide sale. Let's write a higher order function that will do this.
const applyDiscounts = (array, callback, discount) => {
    array.forEach(product => {
        callback(product, discount)
    });
}


// 10% discount
applyDiscounts(dogProducts, applyPercentDiscount, .1);
console.log(dogProducts);

// $2 off discount
applyDiscounts(catProducts, applyFlatRateDiscount, 2);
console.log(catProducts);



// Now let’s write a function that only applies discounts to products in a certain category, so we could have a sale on only toys or only food, etc... The function will need to know the array, the category, which callback, and what the discount amount is.
const applyDiscountsByCategory = (array, category, callback, discount) => {
    array.forEach(product => {
        if (product.category === category) {
           callback(product, discount); 
        }
    });
};


// 15% discount off category 2 (cat products)
applyDiscountsByCategory(catProducts, 2, applyPercentDiscount, .15);
console.log(catProducts);

// 30% off discount with category 1 (dog products)
applyDiscountsByCategory(dogProducts, 1, applyPercentDiscount, .3);
console.log(dogProducts);



// Discounts by inventory
const applyDiscountsByInventory = (array, callback, amount, discount) => {
    array.forEach(product => {
        if (product.inventory < amount) {
           callback(product, discount); 
        }
    });
};


// $5 discount
applyDiscountsByInventory(dogProducts, applyFlatRateDiscount, 40, 5);
console.log(dogProducts);

// 50% discount
applyDiscountsByInventory(catProducts, applyFlatRateDiscount, 40, .5);
console.log(catProducts);




////////////////////////
////// SANDWICHES //////
////////////////////////

/*
Every sandwich starts with bread, so let’s make a higher order function that returns functions that “make sandwiches” on the specified type of bread. The bread type should be a string and the ingredients on the inner function should be an array of strings, even if it’s only one thing. The inner function just repeats your order back to you. The if statement makes the sentence look nice based on the number of ingredients and which iteration of the loop you’re on.
*/


// CODE HERE
function makeSandwich(bread) {

    return function(ingredients) {
      let order = `You ordered a ${bread} bread sandwich with `
  
      for (let i = 0; i < ingredients.length; i++) {
  
        if (i === ingredients.length - 1 && i !== 0) {
          order += `and ${ingredients[i]}.`
        } else if (ingredients.length === 1) {
          order += `${ingredients[i]}.`
        } else {
          order += `${ingredients[i]}, `
        }
      }
  
      return order
  
    }
}


// Now we can make some functions from this function that will create sandwiches on different types of bread and call those functions passing in ingredients.
const makeWheatSandwich = makeSandwich("wheat");
const makeRyeSandwich = makeSandwich("rye");

const sandwich1 = makeWheatSandwich(['pickles', 'cheese', 'ham', 'lettuce'])
console.log(sandwich1);

const sandwich2 = makeRyeSandwich(["turkey"]);
console.log(sandwich2);





////////////////////////////////////
////// COPY AND CHANGE ARRAYS //////
////////////////////////////////////


// There are two provided functions that we’ll be parsing out into 3 functions so that the repeated parts can be taken care of in one function instead of being repeated.


const lotr = ['biLbO BaGGINs', 'leGOlAs', 'Frodo bAGGINS', 'sAMwiSe GamGEe', 'gAndALF tHe GREY']

const copyArrToCamelCase = arr => {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        const str = arr[i]
        const splitStr = str.split(' ')
        let camelCaseStr = ''
        
        for (let x = 0; x < splitStr.length; x++) {
            let word = splitStr[x]

            word = word.toLowerCase()

            if (x !== 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1)
            }

            camelCaseStr += word
        }

        newArr.push(camelCaseStr)
    }

    return newArr
}


// copy_arr_to_snake_case
const copyArrToSnakeCase = arr => {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        let str = arr[i]
        str = str.toLowerCase()
        const splitStr = str.split(' ')
        const snakeCaseStr = splitStr.join('_')
        newArr.push(snakeCaseStr)
    }

    return newArr
}
  


// CODE HERE
const copyArrAndChange = (arr, cb) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let newValue = cb(arr[i])
        result.push(newValue)
    }
    return result
}


const copyStrToCamelCase = str => {
    const splitStr = str.split(' ')
    let camelCaseStr = ''
    for (let x = 0; x < splitStr.length; x++) {
        let word = splitStr[x]
        word = word.toLowerCase()
        if (x !== 0) {
            word = word.charAt(0).toUpperCase() + word.slice(1)
        }
        camelCaseStr += word
    }
    return camelCaseStr
}


const copyStrToSnakeCase = str => {
    str = str.toLowerCase()
    const splitStr = str.split(' ')
    const snakeCaseStr = splitStr.join('_')
    return snakeCaseStr
}

console.log(copyArrAndChange(names, copyStrToCamelCase))
console.log(copyArrAndChange(names, copyStrToSnakeCase))



// using copyArrAndChange in different context
const multiplyByFour = num => num * 4
  
const nums = [1,2,3,4,5]

let mappedNums = nums.map(multiplyByFour)
console.log(mappedNums)



// same output, just writing in-line callback
let mappedNumsAgain = nums.map(num => num * 4)
console.log(mappedNumsAgain)
