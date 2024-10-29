let my_var = 100;
var my_other_var = "hello world";
const this_is_a_constant = "constant";
console.log(my_other_var);
my_other_var = "1";
// alert(my_other_var);


console.log(document.getElementById("my_head"));
document.getElementById("paragraph").addEventListener("click", function(e){
    alert("DEMON DEMON DEMON");
    document.getElementById("my_head").style.background = "red";
})

document.getElementById("image").addEventListener("click", function(e){
    document.getElementById("image").style.cssText = "float:right";

})

document.getElementById("image").addEventListener("mouseover", function(e){
    document.getElementById("image").style.cssText = "float:left";

})


console.log(document.getElementById("my_head").innerHTML);