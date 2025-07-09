// //currying function ->way to pass sinfle argument or parameter at a time

// function sumOfthreenumbers(a,b,c){
//     console.log(a+b+c);
//     return a+b+c;
// }
// sumOfthreenumbers(2,4,6);

// //you go to subway
// //1. choose the bbread

// function subwayOrder(bread,patty,cheese){
//     console.log(`MY BRREAD ${bread} with PATTY: ${patty} CHEESE: ${cheese}`);
// }
// //currying in js

// function subwayOrder2(bread){
//     return function(patty){
//         return function(cheese){
//             console.log(`MY BREAD ${bread} with PATTY: ${patty} CHEESE: ${cheese}`);

//         }
//     }
// }
// subwayOrder2("ORIGANO")("CHICKEN")("WITH CHEESE");

//EVENT LISTENERS
//DOM-> DOCUMENT OBJECT MODEL
//IT IS A TREE LIKE STRUCTURE OF ELEMENTS

const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

grandparent.addEventListener("click",()=> {
    console.log("Grandparent clicked");
},true)

parent.addEventListener("click",()=>{
    console.log("Parent clicked");
},true)

child.addEventListener("click",()=>{
    console.log("Child clicked");
},true)

