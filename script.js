// step1: declare empty objects to store functions, and language libraries we will use to generate our language, and event handler object to store all the event handlers.
const languageGenerator = {};
const characterLibrary = {};
const eventHandler = {};

// step2: write 4 functions for each categories, to process user input in 4 different ways. And store them in object.
// also add the character library into the characterLibrary oject.
characterLibrary.alien = ['@', '#', '$', '%', '^', '&', '*', '/', '>', '<', '?', '⅋', '§', '¿'];
characterLibrary.ghost = ['👻', '😈', '💀', '🌚', '🎃'];

// function 1 - mirror 
// split user's input into characters and reverse the order, finally join them back as a sentence.
languageGenerator.mirror = function(string) {
    string = string
        .split('')
        .reverse()
        .join('');
    return string;
}

// function 2 - alien
// split user's input into characters, and mix it with alien characters, then join them back as a sentence.
languageGenerator.alien = function(string) {
    const alienCharacters = characterLibrary.alien;
    let strArray = string.split('');
    for (let i = 0; i < strArray.length; i++) {
        const randomNum = Math.floor(Math.random() * alienCharacters.length);
        strArray[i] = alienCharacters[randomNum];
    }
    return strArray.join('');
}

// function 3 - ghost
languageGenerator.ghost = function(string) {
    // in case users are inputing different cases.
    string.toLowerCase();
    // make an empty array to store result
    const ghostSentence = [];
    // make 2 arrays to compare the characters in user input with vowls, and push them into result array. 
    const ghostCharacters = characterLibrary.ghost
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    // take all the vowls from user input, and convert them to emojis.
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

// function 4 - wizard
// Make a shuffle function that can shuffle letters from each word.

languageGenerator.shuffle = function(wor) {
    for (let i = wor.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wor[i], wor[j]] = [wor[j], wor[i]];
    }
    return wor;
}

languageGenerator.shuffleString = function(str) {
    let word = [];
    for (let i = 0; i < str.length; i++) {
        word.push(i);
    }
    this.shuffle(word);
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str[word[i]];
    }
    return result;
}

// put this two functions into wizard function

languageGenerator.wizard = function(string) {
    string = string.split(' ');
    let strShuffle = '⚡️';
    for (let i = 0; i < string.length; i++) {
        strShuffle += this.shuffleString(string[i]) + ' ';
    }
    return strShuffle;
}

// step 4: check if a string is legal
eventHandler.isLegit = function(str) {
    return str.match(/^[a-z0-9\.,?! ]+$/i);
}

// step 5: submit the form and prevent default;

eventHandler.submitHandler = function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        //delcalare all variables
        let userCategory, userSentence, result, resultReply;

        //delet all the data from last input
        eventHandler.clearOutput();

        // gather user input
        userCategory = $('input[name = language-category]:checked').val();
        userSentence = $('textarea[name = sentence]').val();
        // check if a string is legal
        if (!eventHandler.isLegit(userSentence)) {
            $('textarea[name = sentence]')
                .val('')
                .addClass('not-legit')
                .attr('placeholder', 'invalid input, plese try again.');
            return;
        };

        //call the related function and stored the value into result. 
        result = languageGenerator[userCategory](userSentence);
        resultReply = `${userCategory}-reply`;

        //printing the result on the page.
        $('.result-result span').append(`${result}`);
        $(`.image-wrapper.${userCategory}`).show();
        $(`.result-text-style.${resultReply}`).show();


        // smooth scroll to the result
        var pos = $('#result').offset().top;
        eventHandler.scrollToPosition(pos, '#result');
    })
}

// step 6: add automatic scroll & smooth scroll
eventHandler.scrollToPosition = function(pos, href) {
    var $root = $('html, body');

    $root.animate({
        scrollTop: pos
    }, 500, function() {
        window.location.hash = href;
    });
}

// http://javascriptkit.com/javatutors/scrolling-html-bookmark-javascript.shtml
eventHandler.smoothScroll = function() {
    $('a[href^="#"]').click(function() {
        var href = $(this).attr('href');

        var pos = $(href).offset().top;
        eventHandler.scrollToPosition(pos, href);

        return false;
    });
}

eventHandler.scrollToInput = function() {
    $('input[name = language-category]').on('click', function() {
        var pos = $('#text-input').offset().top;
        eventHandler.scrollToPosition(pos, '#text-input');
    })
}

// step 7: clear the form

eventHandler.clearOutput = function() {
    $('.result-result span').text("");
    $('.image-wrapper').hide();
    $('.character-reply h3').hide();
    $('input[type=radio]').attr('checked', false);
    $('textarea[name = sentence]')
        .removeClass('not-legit')
        .attr('placeholder', 'No more than 200');
}

// step 8: reset the form

eventHandler.init = function() {
    var pos = $('#start').offset().top;
    eventHandler.scrollToPosition(pos, '#start');

    eventHandler.clearOutput();
    $('textarea[name = sentence]').val('');
}

eventHandler.resetHandler = function() {
    $('.restart-btn a').on('click', function() {
        eventHandler.init();
    })
};

// step 7: call all the event handler
$(function() {
    eventHandler.init();
    eventHandler.scrollToInput();
    eventHandler.submitHandler();
    eventHandler.resetHandler();
    eventHandler.smoothScroll();
});