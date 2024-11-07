const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['chris.jpg', 'chick.png', 'DSC_0172.jpg', 'IMG_4912.jpg', 'IMG_1161.jpg'];
const alts = {
  'chris.jpg' : 'Closeup of a human eye',
  'chick.png' : 'Rock that looks like a wave',
  'DSC_0172.jpg' : 'Purple and white pansies',
  'IMG_4912.jpg' : 'Section of wall from a pharoah\'s tomb',
  'IMG_1161.jpg' : 'Large moth on a leaf'
};

/* Looping through images */

// for (const image of images) {
//     const newImage = document.createElement('image');
//     newImage.setAttribute('src', `../img/${images[image]}`);
//     newImage.setAttribute('alt', alts[image]);
//     thumbBar.appendChild(newImage);
//     newImage.addEventListener('click', e => {
//       displayedImage.src = e.target.src;
//       displayedImage.alt = e.target.alt;
//     });
//   }

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `/img/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
  
    newImage.addEventListener('click', e => {
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    });
  }
  

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
