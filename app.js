document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay')
  const h1 = overlay.querySelectorAll('h1');
  const phrase = document.getElementById('phrase');
  const ul = phrase.firstElementChild;
  const qwerty = document.getElementById('qwerty');
  const scoreboard = document.getElementById('scoreboard');
  const phrases = ['Hit the sack', 'Lose your touch', 'Sit tight',
                  'Pitch in', 'Go cold turkey', 'Ring a bell',
                  'Break Even', 'Keep your chin up', 'Rule of Thumb',
                  'A piece of cake'];
  let missed = 0;

  function getRandomPhraseAsArray(array) {
    newChar = array[Math.floor(Math.random()*array.length)].toLowerCase().split('');
    return newChar;
  }

  function addPhraseToDisplay(array) {
    for (let i = 0; i < array.length; i++) {
      const li = document.createElement('li');
      if (array[i] !== ' ') {
        li.className = 'letter';
        li.textContent = array[i];
        ul.appendChild(li);
      } else {
        li.className = 'space';
        li.textContent = array[i];
        ul.appendChild(li);
        }
      }
    }

  startButton.addEventListener('click', () => {
    const phraseArray = getRandomPhraseAsArray(phrases);
    overlay.removeChild(overlay.lastChild);
    overlay.style.display = 'none';
    addPhraseToDisplay(phraseArray);
  });

  qwerty.addEventListener('click', (e) => {
    const ol = scoreboard.firstElementChild;
    const letter = document.querySelectorAll('.letter');

    let letterFound = null;
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      button.classList.add('chosen')
      button.disabled = true;

    function checkLetter(button) {
      const classShow = document.querySelectorAll('.show')
      for (let i = 0; i < letter.length; i++) {
        if (button.textContent === letter[i].textContent) {
          letter[i].classList.add('show');
          letter[i].style.transition = 'background-color 1s';
          letter[i].style.textTransform = 'uppercase';
          letterFound = letter[i].textContent;
        }
      }
    }

    function checkWin() {
      const message = document.createElement('h1');
      const classShow = document.querySelectorAll('.show')

      if (classShow.length === letter.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        return resetGame();
      } else if (missed >= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        return resetGame();
      }
    }

    function resetGame() {
      const message = document.createElement('h1');
      const letterList = ul.getElementsByTagName('li');
      const keyboard = document.querySelectorAll('.chosen');
      const orderedList = document.createElement('ol');

      message.textContent = `You ${overlay.className}!`.toUpperCase();
      startButton.textContent = 'Try Again';
      overlay.appendChild(message);
      missed = 0;
      while (letterList.length >= 1) {
        ul.removeChild(ul.firstChild);
      }
      for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].disabled = false;
        keyboard[i].removeAttribute('class');
      }
      scoreboard.removeChild(ol);
      scoreboard.appendChild(orderedList);
      for (let i = 0; i < 5; i++) {
        const li = document.createElement('li');
        const image = document.createElement('img');
        li.className = 'tries';
        li.style.margin = '0 2px';
        image.src = 'images/liveHeart.png';
        image.style.height = '35px';
        image.style.width = '30px';
        li.appendChild(image);
        orderedList.appendChild(li);
      }
      return;
    }

    checkLetter(button);

    if (letterFound === null) {
      const li = document.createElement('li');
      const lostHeart = document.createElement('img');
      const tries = document.getElementsByClassName('tries')[0];
      li.style.margin = '0 2px';
      lostHeart.src = 'images/lostHeart.png';
      lostHeart.className = 'lost_tries';
      li.appendChild(lostHeart);
      ol.insertBefore(li, ol.childNodes[0]);
      ol.removeChild(tries);
      missed += 1;
      }
    }

    checkWin();
  });
});
