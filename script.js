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
    currentColor = color.value;
}

// for eraser
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', erase);

function erase() {
    if (currentColor === 'white') {
        currentColor = color.value;
        eraser.classList.remove('pressed-button');
    }
    else {
        currentColor = 'white';
        eraser.classList.add('pressed-button');
    }}

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

        newDiv.addEventListener('click', () => newDiv.style.backgroundColor = currentColor);
        newDiv.addEventListener('mouseover', () => {
            if (mouse === 1) {
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
    setTimeout(() => clear.classList.remove('pressed-button'), 100);
}

