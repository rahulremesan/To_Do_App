const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const item = document.querySelector("#item")
    createItem(item)
  }
})

function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
}

function displayItems(){
  let items = ""
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-delete-left deleteBtn"></i>
                    <i class="fa-solid fa-check doneBtn"></i>
                  </div>
                </div>

              </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
}

function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i) })
  })
}


function activateEditListeners() {
  const editBtn = document.querySelectorAll(".doneBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");

  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      editItem(i, inputs);
    });
  });

  // Load "done" content from local storage on page load
  for (let i = 0; i < inputs.length; i++) {
    const doneContent = localStorage.getItem(`done_${i}`);
    if (doneContent) {
      inputs[i].value = doneContent;
      inputs[i].style.textDecoration = "line-through";
    }
  }
}

function createItem(item){
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i){
  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function editItem(i, inputs) {
  // Strike through the content
  const isDone = inputs[i].style.textDecoration === "line-through";
  inputs[i].style.textDecoration = isDone ? "none" : "line-through";

  // Save "done" status to local storage
  const content = inputs[i].value;
  localStorage.setItem(`done_${i}`, isDone ? "" : content);
}

window.onload = function() {
  displayDate()
  displayItems()
};
