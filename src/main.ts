import './body.scss'

const inputContainers: NodeList = document.querySelectorAll('.input');
const ageInput: HTMLInputElement = document.querySelector('.age-input');
const cupsPerWeekInput: HTMLInputElement = document.querySelector('.cups-per-week-input');
const coffePriceInput: HTMLInputElement = document.querySelector('.coffee-price-input');
const form: HTMLFormElement = document.querySelector('form');
const tryAgainBtn: HTMLButtonElement = document.querySelector('.try-again-btn');
const resultsWrapper: HTMLDivElement = document.querySelector('.results-wrapper');
const calculatorForm: HTMLFormElement = document.querySelector('.calculator-form');
const tabsWrapper: HTMLDivElement = document.querySelector('.tabs-wrapper');
const inputContainer: HTMLDivElement = document.querySelector('.input-container');
const calculationInfoTab: HTMLDivElement = document.querySelector('.calculation-info-tab');
const buttonWrapper: HTMLDivElement = document.querySelector('.button-wrapper');
const tabs: HTMLDivElement[] = Array.from(document.querySelectorAll('.tab'));

const interestRate: number = 0.0284; // percentage
const inflationRate: number = 0.024; // percentage
const pensionAge: number = 67;
const weeks: number = 52;
let cupsPerWeek: number;
let userAge: number;
let coffeeCupPrice: number ; // £


const annualNumberOfCups: number = weeks * cupsPerWeek;


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [weeklyCostNode, cupPriceNode, annualCostNode]: any = Array.from(document.querySelectorAll('.user-input-value'));
  userAge = Number(ageInput.value);
  cupsPerWeek = Number(cupsPerWeekInput.value);
  coffeeCupPrice = Number(coffePriceInput.value);
  
  const costPerWeek  = cupsPerWeek * coffeeCupPrice;
  const costPerYear = (cupsPerWeek * 52) * coffeeCupPrice;


  weeklyCostNode.textContent = costPerWeek;
  cupPriceNode.textContent = coffeeCupPrice;
  annualCostNode.textContent = costPerYear.toLocaleString();
  
  buttonWrapper.classList.remove('hidden');
  calculatorForm.classList.add('hidden');
  resultsWrapper.classList.remove('hidden');
  calculationInfoTab.classList.remove('hidden');
  tabsWrapper.classList.remove('hidden');
  tabsWrapper.classList.remove('hidden');
  inputContainer.classList.add('border');
})

tryAgainBtn.addEventListener('click', (e) => {
  e.preventDefault();
  calculatorForm.classList.remove('hidden');
  resultsWrapper.classList.add('hidden');
  calculationInfoTab.classList.add('hidden');
  tabsWrapper.classList.add('hidden');
  inputContainer.classList.remove('border');
  buttonWrapper.classList.add('hidden');
  changeTab(document.querySelector('.tab-info'));
})

for(let tab of tabs) {
  tab.addEventListener('click', (e) => changeTab((e.target as HTMLElement)))
}
 
function changeTab(tab: HTMLElement) {
  
  const activeContent = document.querySelector('.active');
  if (activeContent) {
    activeContent.classList.remove('active');
    activeContent.classList.add('hidden');
  };

  const showTab = tab.dataset?.showtab;
  const newActiveTab = document.querySelector(`.${showTab}`);
  if (newActiveTab) {
    newActiveTab.classList.remove('hidden');
    newActiveTab.classList.add('active');
  }

  const activeTab = document.querySelector('.selected-tab');
  if (activeTab) {
    activeTab.classList.remove('selected-tab');
    tab.classList.add('selected-tab');
  }

  if (showTab === 'x-year-results') {
    const years = tab.dataset?.years;
    const savings = generateSavings(years === 'retirement' ? calculateYearsUntilPension(userAge, pensionAge) : +years);
    document.querySelector('.x-year').textContent = (years === 'retirement' ? calculateYearsUntilPension(userAge, pensionAge) : +years).toString();
    document.querySelector('.x-year-savings-result').textContent = savings.toLocaleString();
  }


}

function generateSavings(years): number {
  let balance = 0;
  let pricePerCup = coffeeCupPrice;
  for (let i = 0; i < years; i++) {
    const pricePerYear = (cupsPerWeek * 52) * pricePerCup;
    balance += pricePerYear;
    balance += balance * interestRate;
    pricePerCup += pricePerCup * inflationRate;
  }
  return Math.round(balance);
}

function calculateYearsUntilPension(userAge, pensionAge) {
  const years: number = pensionAge - userAge;
  return years;
}
