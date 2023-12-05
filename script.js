
const dateDay = document.getElementById('date-day');
const dateMonth = document.getElementById('date-month');
const dateYear = document.getElementById('date-year');

const resultDay = document.getElementById('result-date-day');
const resultMonth = document.getElementById('result-date-month');
const resultYear = document.getElementById('result-date-year');

const buttonCalculate = document.querySelector('button.calculator--divider--action');


const MESSAGES_VALIDATE = {
    default: 'This field is requerid',
    invalidDay: 'Must be a valid day',
    invalidMonth: 'Must be a valid month',
    invalidYear: 'Must be in the past',
    invalidDate: 'Must be a valid date',
}

buttonCalculate.addEventListener('click', function () {

    if (!validates()) {
        return;
    }

    let day = parseInt(dateDay.value);
    let month = parseInt(dateMonth.value);
    let year = parseInt(dateYear.value);


    const dateNow = new Date();
    let yearNow = dateNow.getFullYear()
    let monthNow = dateNow.getMonth() + 1;
    let dayNow = dateNow.getDate()


    let yearsDiffResult = yearNow - year;
    let monthsDiffResult = monthNow - month;
    let daysDiffResult = dayNow - day;
    

    // Manejo de casos donde la diferencia de días o meses es negativa
    if (monthsDiffResult < 0 || (monthsDiffResult === 0 && daysDiffResult < 0)) {
        yearsDiffResult--;
        monthsDiffResult += (monthsDiffResult < 0) ? 12 : 0; // Ajuste para meses negativos
    }

    if (daysDiffResult < 0) {
        const fechaAnterior = new Date(yearNow, monthNow - 1, 0);
        const ultimoDiaMesAnterior = fechaAnterior.getDate();
        daysDiffResult = ultimoDiaMesAnterior - day + dayNow;
        monthsDiffResult--;
    }

    if(monthsDiffResult < 0){
        monthsDiffResult += 12;
    }

    console.log(`Diferencia: ${yearsDiffResult} años, ${monthsDiffResult} meses y ${daysDiffResult} días`);

    resultDay.textContent = daysDiffResult;
    resultMonth.textContent = monthsDiffResult;
    resultYear.textContent = yearsDiffResult;

});

const validates = () => {

    // validatrions Requerid
    let isValid = true;

    if (!validateRequerid(dateDay)) {
        isValid = false;
    };
    if (!validateRequerid(dateMonth)) {
        isValid = false;
    }
    if (!validateRequerid(dateYear)) {
        isValid = false;
    }

    if (!isValid) {
        return isValid;
    }

    let day = parseInt(dateDay.value);
    let month = parseInt(dateMonth.value);
    let year = parseInt(dateYear.value);

    // validate values date
    if (day > 31 || day < 1) {
        changeValueAlert(false, dateDay, MESSAGES_VALIDATE.invalidDay)
        isValid = false;
    }
    if (month > 12 || month < 1) {
        changeValueAlert(false, dateMonth, MESSAGES_VALIDATE.invalidMonth)
        isValid = false;
    }
    if (year > 2021 || year < 1900) {
        changeValueAlert(false, dateYear, MESSAGES_VALIDATE.invalidYear)
        isValid = false;
    }
    if (!isValid) {
        return isValid;
    }


    // validate date of birth
    if (!isValidDate(dateDay.value, dateMonth.value, dateYear.value)) {
        changeValueAlert(false, dateDay, MESSAGES_VALIDATE.invalidDate)
        isValid = false;
    }




    return isValid;
}

const validateRequerid = (input) => {
    let valid = false;
    if (!(input.value.trim() === '')) {
        valid = true;
    }

    changeValueAlert(valid, input, MESSAGES_VALIDATE.default)
    return valid;
}

const isValidDate = (day, month, year) => {

    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    const proposedDate = new Date(year, month - 1, day);

    console.log(" 1  proposedDate", proposedDate);
    console.log(" getDate  ", proposedDate.getDate(), day);
    console.log(" getMonth + 1", proposedDate.getMonth() + 1, month);
    console.log(" getFullYear  ", proposedDate.getFullYear(), year);

    return (
        proposedDate.getFullYear() === year &&
        proposedDate.getMonth() + 1 === month &&
        proposedDate.getDate() === day
    );
};


const changeValueAlert = (isValid, input, message) => {
    if (!isValid) {
        input.nextElementSibling.textContent = message
        input.parentElement.classList.add('alert');
    }
    else {
        input.parentElement.classList.remove('alert');
        input.nextElementSibling.textContent = '';
    }
}

