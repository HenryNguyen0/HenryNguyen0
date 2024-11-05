const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was 32 Fahrenheit outside, so :insertx: stayed inside because it was freezing. They got to the couch and turned on :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = ["Willy Wonka", "Big Daddy", "The Lorax"];

const insertY = ["The Dark Knight Rises", "She's the Man", "Wayne's World"];

const insertZ = ["spontaneously combusted", "melted into a puddle on the wall", "turned into a slug and crawled away"];

randomize.addEventListener('click', result);

function result() {  

    const storyText = "It was 32 Fahrenheit outside, so :insertx: stayed inside. When they sat on the couch, they turned on :inserty:, they stared in horror for a few moments when the TV :insertz:. Bob saw the whole thing, but was not surprised — :insertx: froze to death, and it was a cold day.";


    // Create a new story each time by copying storyText into newStory
    let newStory = storyText;
  
    // Randomly select items from each array
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
  
    // Replace placeholders with random items
    newStory = newStory.replace(/:insertx:/g, xItem)
                       .replace(":inserty:", yItem)
                       .replace(":insertz:", zItem);
  
    // If a custom name is provided, replace 'Bob' with the custom name
    if(customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replace("Bob", name);
    }
  
    // If UK option is checked, convert to stones and centigrade
    if(document.getElementById("uk").checked) {
      const weight = Math.round(300 * 0.071429) + " stone"; // Convert 300 pounds to stones
      const temperature = Math.round((94 - 32) * 5 / 9) + " centigrade"; // Convert 94 Fahrenheit to Celsius
  
      // Replace temperature and weight in the story
      newStory = newStory.replace("32 Fahrenheit", temperature)
                         
    }
  
    if (insertX == "Willy Wonka"){

    }

    // Display the final story
    story.textContent = newStory;
    story.style.visibility = 'visible';

  }