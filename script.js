const inputBtnEl = document.getElementById("input-btn");
const deleteBtnEl = document.getElementById("delete-btn");
const tabBtnEl = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const listEl = document.getElementById("list-el");
let savedLeads = [];
let archivedLeads = [];
let myLeads = [];

// save lead on user click and store data
inputBtnEl.addEventListener("click", function () {
  // add input value to the array and then function to render array items to the browser
  savedLeads.push(inputEl.value);
  render(savedLeads);
  // empty input field on browser
  inputEl.value = "";

  // console.log(savedLeads);

  // save the array to local storage
  localStorage.setItem("savedLeads", JSON.stringify(savedLeads));

  // verify it works
  // console.log(typeof savedLeads);
  // console.log(localStorage.getItem("savedLeads"));
});

// get items saved to local storage
const localStorageLeads = JSON.parse(localStorage.getItem("savedLeads"));

// check that there are items in local storage before rendering with truthy
function leadsFromLocalStorage() {
  if (localStorageLeads) {
    savedLeads = localStorageLeads;
    console.log(localStorageLeads);
    render(savedLeads);
  }
}

leadsFromLocalStorage();

// render the items within the saved leads array using for loop
// by creating a listItems variable and storing the elements within the variable it will increase the performance when called
// rather than changing the dom each time as direct DOM manipulation comes with performance cost
// rafctored to add parameter to render function, so we can have the option of passing in different arrays

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
    <a target='_blank' href='#'>
    ${leads[i]}
    </a>
    </li>
    `;
  }
  // add item to html list element

  listEl.innerHTML = listItems;
}

// clear all items from local storage
deleteBtnEl.addEventListener("click", function () {
  // clear local storage, array, dom
  localStorage.clear();
  savedLeads.length = 0;
  render(savedLeads);
});

// get URL
tabBtnEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    savedLeads.push(tabs[0].url);
    localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
    render(savedLeads);
  });
});
