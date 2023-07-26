const containers = document.querySelectorAll('.container')
const mainContainer = document.querySelector('.main-container')
const winnerDisplay = document.querySelector('.winner')
const messages = document.querySelector('.output')
const button = document.querySelector('.button')
const position = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [0,3,6],
    [2,5,8]
]

let turn = true
let isWin = false

button.addEventListener('click', ()=>{
   window.location.reload()
})

function chekingTheWin(className){
    return position.some( container =>{
        return container.every(pos =>{
            return containers[pos].classList.contains(`${className}`)
        })
    })
}

function handleClick(){
    containers.forEach(div =>{
        div.addEventListener('click',(e)=>{
            e.target.classList.add('tie')
                if(turn){
                    mainContainer.classList.remove('box')
                    mainContainer.classList.add('circle')
                    e.target.classList.add('box')
                    turn = false
                }else{
                    mainContainer.classList.remove('circle')
                    mainContainer.classList.add('box')
                    e.target.classList.add('circle')
                    turn = true
                }
              
        } , {once:true})
    })
}

function checkIfTie(){
    const arrEl = [...containers]
   return arrEl.every((e)=>{
        return e.classList.contains('tie')
    })
}

const interval = setInterval(game , 100)

function game(){
    let box , circle  , message
    box = chekingTheWin('box')
    circle = chekingTheWin('circle')
    if(!isWin){
       
        winnerDisplay.style.display ='none'
    }
    if(box || circle){
        message = box && 'X' || circle && 'O'
        isWin =true
    }
    if(isWin){
        clearInterval(interval)
        mainContainer.style.display ='none'
        winnerDisplay.style.display ='flex'
        messages.innerHTML = `The winner is ${message}`
    }
    if(checkIfTie() && !isWin){
        clearInterval(interval)
        mainContainer.style.display ='none'
        winnerDisplay.style.display ='flex'
        messages.innerHTML = `The game is tie.`
    }
    
}

function main(){
    handleClick()
}

main()

