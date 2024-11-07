// Fortune Teller Function
function tellFortune() {
  // Get values from the input fields
  const numChildren = document.getElementById('numChildren').value;
  const partnerName = document.getElementById('partnerName').value;
  const location = document.getElementById('location').value;
  const jobTitle = document.getElementById('jobTitle').value;

  // // Validate inputs
  // if (numChildren === '' || partnerName === '' || location === '' || jobTitle === '') {
  //   alert('Please fill in all fields!');
  //   return;
  // }

  // Construct the fortune message
  const fortuneMessage = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;

  console.log(fortuneMessage);
  // Display the fortune message
  document.getElementById('fortunes').innerHTML = `<p>${fortuneMessage}</p>`;
}
  
  tellFortune(2, 'Alex', 'New York', 'Software Developer');
  tellFortune(3, 'Jamie', 'Paris', 'Artist');
  tellFortune(1, 'Jordan', 'Tokyo', 'Engineer');
  
  // Dog Age Calculator
  function calculateDogAge(puppyAge) {
    const dogAge = puppyAge * 7;
    const result = `Your doggie is ${dogAge} years old in dog years!`;
    document.getElementById('dog-ages').innerHTML += `<p>${result}</p>`;
    document.getElementById('userDogAge').innerText = result;
  }
  
  calculateDogAge(1);
  calculateDogAge(2);
  calculateDogAge(3);
  

  // Reverse Number Function
  function reverseNumber(num) {
    const strRev =  num.split('').reverse().join('');
    // const reversed = '123';
    // console.log(strRev);
    document.getElementById('reverseNumber').innerHTML += `<p>${strRev}</p>`;
    document.getElementById('numberReversed').innerText = reversed;

}

reverseNumber("HTML");
reverseNumber("JavaScript");
reverseNumber("TypeScript");



  // Alphabetical Order Function
  function alphabetizeString(str) {
    const alphabetized = str.split('').sort().join('');
    // console.log(alphabetized);
    document.getElementById('alphabetizedStrings').innerHTML += `<p>${alphabetized}</p>`;
  }
  
  alphabetizeString('webmaster');
  alphabetizeString('javascript');
  
  // Capitalize Words Function
  function capitalizeWords(str) {
    const capitalized = str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    document.getElementById('capitalizedStrings').innerHTML += `<p>${capitalized}</p>`;
  }
  
  capitalizeWords('the quick brown fox');
  capitalizeWords('hello world');
  