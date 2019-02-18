// step1: declare empty objects to store functions, and language libraries we will use to generate our language, and event handler object to store all the event handlers.
const languageGenerator = {};
const characterLibrary = {};
const eventHandler = {};

// step2: write 4 functions for each categories, to process user input in 4 different ways. And store them in object.
// also add the character library into the characterLibrary oject.
characterLibrary.alien = ['@', '#', '$', '%', '^', '&', '*', '/', '>', '<', '?', '⅋', '§', '¿'];
characterLibrary.ghost = ['👻', '😈', '💀', '🌚', '🎃'];
characterLibrary.alienReply = "Hey, I'm not supernatural. You developers are supernatural.";
characterLibrary.ghostReply = "Tell me the truth, I'm kind of cute right?";
characterLibrary.mirrorReply = "You really think you are talking to me? You are talking to yourself.....";
characterLibrary.wizardReply = "Are you sure you want to play magic with me?";
characterLibrary.mirrorImage = "assets/mirror.jpg";
characterLibrary.wizardImage = "assets/wizard.jpg";
characterLibrary.alienImage = "assets/robot.jpg";
characterLibrary.ghostImage = "assets/ghost.jpg";

// function 1 - mirror 
// split user input into characters and reverse the order, finally join them back as a sentence.
languageGenerator.mirror = function(string) {
    string = string
        .split('')
        .reverse()
        .join('');
    return string;
}

// function 2 - alien
// split user input into characters, and mix it with alien characters, then join them back as a sentence.
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

// function 4 - wizard

/**
 * https://stackoverflow.com/a/6274381
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
languageGenerator.shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Make a shuffle function that can shuffle letters from each word.
languageGenerator.shuffleString = function(str) {
    let a = [];
    for (let i = 0; i < str.length; i++) {
        a.push(i);
    }
    this.shuffle(a);
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str[a[i]];
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
        let userCategory, userSentence, result, resultReply, resultStyle;

        //delet all the data from last input
        $('.result h3').html("");
        $('.image-wrapper').hide();
        $('.result-reply').removeClass(resultStyle);

        // gather user input
        userCategory = $('input[name = language-category]:checked').val();
        userSentence = $('input[name = sentence]').val();

        // check if a string is legal
        if (!eventHandler.isLegit(userSentence)) {
            alert('Your input is not valid, please input again.');
            return;
        };

        //call the related function and stored the value into result. 
        result = languageGenerator[userCategory](userSentence);
        resultReply = characterLibrary[userCategory + 'Reply'];
        resultStyle = `${userCategory}-text`;

        //printing the result on the page.
        $('.result-result').append(`${result}`);
        $(`.image-wrapper.${userCategory}`).show();
        $('.result-reply').addClass(resultStyle).append(`${resultReply}`);


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

// step 7: reset the form
eventHandler.init = function() {
    var pos = $('#start').offset().top;
    eventHandler.scrollToPosition(pos, '#start');

    $('input[name = sentence]').val('');
    $('input[type=radio]').attr('checked', false);
}

eventHandler.resetHandler = function() {
    $('.restart-btn a').on('click', function() {
        eventHandler.init();
    })
};

// step 7: call all the event handler
$(function() {
    // eventHandler.init();
    eventHandler.scrollToInput();
    eventHandler.submitHandler();
    eventHandler.resetHandler();
    eventHandler.smoothScroll();
});


// step 9: add result animation
// import Typed from 'typed.js';

// var options = {
//     strings: $('.result-reply').text(),
//     typeSpeed: 40
// }

// var typed = new Typed('.result-reply', options);
// import anime from 'lib/';
// const anime = require('lib/anime.js');
anime({
    targets: '.image-wrapper',
    translateX: 250,
    autoplay: true,
    easing: 'easeInOutSine',
    duration: 2000
});