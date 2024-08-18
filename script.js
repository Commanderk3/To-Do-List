// Select the div using query selector and store it in a variable. You can't do operations directly on HTML objects.
// add, remove, move-div-up-down, check-box
// Event Delegation: Instead of attaching an event listener to each button individually (which is inefficient),
// we use event delegation. We add a single click event listener to the .list container.
// This listener checks if the clicked element is a Remove button (by checking its class),
// and if so, removes the parent div (the task) from the DOM. The target property returns the element where the event occured.

const classDiv = document.querySelector(".list");
document.getElementById("resetButton").addEventListener("click", function() {
  location.reload(); // This reloads the current page
});

const removeDiv = (div) => {
  const removeButton = document.createElement("button");
  removeButton.innerText =  "Delete";
  removeButton.className = "removeButton";
  div.appendChild(removeButton);
};

const upDiv = (div) => {
  const upButton = document.createElement("button");
  upButton.innerText = "Up";
  upButton.className = "upButton";
  div.appendChild(upButton);
};

const downDiv = (div) => {
  const downButton = document.createElement("button");
  downButton.innerText = "Down";
  downButton.className = "downButton";
  div.appendChild(downButton);
};

const checkDiv = (div) => {
  const check = document.createElement("button");
  check.innerHTML = "Done";
  check.className = "checkButton";
  div.appendChild(check);
};

const add = (text) => {
  const div = document.createElement("div");
  div.id = `task`;
  div.innerHTML = `<p class="note">Task : ${text}</p>`;

  // Remove button
  removeDiv(div);

  // Up button
  upDiv(div);

  // Down button
  downDiv(div);

  // Check Box
  checkDiv(div);

  classDiv.appendChild(div);
};

const insertAfter = (newNode, existingNode) => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const plus = document.querySelector(".plus");
let count = 1;

plus.addEventListener("click", function () {
  let newTask = document.getElementById("newTask");
  let task = newTask.value;
  if (task.trim() !== "") {
    // Ensure the task is not empty
    add(task, count);
    count++;
    newTask.value = ""; // Clear the input field
  }
});

// Event listener for removing tasks
classDiv.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("removeButton")) {
    const taskDiv = event.target.parentElement;
    taskDiv.remove(); // Remove the task div
    count--;
  }
});

// Event listener for moving tasks up
const stopper = document.getElementById("resetButton");
classDiv.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("upButton")) {
    const current = event.target.parentElement;
    const previous = current.previousElementSibling;

    if (previous && previous != stopper) {
      // Check if there's a previous sibling to swap with
      current.parentElement.insertBefore(current, previous);
    }
  }
});

// Event listener for moving task down
classDiv.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("downButton")) {
    const current = event.target.parentElement;
    const next = current.nextElementSibling;
    if (next) {
      insertAfter(current, next);
    }
  }
});

// Event Listener for marking tasks as done
classDiv.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("checkButton")) {
    const taskDiv = event.target.parentElement;
    const flagButton = taskDiv.querySelector(".checkButton"); //used querySelector instead of childNode as childNode returns a node list containing all children
    const message = taskDiv.querySelector(".note");

    if (flagButton.innerHTML === "Done") {
      taskDiv.style.backgroundColor = "#49ff64";
      flagButton.innerHTML = "Undo";
      message.style.textDecoration = "line-through";
      insertAfter(taskDiv, classDiv.lastChild);
    } else {
      taskDiv.style.backgroundColor = "#ff4949";
      flagButton.innerHTML = "Done";
      message.style.textDecoration = "none";
    }
  }
});

