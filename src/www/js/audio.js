$(document).ready(function() {

    (function (){

        /* Appending all audioclips to document */ 

        var soundClips = {
            play_audio_theme: "/audio/yatzy_gamemusic.mp3",
            play_audio_click1: "/audio/click1.mp3",
            play_audio_click2: "/audio/click2.mp3",
            play_audio_place: "/audio/place.mp3",
            play_audio_dice_lock: "/audio/dice_lock.mp3",
            play_audio_dice_unlock: "/audio/dice_unlock.mp3",
            play_audio_dice1: "/audio/roll1.mp3",
            play_audio_dice2: "/audio/roll2.mp3",
            play_audio_dice3: "/audio/roll3.mp3",
            play_audio_dice4: "/audio/roll4.mp3",
            play_audio_dice5: "/audio/roll5.mp3",
            play_audio_dice6: "/audio/roll6.mp3",
            play_audio_dice7: "/audio/roll7.mp3",
            play_audio_dice8: "/audio/roll8.mp3",
            play_audio_yatzeee: "/audio/yatzeee.mp3",
            play_audio_winner_fanfare: "/audio/winner_fanfare.mp3"
        };

        var game = $('body');
        for (var prop in soundClips) {
            game.append(
                '<audio class="' + prop + '" src=' + soundClips[prop] + ' type="audio/mp3"></audio>'
            );
        }

    }());


    function backgroundMusicPlayer() {

        // An on/off button for the background music

        var game = $('body');
        var glyphOn = 'glyphicon glyphicon-volume-down';
        var glyphOff = 'glyphicon glyphicon-volume-off';

        game.prepend(
            '<div class="whole-game-container"><div class="audio-button-container"><div class="sound-symbol"><span class="' + glyphOn + '" aria-hidden="true"></span></div></div></div>'
        );

        // Auto Playing game music 
        var playing = false;
        var audioTheme = $('.play_audio_theme')[0];

        // Looping the game music
        audioTheme.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        audioTheme.play();

        $('.sound-symbol').click(function() {
            if (playing === true) {
                audioTheme.play();
                playing = false;
                // $(this).text("music on");
                $(this).html('<div class="sound-symbol audio-button"><span class="' + glyphOn + '" aria-hidden="true"></span></div>');
            } else {
                audioTheme.pause();
                playing = true;
                // $(this).text("music off");
                $(this).html('<div class="sound-symbol audio-button"><span class="' + glyphOff + '" aria-hidden="true"></span></div>');
            }
        });
    }

    backgroundMusicPlayer();

});



/* function for playing all selected clips */

function playAudio(selectedClip) {
    $(selectedClip)[0].play();
}


/* All Functions below are called on from other js scripts. */


function audioPlacePoints() {
    // This function is called from add-score.js
    playAudio('.play_audio_place');
}

function audioDiceLock() {
    // This function is called from dices.js
    playAudio('.play_audio_dice_lock');
}

function audioDiceUnlock() {
    // This function is called from dices.js
    playAudio('.play_audio_dice_unlock');
}

function audioThrow() {
    // This function is called from dices.js
    // Random 1-8
    var randomSound = Math.ceil(Math.random() * 8); 
    playAudio('.play_audio_dice' + randomSound);
}

function audioButtonClick() {
    // This function is called from new-game.js (addPlayer, deletePlayer & New Game)  
    playAudio('.play_audio_click1');
}

function audioReverseButtonClick() {
    // This function is called from new-game.js (addPlayer, deletePlayer & New Game)  
    playAudio('.play_audio_click2');
}

function audioWinnerFanfare() {
    // This function is called from add-score.js
    playAudio('.play_audio_winner_fanfare');
}

function audioYatzeee() {
    // This function is called from add-score.js
    playAudio('.play_audio_yatzeee');
}
