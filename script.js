
const dateDay = document.getElementById('date-day');
const dateMonth = document.getElementById('date-month');
const dateYear = document.getElementById('date-year');

const buttonCalculate = document.querySelector('button.calculator--divider--action');


const MESSAGES_VALIDATE = {
    default: 'This field is requerid',
    invalidDay: 'Must be a valid day',
    invalidMonth: 'Must be a valid month',
    invalidYear: 'Must be in the past',
    invalidDate: 'Must be a valid date',
}

buttonCalculate.addEventListener('click', function () {
    
    validate();

});

const validate = () => {
    
    
    
    if (!validateRequerid(dateDay) || !validateRequerid(dateMonth) || !validateRequerid(dateYear)) {
        return false;
    };

    // if (dateDay.value > 31 || dateDay.value < 1) {
    //     alert('Invalid day');
    //     return false, ;
    // }
    // if (dateMonth.value > 12 || dateMonth.value < 1) {
    //     alert('Invalid month');
    //     return false;
    // }
    // if (dateYear.value > 2021 || dateYear.value < 1900) {
    //     alert('Invalid year');
    //     return false;
    // }
    // return true;
}

const validateRequerid = (input) => {
    
    if (input.value.trim() === '') {
        input.nextElementSibling.textContent = MESSAGES_VALIDATE.default;
        input.parentElement.classList.add('alert');
        return false;
    }
    input.parentElement.classList.remove('alert');
    return true;
}


