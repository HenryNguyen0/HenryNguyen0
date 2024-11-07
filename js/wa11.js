const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['../img/pic1.jpg', '../img/pic2.jpg', '../img/pic3.jpg', '../img/pic4.jpg', '../img/pic5.jpg'];
const alts = {
  '../img/pic1.jpg' : 'Closeup of a human eye',
  '../img/pic2.jpg' : 'Rock that looks like a wave',
  '../img/pic3.jpg' : 'Purple and white pansies',
  '../img/pic4.jpg' : 'Section of wall from a pharoah\'s tomb',
  '../img/pic5.jpg' : 'Large moth on a leaf'
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
    newImage.setAttribute('src', `img/${image}`);
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
