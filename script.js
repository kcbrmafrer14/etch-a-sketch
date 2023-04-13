// initial conditions
let size = document.querySelector('.gridSize');
let gridSize = size.value;
setUpGrid(gridSize);

// for dragging purposes
let mouse = 0;
document.body.onmousedown = () => mouse = 1;
document.body.onmouseup = () => mouse = 0;

// current color
let color = document.querySelector('.color-picker');
color.addEventListener('change', changeColor);
let currentColor = color.value;

function changeColor() {
    if (rainbowMode) {
        rainbowMode = false
        rainbow.classList.remove('pressed-button')
        currentColor = color.value;
    }  
}

// for eraser
let rainbowMode = false;
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', erase);
const rainbow = document.querySelector('.rainbow');
rainbow.addEventListener('click', () => {
    if (rainbowMode) {
        rainbow.classList.remove('pressed-button');
        currentColor = 'black';
        rainbowMode = false;
    }
    else {
        rainbow.classList.add('pressed-button');
        randomize();
        rainbowMode = true;
        eraser.classList.remove('pressed-button');
    }
});

function erase() {
    if (rainbowMode) {
        rainbowMode = false;
        currentColor = 'white';
        eraser.classList.add('pressed-button');
        rainbow.classList.remove('pressed-button');
    }
    else if (currentColor === 'white') {
        currentColor = color.value;
        eraser.classList.remove('pressed-button');
    }
    else {
        currentColor = 'white';
        eraser.classList.add('pressed-button');
        rainbow.classList.remove('pressed-button');
    }}
// for rainbow 
function randomize() {
    if (rainbowMode) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        
        let random = `rgb(${randomR}, ${randomG}, ${randomB})`;
        currentColor = random;
    }
}
// for inside borders
const insideBorder = document.querySelector('.check');

let checkBorder = insideBorder.value;
insideBorder.addEventListener('change', () => {
    let gridItem = document.querySelectorAll('.grid-item');

    if (checkBorder) {
        checkBorder = false;
        gridItem.forEach(div => div.style.border = 'none');
    }
    else {
        checkBorder = true;
        gridItem.forEach(div => div.style.border = '#f0f0f0 solid 0.5px');
    }
    
})


// getting value of grid

size.addEventListener('change', makeGrid);

function makeGrid() {
    gridSize = size.value;
    clearGrid();
    setUpGrid(gridSize);
}


// setting up grid
function setUpGrid(value) {
    let container = document.querySelector('.container');
    document.querySelector('.sizeSelector').textContent = `${value} x ${value}`

    container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${value}, 1fr)`;

    let numberOfGrid = value * value;
    
    for (let i = 0; i < numberOfGrid; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('grid-item');
        newDiv.style.backgroundColor = 'white';

        container.insertAdjacentElement('beforeend', newDiv);

        newDiv.addEventListener('click', () =>
         newDiv.style.backgroundColor = currentColor);

        newDiv.addEventListener('mouseover', () => {
            if (mouse === 1) {
                randomize();
                newDiv.style.backgroundColor = currentColor;
            }
        })
        container.addEventListener('mouseexit', () => mouse = 0);
    }
}

// removing grid before setting up
function clearGrid() {
    let removeDiv = document.querySelectorAll('.grid-item');
    removeDiv.forEach(divToRemove => divToRemove.remove());
}

// clearing drawn divs
const clear = document.querySelector('.clear')
clear.addEventListener('click', clearAll);

function clearAll() {
    let gridItem = document.querySelectorAll('.grid-item');
    gridItem.forEach(div => div.style.backgroundColor = 'white');
    makeGrid(gridSize);
    clear.classList.add('pressed-button');
    setTimeout(() => clear.classList.remove('pressed-button'), 200);
}



// for footer
const footer = document.querySelector('#year');
footer.textContent = new Date().getFullYear();