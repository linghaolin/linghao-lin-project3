// step1: declare an empty object to store functions
const languageGenerator = {};
// step2: write 4 functions for each categories, to process user input in 4 different ways. And store them in object

// function - mirror 
// which will split user input into characters and reverse the order, finally join them back as a sentence.
languageGenerator.mirror = function(string) {
        string = string
            .split('')
            .reverse()
            .join('');
        return string;
    }
    // console.log(languageGenerator.mirror('i love coding'));



// function - alien
// which will split user input into characters, and mix it with alien characters, then join them back as a sentence.
languageGenerator.alien = function(string) {
        const alienCharacters = ['@', '#', '$', '%', '^', '&', '*', '/', '>', '<', '?', '⅋', '§', '¿'];
        let strArray = string.split('');
        for (let i = 0; i < strArray.length; i++) {
            const randomNum = Math.floor(Math.random() * alienCharacters.length);
            strArray[i] = alienCharacters[randomNum];
        }
        return strArray.join('');
    }
    // console.log(languageGenerator.alien('i love coding'));

// function - ghost
languageGenerator.ghost = function(string) {
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

// console.log(languageGenerator.ghost('i love coding'));

// function - wizard

// Make a shuffle function that can shuffle letters from each word.
// languageGenerator.shuffle = function(str) {
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


// step4: submit the form and prevent default;
$(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();

        // step5: gather user input
        let userCategory = $('input[name = language-category]:checked').val();
        console.log(userCategory);
        let userSentence = $('input[name = sentence]').val();
        console.log(userSentence);

        // step6: call the related function and stored the value into result. 
        let result = languageGenerator[userCategory](userSentence);
        console.log(result);

        // step7: printing the result on the page.
        $('.result').html(`<h3 class='result-style'>${result}</h3>`);
    })
});