const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');


form.addEventListener('submit',(e) => {
    if(inputs[0].value) {
        e.preventDefault();
        inputs[0].classList();
    }    
    console.log(inputs[0].value);
    e.preventDefault();
});

