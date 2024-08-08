var myHome = "Aalborg";
let myName = "Kasper";
const myAge = 33;

// At ændre en var
myHome = "Skagen";
console.log("myHome was originally Aalborg. Now it is :", myHome);

// At ændre en let
myName = "Jonas";
console.log("myName was originally Kasper. Now it is : ", myName);

// At ændre en const
//myAge = 23; // throws assignment error
console.log("myAge is originally 33. Now it is: ", myAge);

// Opgave 2

let a = 992;
let b = 237;
console.log(`${a} + ${b} = `, a + b);

let c = 44;
let d = 12;
console.log(`${c}-${d} = `, c - d);

let e = 142;
let f = 23;
console.log(`${e}*${f} = `, e * f);

let g = 94;
let h = 23;
console.log(`${g}/${h} = `, g / h);

// Opgave 3
let clickBtn = document.createElement("button");
clickBtn.innerText = "Click me";
let clickText = document.createElement("p");
clickText.style.color = "rgb(240,240,240)";
let container = document.getElementById("lektion_1");
let count = 0;

clickBtn.addEventListener("click", () => {
  clickText.innerText = "You clicked: " + count++ + " times";
});

container.append(clickText, clickBtn);

// Opgave 4
let inputField = document.createElement("input");
let errorText = document.createElement("b");

function checkLength(event) {
  console.log("changed value");
  if (event.target.value.length < 8) {
    console.log("PASSWORD NOT LONG ENOUGH");
    errorText.innerText = "Password is not long enough";
  } else {
    errorText.innerText = "";
  }
}

inputField.addEventListener("input", (e) => checkLength(e));
container.append(inputField, errorText);

// Opgave 5
let divContainer = document.createElement("div");
divContainer.style = `display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 4px`;
container.append(divContainer);

for (let i = 0; i < 4; i++) {
  let div = document.createElement("div");
  div.style = `width: max-width; height: 40vh; border: solid 2px black;`;
  div.addEventListener("mouseenter", () => {
    let r = Math.round(Math.random(0) * 255);
    let g = Math.round(Math.random(0) * 255);
    let b = Math.round(Math.random(0) * 255);
    console.log(r, g, b);
    div.style = `width: max-width; height: 40vh; border: solid 2px black; background: rgb(${r},${b},${g});`;
  });
  divContainer.append(div);
}
