import './body.scss'

const inputContainers: NodeList = document.querySelectorAll('.input');
const ageInput: HTMLInputElement = document.querySelector('.age-input');
const cupsPerWeekInput: HTMLInputElement = document.querySelector('.cups-per-week-input');
const coffePriceInput: HTMLInputElement = document.querySelector('.coffee-price-input');
const submitBtn: HTMLInputElement = document.querySelector('.submit-btn');

const interestRate: number = 0.0284; // percentage
const pensionRate: number = 0.02; // percentage
const inflationRate: number = 0.024; // percentage
const pensionAge: number = 67;
const weeks: number = 52;
const yearPlaceholder: number = 5;
const fiveYears: number = 5;
const tenYears: number = 10;
const fifteenYears: number = 15;
let cupsPerWeek: number = 0;
let userAge: number = 0;
let coffeeCupPrice: number = 0; // £
const annualNumberOfCups: number = weeks * cupsPerWeek;
const yearsTillPension: number = calculateYearsUntilPension(userAge, pensionAge);
const annualPriceOfCups: number = (annualNumberOfCups * coffeeCupPrice);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let userAge = ageInput.value;
  console.log(userAge);
})


function calculateYearsUntilPension(userAge, pensionAge) {
  let years: number = pensionAge - userAge;
  return years;
}


function calculateAnnualRate(cupsPerWeek, rate) {
  const annualInterest: number = Number((annualNumberOfCups * rate).toFixed(2));
  return annualInterest;
}

calculateAnnualRate(cupsPerWeek, interestRate);
calculateAnnualRate(cupsPerWeek, pensionRate);

function simpleInterestFormula(principal: number, rate: number, time: number): number {
  const interest = (principal * rate) * time;
  // const priceWithInterest = interest + annualPriceOfCups;
  return +interest.toFixed(2);
};


function calculateTimePeriod(years: number) {
  const calculatedInterest: number = simpleInterestFormula(annualPriceOfCups, interestRate, yearPlaceholder);
  const calculatedPension: number = simpleInterestFormula(annualPriceOfCups, pensionRate, yearPlaceholder);
  const annualPriceWithInterest: number = calculatedInterest + calculatedPension + annualPriceOfCups;
  const total = years * annualPriceWithInterest;
  console.log(+total.toFixed(2));
  return +total.toFixed(2);
}

calculateTimePeriod(yearsTillPension);

