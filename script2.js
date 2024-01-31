const gameContainer = document.getElementById("game");
let score = 0;

const IMAGES = [
 "https://ms.yugipedia.com//6/69/BlueEyesWhiteDragon-SDK-NA-UR-1E.jpg",
 "https://ms.yugipedia.com//a/a9/DarkMagician-LOB-NA-UR-UE.jpg",
 "https://ms.yugipedia.com//1/1d/PotofGreed-LOB-NA-R-1E.jpg",
 "https://ms.yugipedia.com//d/d2/MonsterReborn-LOB-NA-UR-UE.png",
 "https://ms.yugipedia.com//5/5a/BlackLusterSoldier-SYE-EN-UR-1E.jpg",
 "https://ms.yugipedia.com//3/3c/ExodiatheForbiddenOne-LOB-NA-UR-1E.jpg",
 "https://ms.yugipedia.com//5/52/ChangeofHeart-SDY-NA-C-1E.png",
 "https://ms.yugipedia.com//7/75/SlifertheSkyDragon-YMA-EN-ScR-LE.png",
 "https://ms.yugipedia.com//2/23/MirrorForce-MRD-NA-UR-1E.jpg",
 "https://ms.yugipedia.com//6/69/BlueEyesWhiteDragon-SDK-NA-UR-1E.jpg",
 "https://ms.yugipedia.com//a/a9/DarkMagician-LOB-NA-UR-UE.jpg",
 "https://ms.yugipedia.com//1/1d/PotofGreed-LOB-NA-R-1E.jpg",
 "https://ms.yugipedia.com//d/d2/MonsterReborn-LOB-NA-UR-UE.png",
 "https://ms.yugipedia.com//5/5a/BlackLusterSoldier-SYE-EN-UR-1E.jpg",
 "https://ms.yugipedia.com//3/3c/ExodiatheForbiddenOne-LOB-NA-UR-1E.jpg",
 "https://ms.yugipedia.com//5/52/ChangeofHeart-SDY-NA-C-1E.png",
 "https://ms.yugipedia.com//7/75/SlifertheSkyDragon-YMA-EN-ScR-LE.png",
 "https://ms.yugipedia.com//2/23/MirrorForce-MRD-NA-UR-1E.jpg"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
let shuffledImages = shuffle(IMAGES);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForImages(imageArray) {
    for (let image of imageArray) {
      const card = document.createElement("div");
      card.classList.add('card');
  
      const front = document.createElement("div");
      front.classList.add('front');
  
      const back = document.createElement("div");
      back.classList.add('back');
      back.classList.add(encodeURI(image).replace(/%/g, '')); // Add encoded image URL as class
      back.style.backgroundImage = `url('${image}')`;
  
      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener("click", handleCardClick);
      gameContainer.append(card);
    }
  }
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = score;
}
let firstCard = null;
let secondCard = null;
let isProcessing = false;

function handleCardClick(event) {
    if (isProcessing) return;
    if (event.target.classList.contains('matched')) return;
  
    let clickedCard = event.target.parentNode; // Get the card element
  
    if (!clickedCard.classList.contains('flipped')) {
      clickedCard.classList.add('flipped');
  
      if (!firstCard) {
        firstCard = clickedCard;
      } else if (!secondCard) {
        secondCard = clickedCard;
        
        // score tracker
        score++;
        updateScoreDisplay();
  
        let firstCardBack = firstCard.querySelector('.back');
        let secondCardBack = secondCard.querySelector('.back');
  
        if (firstCardBack.className === secondCardBack.className) {
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          firstCard = null;
          secondCard = null;
        } else {
          isProcessing = true;
          setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            isProcessing = false;
          }, 750);
        }
      }
    }
  }
function resetScoreDisplay() {
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = 0;
}
// Function to reset and recreate the divs
function resetGame() {
  // Clear existing divs
  gameContainer.innerHTML = '';
  //reset score
  resetScoreDisplay()
  score = 0
  // Shuffle colors again
  shuffledImages = shuffle(IMAGES);

  // Recreate divs with new shuffled colors
  createDivsForImages(shuffledImages);

  // Reset any other state as necessary
  firstCard = null;
  secondCard = null;
  isProcessing = false;
}

const resetButton = document.querySelector('#reset')
resetButton.addEventListener("click", resetGame);


// when the DOM loads
createDivsForImages(shuffledImages);
