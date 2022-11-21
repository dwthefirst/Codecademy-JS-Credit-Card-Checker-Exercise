// All valid credit card numbers
const valid = [4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8]
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
function validateCred(credNums) {
    /*
    Starting from the farthest digit to the right, AKA the check digit, iterate to the left.
    As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.
    Sum up all the digits in the credit card number.
    If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.
    */
   let array = [...credNums];
    //console.log('array: ', credNums);
    let everyOther = 0;
    let sumCheck = 0;
    for (let i = credNums.length - 1; i >= 0; i--) {        
        if (i === credNums.length - 1) { //skip the last number
            //console.log("check value:", credNums[i])
            continue;
        }

        if (everyOther % 2 == 0) { //every other number after the last number
            //console.log('everyOther number: ', credNums[i]);

            //if greater than 9 after doubling, minus 9
            let double = credNums[i] * 2;
            //console.log("doubled = ", double);
            if (double > 9) {
                double -= 9;
                //console.log("Number is greater than 9. Subtracting 9... = ", double)
            }
            //replace that new doubled value in the cloned array (to sum later)
            array[i] = double;

            //add the resulting sum to the total Sum
            // sumCheck += double;
            // console.log("running sum: ", sumCheck);
        }
        everyOther++;
    }
    
    //get the sum of the cloned array with the new doubled values
    let totalSum = array.reduce((acc, currentValue) => {
        return acc + currentValue;
    }, 0);
    //console.log("total sum:", totalSum);

    //check if the sum is divisible by 10, if yes then it's valid
    //console.log(`${totalSum} % 10 = ${totalSum % 10}`)
    if (totalSum % 10 === 0) {
        //console.log("Number is valid! :)")
        return true;
    } else {
        //console.log("ERROR: Number is valid! :(")
        return false;
    }
}

/*
Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.
*/
function findInvalidCards(arrayOfCreditCardNums) {
    let invalidNums = [];
    arrayOfCreditCardNums.forEach((credNum) => {
        if (validateCred(credNum) === false) {
            invalidNums.push(credNum)
        }        
    })
    //console.log("Invalid credit card numbers: ", invalidNums)
    return invalidNums;
}

/*
    After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued these faulty numbers. Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies.

    Currently, there 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which company:

    First Digit	Company
    3	Amex (American Express)
    4	Visa
    5	Mastercard
    6	Discover
    If the number doesn’t start with any of the numbers listed, print out a message like: “Company not found”.

    idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.

*/
function idInvalidCardCompanies(arrayOfInvalids) {
    let arrayOfCompanies = [];
    arrayOfInvalids.forEach((invalidNum) => {
        let num1 = invalidNum[0];
        //now check for existing values
        if (num1 === 3 && !(arrayOfCompanies.includes("Amex (American Express)"))) {
            arrayOfCompanies.push("Amex (American Express)");
        }  else if (num1 == 4 && !(arrayOfCompanies.includes("Visa"))) {
            arrayOfCompanies.push("Visa");
        } else if (num1 === 5 && !(arrayOfCompanies.includes("Mastercard"))) {
            arrayOfCompanies.push("Mastercard")
        } else if (num1 === 6 && !(arrayOfCompanies.includes("Discover"))) {
            arrayOfCompanies.push("Discover")
        } else {
            console.log("Company not found");
        }
    }) 
    console.log(arrayOfCompanies);
    return arrayOfCompanies;
}



//validateCred(valid);
// console.log("***VALID***")
// validateCred(valid1);
// validateCred(valid2);
// validateCred(valid3);
// validateCred(valid3);
// validateCred(valid4);
// validateCred(valid5);


// console.log("***INVALID***")
// validateCred(invalid1);
// validateCred(invalid2);
// validateCred(invalid3);
// validateCred(invalid3);
// validateCred(invalid4);
// validateCred(invalid5);


// console.log("***MYSTERY***")
// validateCred(mystery1);
// validateCred(mystery2);
// validateCred(mystery3);
// validateCred(mystery3);
// validateCred(mystery4);
// validateCred(mystery5);

let invalidArray = findInvalidCards(batch);
console.log(invalidArray.length);
//idInvalidCardCompanies(invalidArray);
