
const form = document.querySelector("#form");
const content = document.querySelector("#content");
const Uname = document.querySelector("#name");
const Pnum = document.querySelector("#Pnum");
const address = document.querySelector("#address");
const Pwidth = document.querySelector("#Pwidth");
const size = document.querySelectorAll(".size");
const ingredients = document.querySelectorAll(".ingredients");
const add = document.querySelectorAll(".add");

let orders = [];

const formHandler = (e) => {
  e.preventDefault();
  const order = {
    name: Uname.value,
    PhoneNum: Pnum.value,
    address: address.value,
    PhoneNum: Pnum.value,
    thickness: Pwidth.value,
    size: [],
    ingredient: [],
    add: [],
    id: Math.random().toFixed(2),
  };
  if (Uname.value == '') alert("Please enter a name");
  else if (Pnum.value == '') alert("Please enter a Phone number");
  else if (address.value == '') alert("Please enter a address");
  else {
    orders.push(order);
  }
  // for push value
  add.forEach((item) => {
    if (item.checked) order.add.push(item.value);
  });
  size.forEach((item) => {
    if (item.checked) order.size.push(+item.value);
  });
  ingredients.forEach((item) => {
    if (item.checked) order.ingredient.push(item.value);
  });
  // Clearing process
  Uname.value = null;
  Pnum.value = null;
  address.value = null;
  Pnum.value = null;
  Pwidth.value = "Thin";
  add.forEach((item) => {
    if (item.checked) item.checked=false;
  });
  size[0].checked=true;
  size[1].checked=false;
  size[2].checked=false;
  ingredients.forEach((item) => {
    if (item.checked) item.checked=false;
  });
  display();
}
function display() {
  let result = "";

  for (let i = 0; i < orders.length; i++) {
    result += `
    <div class="card position-relative fit m-3" style="width: 18rem;">
        <button type="button" onclick="deleteOrder(${orders[i].id})"
          class="delete position-absolute top-0 end-0"></button>
        <div class="card-body">
          <h5 class="card-title">Order: ${i + 1}</h5>
        </div>
        <div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <ul>
              <li class="m-1"><strong>Name: </strong>${orders[i].name}</li>
              <li class="m-1"><strong>Phone: </strong>+998${orders[i].PhoneNum}</li>
              <li class="m-1"><strong>Address: </strong>${orders[i].address}</li>
            </ul>
          </li>
          <li class="list-group-item">
            <ul class="list-group list-group-flush">
              <li class="list-group-item p-0">
                <ul class="mb-4">
                  <li class="m-1"><strong>Dough thickness: </strong>${orders[i].thickness}</li>
                  <li class="m-1"><strong>Size: </strong>${orders[i].size} sm</li>
                  <li class="m-1"><strong>On pizza: </strong>${orders[i].ingredient.join(", ")}</li>
                  <li class="m-1"><strong>Add: </strong>${orders[i].add.join(", ")}</li>
                </ul>
              </li>
              <li class="list-group-item text-end pe-5"><strong>Total: </strong>$${total(orders[i].id)}</li>
            </ul>
          </li>
        </ul>
      </div>
      `;
  }
  content.innerHTML = result;
}
function deleteOrder(elementId) {
  let arr2 = orders.filter((element) => {
    return +element.id !== elementId;
  });
  orders = arr2;
  display();
}
function total(elementId) {
  let sum = 0
  let findOrder = orders.find((element) => +element.id == elementId);
  switch (+findOrder.size) {
    case 30: sum += 12; break;
    case 35: sum += 15; break;
    default: sum += 10; break;
  }
  console.log(sum);
  switch (findOrder.thickness) {
    case "Thick": sum += 15; break;
    case "Medium": sum += 12; break;
    default: sum += 10; break;
  }
  console.log(sum);
  sum += findOrder.ingredient.length * 5;
  console.log(sum);
  sum += findOrder.add.length * 3;
  return sum;
}
form.addEventListener("submit", formHandler);