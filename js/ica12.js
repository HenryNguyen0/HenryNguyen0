document.addEventListener('DOMContentLoaded', () => {
    const jokeButton = document.getElementById('jokeButton');
    const jokeText = document.getElementById('jokeText');
    const apiEndpoint = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
  
    // Function to fetch and display a joke
    async function getJoke() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Network response was not ok');
  
        const data = await response.json();
        console.log('Fetched Joke:', data.joke); // For debugging purposes
        displayRes(data.joke);
      } catch (error) {
        console.error('Failed to fetch joke:', error);
        alert('Something went wrong. Please try again later.');
      }
    }
  
    // Function to display joke in paragraph
    function displayRes(joke) {
      jokeText.textContent = joke;
    }
  
    // Event listener for button click
    jokeButton.addEventListener('click', getJoke);
  
    // Fetch and display a joke on initial page load
    getJoke();
  });