let myData = {};

function fetchData(){
    // Returns a random integer from 0 to 2999:
    num = Math.floor(Math.random() * 3000);
    fetch(`https://corsproxy.io/?https://xkcd.com/${num}/info.0.json`)

    .then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log(res);
        }
    })

    .then (res => {
        myData = res;
        console.log(myData);

        // title
        document.getElementById("title").innerHTML =  myData.title;
        //display comic
        document.getElementById("comic").src = myData.img;
        //change alt text
        document.getElementById("comic").alt = myData.alt;
        //date
        document.getElementById("date").textContent = `${myData.month}/${myData.day}/${myData.year}`;
    })
}
fetchData();

document.getElementById("generate").addEventListener("click", e=> {fetchData();})

console.log(myData);