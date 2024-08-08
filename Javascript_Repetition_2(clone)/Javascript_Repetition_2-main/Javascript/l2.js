// Opgave 1
function getLength(str) {
  return str.length;
}
let word = "relativitetsteori";
console.log(`${word} er ${getLength(word)} bogstaver langt`);

// Opgave 2
let customer = {
  firstname: "Per",
  lastname: "Madsen",
  email: "per@pmsec.dk",
  phone: 33221212,
  address: "Dronningegade 32, 1.tv",
  postal: 6320,
};

// Opgave 3
function updateObject(obj, key, value) {
  let newObj = { ...obj, [key]: value };
  return newObj;
}

let editedCustomer = updateObject(customer, "firstname", "MOrten");

console.log("Original Customer: ", customer);
console.log("Edited Customer: ", editedCustomer);

// Opgave 4
function getObjTypes(obj) {
  for (let item in obj) {
    console.log("Type: ", typeof obj[item]);
  }
}

getObjTypes(customer);

// Random BG creator
function randomBG() {
  return `rgb(${Math.ceil(Math.random(0) * 255)}, ${Math.ceil(
    Math.random(0) * 255
  )},${Math.ceil(Math.random(0) * 255)})`;
}

// Opgave 5
function gen(obj) {
  let e;
  try {
    for (const key in obj) {
      switch (key) {
        case "type":
          e = document.createElement(obj[key]);
          break;

        case "className":
          e.classname = obj[key];
          break;

        case "id":
          e.id = obj[key];
          break;

        case "styles":
          e.style = obj[key];
          break;

        case "eventObj":
          if (obj[key] !== null && obj[key] !== undefined)
            e.addEventListener(obj[key].event, obj[key].action);
          break;

        case "text":
          e.innerText = obj[key];
          break;

        case "child":
          if (obj[key] !== null && obj[key] !== undefined)
            e.append(
              gen({
                type: obj[key].type,
                className: obj[key].className,
                id: obj[key].id,
                styles: obj[key].styles,
                eventObj: obj[key].eventObj,
                child: obj[key].child,
                text: obj[key].text,
              })
            );
          break;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return e;
}

let container = document.getElementById("container");
container.append(
  gen({
    type: "div",
    styles: "background-color: rgb(33,33,33); width: 5vh; height: 5vh;",
    eventObj: { event: "click", action: () => alert("You clicked the div!") },
  })
);

// Opgave 6

// Create a container for the grid
container.append(
  gen({
    type: "div",
    id: "top",
    styles:
      "height: 50vh; width: 50vw; display: grid; grid-template-columns: repeat(3, 1fr)",
  })
);

// Create a new array of 9 and fill it with generated content
let a = Array.from(new Array(9), (x, i) =>
  gen({
    type: "div",
    id: `arr_${i}`,
    styles: `background-color: ${randomBG()}`,
    child: {
      type: "p",
      id: `pChild-${i + 1}`,
      styles: `margin: 4px; text-align:center; padding: 2px; cursor: pointer;`,
      eventObj: {
        event: "click",
        action: () => alert(`Hey you clicked child nr: ${i + 1}`),
      },
      text: `I am Child number; ${i + 1}`,
    },
  })
);

// use spread operator to append all elements to the container
document.getElementById("top").append(...a);
