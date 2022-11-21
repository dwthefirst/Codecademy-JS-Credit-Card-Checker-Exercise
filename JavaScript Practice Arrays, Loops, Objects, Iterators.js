//***QUESTION 2*** 
// Write function below
/*
function subLength(wordString, letter) {
    let word = wordString.split(''); //turns string into array of characters

    //check if there are less than 2 or more than 2 occurrences of the letter
    let count = numOfOccurrences(word, letter);
    if (count > 2 || count < 2) {
        console.log("There are less than 2 or greater than 2 occurrences of the letter. Please try again.")
        return 0;
    }

    let firstIndex = word.findIndex((element) => {
        return element === letter;
    })
    let lastIndex = word.lastIndexOf(letter)
    console.log(`Length between the 2 characters: `, (lastIndex - firstIndex) + 1);
    return (lastIndex - firstIndex) + 1;
}

function numOfOccurrences(word, letter) {
    let count = 0;
    for (const lettr of word) {
        if (lettr === letter) {
            count += 1
        }
    }
    console.log(`Count of ${letter} in \"${word}\": ${count}`);
    return count
}

subLength('Saturday', 'a'); // returns 6
//   numOfOccurrences('Saturday', 'a');

subLength('summer', 'm'); // returns 2
//   numOfOccurrences('summer', 'm');

subLength('digitize', 'i'); // returns 0
//   numOfOccurrences('digitize', 'i');

subLength('cheesecake', 'k'); // returns 0
//   numOfOccurrences('cheesecake', 'k');
*/

//***QUESTION 3*** 
// Write a function groceries() that takes an array of object literals of grocery items. The function should return a string with each item separated by a comma except the last two items should be separated by the word 'and'. Make sure spaces (' ') are inserted where they are appropriate.

function groceries(array) {
    let str = ""
    if (array.length === 1) {
        str = array[0].item;
    } else {
        for (let i = 0; i < array.length; i++) {
            //if 2nd to last word, add last 2 words separated by 'and
            if (i === (array.length - 2)) {
                str = str.concat(array[i].item + ' and ' + array[i + 1].item)
                break;
            } else {
                str = str.concat(array[i].item, ", ")
            }
        }
    }   
    
    console.log(str);
    return str;
}
groceries( [{item: 'Carrots'}, {item: 'Hummus'}, {item: 'Pesto'}, {item: 'Rigatoni'}] );
// returns 'Carrots, Hummus, Pesto and Rigatoni'
 
groceries( [{item: 'Bread'}, {item: 'Butter'}] );
// returns 'Bread and Butter'
 
groceries( [{item: 'Cheese Balls'}] );
// returns 'Cheese Balls'

groceries([{item: 'Lettuce'}, {item: 'Onions'}, {item: 'Tomatoes'}])
// returns 'Lettuce, Onions and Tomatoes'