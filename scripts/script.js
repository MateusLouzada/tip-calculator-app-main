const buttonOne = document.getElementById("buttonOne");
const buttonTwo = document.getElementById("buttonTwo");
const buttonThree = document.getElementById("buttonThree");
const buttonFour = document.getElementById("buttonFour");
const buttonFive = document.getElementById("buttonFive");
const inputBill = document.getElementById("takeBill");
const inputCustom = document.getElementById("custom");
const inputNumberPeople = document.getElementById("numberPeople");
const resetButton = document.getElementById("reset");
const totalText = document.getElementById("totalPerson");
const tipAmount = document.getElementById("tipAmount");

const buttons = [buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive];

inputBill.focus();
render();

async function render() {
    await addEvents();
    changeTotal();
    changeTipAmount();
}

async function addEvents() {
    
    buttons.forEach((button) => {
        button.addEventListener("click", active);
        button.addEventListener("click", render);
    });

    inputBill.addEventListener("change", render);
    inputBill.addEventListener("keypress", render);
    inputCustom.addEventListener("change", render);
    inputCustom.addEventListener("keypress", render);
    inputNumberPeople.addEventListener("change", render);
    inputNumberPeople.addEventListener("keypress", render);
    resetButton.addEventListener("click", reset);
}

function changeTipAmount() {
    const totalAmount = calcTipPerson();

    tipAmount.innerHTML = "$" + totalAmount.toFixed(2);

    if (tipAmount.textContent == "$NaN") {
        tipAmount.innerHTML = "$0.00";
    } else if (tipAmount.textContent == "$Infinity") {
        tipAmount.innerHTML = "$0.00";
    }
}

function changeTotal() {
    const totalAmount = calcTotal();

    totalText.innerHTML = "$" + totalAmount.toFixed(2);

    if (totalText.textContent == "$NaN") {
        totalText.innerHTML = "$0.00";
    } else if (totalText.textContent == "$Infinity") {
        totalText.innerHTML = "$0.00";
    }
}

function calcTotal() {
    const billTotal = parseInt(takeBill());
    const numberPeople = parseInt(takeNumberPeople());
    let tip = parseInt(takeTip());
    const custom = takeCustom();

    if (typeof custom === "number") {
        buttons.forEach((button) => {
            button.classList.remove("active");
        });
        tip = custom;
        const resp = (billTotal + billTotal * (tip * 0.01)) / numberPeople;
        return resp;
    } else {
        const resp = (billTotal + billTotal * (tip * 0.01)) / numberPeople;
        return resp;
    }
}

function calcTipPerson() {
    const billTotal = parseInt(takeBill());
    const numberPeople = parseInt(takeNumberPeople());
    let tip = parseInt(takeTip());
    const custom = takeCustom();

    if (typeof custom === "number") {
        tip = custom;
        const resp = (billTotal * (tip * 0.01)) / numberPeople;
        return resp;
    } else {
        const resp = (billTotal * (tip * 0.01)) / numberPeople;
        return resp;
    }
}

function active() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
    } else this.classList.add("active");

    buttons.forEach((button) => {
        if (button == this) {
            return;
        } else {
            button.classList.remove("active");
        }
    });

    inputCustom.value = "";
}

function takeBill() {
    return inputBill.value;
}

function takeCustom() {
    if (inputCustom.value === "") {
        return inputCustom.value;
    }
    return parseInt(inputCustom.value);
}

function takeNumberPeople() {
    return inputNumberPeople.value;
}

function takeTip() {
    for (i = 0; i < 5; i++) {
        if (buttons[i].classList.contains("active")) return buttons[i].value;
    }
}

function reset() {
    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    totalText.innerHTML = "$0.00";
    tipAmount.innerHTML = "$0.00";
}
