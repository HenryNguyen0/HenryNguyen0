let ourObject = {
    "name": "casey",
    "profession": "PhD Student",
    "age": 30,
    "pets":[{"name":"Boots", "type":"dog", "age": 9, "unit": "years"}, {"name":"Marty", "type": "cat", "age":5, "unit": "months"}]
}

console.log(ourObject);

let myData = {};

function fetchData(){
    fetch('https://catfact.ninja/fact')
    .then(res =>{
        if(res.ok){
            return res.json();
        }else{
            console.log(res);
        }
    }).then(res => {
        myData = res;
        console.log(myData);
        document.getElementById("fact").innerHTML = myData.fact;
    })
    .catch(error => {console.log(error)})
}

function getJoke(){
    document.getElementById("generate").addEventListener("click", e=> console.log)
}

document.getElementById("generate").addEventListener("click", e=> {fetchData();})

console.log(myData);

let name = "henry";

let nameString = "hello " + name + "!";
let myString = `hello ${name} !`;