/*Displaying Numbers*/

//Getting the display element
const display = document.getElementById('display-screen');

//Getting all the number buttons
const numberButtons = document.querySelectorAll('.number-btn');

//Adding click event listeners to each number button
numberButtons.forEach(button =>{
    button.addEventListener('click', (e) => {
        //Getting the value of the clicked button
        const number = button.textContent;
        //Appending the value to the display
        display.value += number; 
    })
})