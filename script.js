// step1: write 4 functions for each categories, to process user input in 4 different ways.
const userSentence = 'I love coding a!';

// function - mirror 
// which will split user input into characters and reverse the order, finally join them back as a sentence.
const mirror = function(string) {
    string = string
        .split('')
        .reverse()
        .join('');
    return string;
}
console.log(mirror(userSentence));



// function - alien
// which will split user input into characters, and mix it with alien characters, then join them back as a sentence.
const alien = function(string) {
    const alienCharacters = ['@', '#', '$', '%', '^', '&', '*', '/', '>', '<', '?', '⅋', '§', '¿'];
    let strArray = string.split('');
    for (let i = 0; i < strArray.length; i++) {
        const randomNum = Math.floor(Math.random() * alienCharacters.length);
        strArray[i] = alienCharacters[randomNum];
    }
    return strArray.join('');
}
console.log(alien(userSentence));

// function - ghost
const ghost = function(string) {
    // in case users are inputing different cases.
    string.toLowerCase();
    // make an empty array to store result
    const ghostSentence = [];
    // make 2 arrays to compare the characters in user input with vowls, and push them into result array. 
    const ghostCharacters = ['👻', '😈', '💀', '🌚', '🎃'];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    // take all the vowls from user input, and convert them to emojis stored in ghostcharacters.
    // if there is an 'a' triple the emoji, if there is an 'i' double the emoji
    for (let inputIndex = 0; inputIndex < string.length; inputIndex++) {
        for (let i = 0; i < vowels.length; i++) {
            if (string[inputIndex] === vowels[i]) {
                if (string[inputIndex] === 'a') {
                    ghostSentence.push(ghostCharacters[0], ghostCharacters[0], ghostCharacters[0]);
                } else if (string[inputIndex] === 'i') {
                    ghostSentence.push(ghostCharacters[2], ghostCharacters[2]);
                } else {
                    ghostSentence.push(ghostCharacters[i]);
                }
            }
        }
    }
    //join them back to sentences.
    return ghostSentence.join(' ');
}

console.log(ghost(userSentence));

// function - wizard

// Make a shuffle function that can shuffle letters from each word.
// const shuffle = function(str) {
//     for (let i = str.length - 1; i > 0; i--) {
//         let randomNum = Math.floor(Math.random() * (i + 1));
//         let x = str[i];
//         str[i] = str[randomNum];
//         str[randomNum] = x;
//     }
//     console.log(str);
// }
// shuffle('love');

// const wizard = function(string) {
//     let wizardWord = string.split(' ');
//     console.log(wizardWord);
//     let wizardSentence;
//     for (let w = 0; w < wizardWord.length; w++) {
//         console.log(wizardWord[w]);
//         wizardSentence = shuffle(wizardWord[w]);
//         // console.log(wizardSentence);
//     }
//     return wizardSentence.join('');
//     // console.log(wizardResult);
// }

// wizard(userSentence);

// step2: Store user input into a variable
// const userSentence = 'I love coding a!';

// step3: Declare 4 global variables to store returned value from each function
let mirrorResult;
let alienResult;
let ghostResult;
let wizardResult;

// step4: submit the form and prevent default;
$(function() {

});