const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');


for(let input of inputs){
    input.addEventListener('change',() =>{
        if((input.value) === ''){
            input.classList.add('invalid');
            input.classList.remove('valid')
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
        }
    });
}

form.addEventListener('submit',(e) => {
    for(let input of inputs){
         
            if((input.value) === ''){
                input.classList.add('invalid');
                input.classList.remove('valid');
                e.preventDefault();
            } else {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } 
    }
});

