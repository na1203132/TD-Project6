const keyboard = document.getElementById('qwerty');
const overlay = document.getElementById('overlay');
const phrase = document.getElementById('phrase');
const start = document.getElementsByClassName('btn__reset')[0];
let missed = 0;
let chosenBtns= [];
let indexBtn = 0;
const phrases = ['javascript is awesome','python is great', 'php is outstanding', 'i am a developer', 'treehouse is awesome'];
const trials = document.getElementById('scoreboard').firstElementChild.children;

start.addEventListener('click',(e)=>{
    let container= e.target.parentNode; 
    container.style.display= 'none';
    const phraseArray= getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    
});

keyboard.addEventListener('click', (e)=>{
    if (e.target.tagName === 'BUTTON'){
        const btn = event.target;
        chosenBtns[indexBtn]=btn;
        btn.className='chosen';
        btn.disabled = true; 
        let letterFound =checkLetter(btn);
            if(letterFound === null){
            trials[missed].style.display = 'none';
            missed +=1;
            }
    checkwin(chosenBtns);
    indexBtn+=1;   
    }
   
});







function checkwin(btns){
    const matchedLetters = document.getElementsByClassName('show');
    const currentPhrase = document.getElementsByClassName('letter');
    if (matchedLetters.length === currentPhrase.length){
     win(btns);
    }
    if ( missed === 5){
     lose(btns);
    }
}

function win(btns){
        overlay.style.display='flex';  
        overlay.style.background='green';  
        start.textContent='Play Again';
        const gameover= overlay.firstElementChild;
        gameover.textContent='Congratulations! You Are Too Smarty!';
        missed = 0;
        reset(btns);

}

function lose(btns){

    overlay.style.display='flex';  
    overlay.style.background='red';  
    start.textContent='Try Again';
    const gameover= overlay.firstElementChild;
    gameover.textContent='GAME OVER!';
    missed = 0;
    reset(btns);
}




function getRandomPhraseAsArray(arr){
    let randomNum= Math.floor(Math.random() * 5);
    const chosenPhrase = arr[randomNum].split("");
    return chosenPhrase;
} 

function addPhraseToDisplay(arr){
    const ul = phrase.firstElementChild;
    for (let i = 0; i <arr.length; i+=1){
        const li = document.createElement("li");
        li.textContent= arr[i];
        ul.appendChild(li);
        if(arr[i] != " "){
            li.className='letter';
        }else{
            li.className= '';
            li.style.margin= '10px';
        }
    }
}

function reset(btns){
    const ul = phrase.firstElementChild;
    const li = ul.children;
    for(let i = 0; i <li.length; i+=1){
        li[i].className= '';
        li[i].style.display = 'none';
    }

    for(let i = 0; i <btns.length; i+=1){
        btns[i].className='';
        btns[i].disabled= false;
    }

    for(let i = 0; i <trials.length; i+=1){
        trials[i].style.display = 'inline-block';
    }
}


function checkLetter (btn){
    const li = document.getElementsByClassName('letter');
    const chosenLetter = btn.textContent;
    let match =0;
   
    for (let i = 0; i <li.length; i+=1){
        if (chosenLetter === li[i].textContent){
            li[i].classList.add('show');
            li[i].classList.add('transf');
            li[i].style.transition= 'transform 0.5s';
            match = li[i];    
        }
    }
    if (match != 0){
        return match;
    } else{
        return null;
        }
}
