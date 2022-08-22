// DOM Selectros
let allDays;
const myForm = document.querySelector("#myForm");
const checkbox = document.querySelector(".checkbox");
const alarmBox = document.querySelector(".enable-alarm");
const sectionCta = document.querySelector(".section-cta");
const taskWindow = document.querySelector(".task-window");
const showAllactivities = document.querySelector(".show-all-activity");
const showAllTasksSection = document.querySelector(".show-all-tasks-section");
const filterTask = document.querySelector("#filter");
const popup = document.querySelector(".pop-up");
const popupHeading = document.querySelector(".pop-heading");
const popupParagraph = document.querySelector(".pop-paragraph");
const popupBtn = document.querySelector(".pop-up-ok");


// Buttons
const checkBtn = document.querySelector(".check");
const addBtn = document.querySelector(".btn-add");
const closeBtn = document.querySelector(".btn-close");
const createActivityBtn = document.querySelector(".create-activity");
const closeTaskWindow = document.querySelector(".close-window");
const closeShowTask = document.querySelector(".close-show-tasks");

// Inputs 
const dateInput = document.querySelector("#date");
const inputTitle = document.querySelector("#title-task");
const inputShortTitle = document.querySelector("#short-title");
const inputTaskTag = document.querySelector("#tag");
const appStartTimeValue = document.querySelector("#start-time");
const appEndTimeValue = document.querySelector("#end-time");
const alarmTimeValue = document.querySelector("#alarmTime");

//Create table
const tableEl = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");
const tableTr = document.createElement("tr");
const thDate = document.createElement("th");
const thTitle = document.createElement("th");
const thStartTime = document.createElement("th");
const thEndTime = document.createElement("th");
const thTag = document.createElement("th");
const thFilter = document.createElement("th");
thDate.textContent = "Date";
thStartTime.textContent = "Start";
thEndTime.textContent = "End";
thTitle.textContent = "Title";
thTag.textContent = "Tag"

// -----------VARIABLES-----------
const date = new Date();
let month = new Date().getMonth() + 1;
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
let tasks = [];
let copyOfTasks = [];


// -------------FUNCTIONS------------------
function createRow(task) {
  const tableBodyTr = document.createElement("tr");
  tableBody.appendChild(tableBodyTr);
  const taskDate = document.createElement("td");
  taskDate.textContent = task.date;
  tableBodyTr.appendChild(taskDate);
  const taskStartTime = document.createElement("td");
  taskStartTime.textContent = task.startTime;
  tableBodyTr.appendChild(taskStartTime);
  const taskEndTime = document.createElement("td");
  taskEndTime.textContent = task.endTime;
  tableBodyTr.appendChild(taskEndTime);
  const taskTitle = document.createElement("td");
  taskTitle.textContent = task.title;
  tableBodyTr.appendChild(taskTitle);
  const taskTag = document.createElement("td");
  taskTag.textContent = task.tag;
  tableBodyTr.appendChild(taskTag);
  const removeTask = document.createElement("td");
  removeTask.textContent = "delete";
  removeTask.setAttribute('class', 'delete_button');
  tableBodyTr.appendChild(removeTask);
  const editTask = document.createElement("td");
  editTask.textContent = "edit";
  editTask.setAttribute('class', 'edit_button');
  tableBodyTr.appendChild(editTask);
}

function showTasks() {
  if (!tasks.length) {
    taskNum.textContent = "No tasks created yet";
  }
  else {
    copyOfTasks.forEach((task) => {
      createRow(task);
    })
    taskNum.textContent = `You have ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} to complete`;
    showAllTasksSection.appendChild(tableEl);
    tableEl.appendChild(tableHead);
    tableHead.appendChild(tableTr);
    tableTr.appendChild(thDate);
    tableTr.appendChild(thStartTime);
    tableTr.appendChild(thEndTime);
    tableTr.appendChild(thTitle);
    tableTr.appendChild(thTag);
    tableEl.appendChild(tableBody);
  }
  copyOfTasks = [];
};

function renderCalendar() {
  date.setDate(1);
  const monthDays = document.querySelector(".days");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="passed day prev-date">${prevLastDay - x + 1}</div>`;
  }


  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="day day-${i} month-${month} today">${i}</div>`;
    }
    else if (i < new Date().getDate() &&
      date.getMonth() === new Date().getMonth()) {
      days += `<div class="passed day">${i}</div>`;
    }
    else {
      days += `<div class="day day-${i} month-${month}">${i}</div>`;
      days[i].onclick == function () {
        days[i].innerHTML = "YOU CLICKED ME!";
        console.log(days);
      };
    }
  }
  setTimeout(task, 200);
  const buttons = document.querySelectorAll('.days');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
    };
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day day-${j} month-${month + 1} next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

function showExpendTask(obj) {
  taskWindow.style.display = "block"
  document.querySelector(".date-task").textContent = `${obj.date} - ${obj.startTime} - ${obj.endTime}`;
  // document.querySelector(".time-title").textContent = obj.startTime;
  document.querySelector(".task-title").textContent = `${obj.title}`;
  // document.querySelector(".end-time-title").textContent = obj.endTime;
  document.querySelector(".text-type").textContent = obj.tag;
  console.log("hh: ", obj.alarm)
  if (obj.alarm) {
    console.log("check")
    document.querySelector(".reminder-box").style.display = "flex";
    document.querySelector(".text-alarm").textContent = `${obj.alarmtime} minutes before`;
  }
  document.querySelector(".delete-icon").addEventListener("click", () => {
    taskWindow.style.display = "none"
  })
}

function task() {
  allDays = document.querySelectorAll(".day");
  allDays.forEach(el => {
    el.addEventListener("click", (ce) => {
      if (el.classList.contains("passed")) {
        popup.style.display = "block";
        popupHeading.textContent = "";
        popupParagraph.textContent = "You have select passed day";
      }
      else {
        sectionCta.style.display = "block";
        let elM = el.classList[2].slice(-2);
        let elD = el.classList[1].slice(-2);
        let elmConverted;
        let eldConverted;

        if (elM < 0) {
          elmConverted = elM.replace("-", "0");
        } else {
          elmConverted = elM;
        };

        if (elD < 0) {
          eldConverted = elD.replace("-", "0");
        } else {
          eldConverted = elD;
        }

        document.querySelector("#date").setAttribute("value", `${new Date().getFullYear()}-${elmConverted}-${eldConverted}`)

        if (el.querySelector(".task") === null) {
          taskAppend = document.createElement("div");
          taskAppend.classList.add("task");
          el.appendChild(taskAppend);
          console.log(el.querySelector(".task"));
        }
        else {
          taskAppend = el.querySelector(".task");
        }
      }
    })
  })
};

function closeForm() {
  document.getElementById("myForm").style.display = "none";
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  month--;
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  month++;
  renderCalendar();
});
renderCalendar();
checkbox.addEventListener("change", () => {
  if (checkbox.checked == true) {
    checkBtn.style.background = "#3dd176"
    alarmBox.style.display = "flex";
    sectionCta.style.top = "4rem"
  } else {
    checkBtn.style.background = "#9b9b9b"
    alarmBox.style.display = "none";
    sectionCta.style.top = "8rem"
  }
});

function alarmCheck() {
  const checkDate = new Date();
  const currentTime = `${checkDate.getHours()}:${checkDate.getMinutes()}`;
  tasks.forEach((task) => {
    if (task.date === today && task.startTime === currentTime) {
      popup.style.display = "block";
      popupHeading.textContent = "Alarm";
      popupParagraph.textContent = `${task.title} is starting right now`;
    }
    let checkMin = checkDate.getMinutes() + Number(task.alarmtime);
    let checkHour = checkDate.getHours();
    if (checkMin >= 60) {
      checkMin = checkMin - 60;
      checkHour++;
      if (checkHour > 23) {
        checkHour = 0;
      }
    }
    if (checkMin < 10) {
      checkMin = "0" + checkMin;
    }
    if (checkHour < 10) {
      checkHour = "0" + checkHour;
    }
    let alarmReminder = `${checkHour}:${checkMin}`;
    if (task.alarm) {
      if (task.date === today && alarmReminder === task.startTime) {
        popup.style.display = "block";
        popupHeading.textContent = "Reminder";
        popupParagraph.textContent = `You have ${task.alarmtime} minutes from starting ${task.title}`;
      }
    }
  });
};

const alarmInterval = setInterval(alarmCheck, 60000);


// --------END of FUNCIONS-----------


// ---------EVENT LISTENERS------------
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sectionCta.style.display = "none";
})

createActivityBtn.addEventListener("click", () => {
  document.querySelector("#date").setAttribute("value", `${today}`);
  sectionCta.style.display = "block";

  const el = document.querySelector(`.day-${String(new Date().getDate())}.month-${new Date().getMonth() + 1}`)
})

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputTitle.value === "" || inputShortTitle.value === "" || inputTaskTag.value === "" || appStartTimeValue.value === "" || appEndTimeValue.value === "") {
    alert("Please fill out fields with * (required)");
  }
  else if (inputTaskTag.value == "Select tag") {
    alert("Please select a tag");
  }
  else {
    let dateValue;
    let monthValue;

    if (dateInput.value.slice(-2) == 10 || dateInput.value.slice(-2) == 20 || dateInput.value.slice(-2) == 30) dateValue = dateInput.value.slice(-2);
    else dateValue = dateInput.value.slice(-2).replace("0", "");

    if (dateInput.value.slice(5, 7) == 10) monthValue = dateInput.value.slice(5, 7);
    else monthValue = dateInput.value.slice(5, 7).replace("0", "");

    // Create task
    const taskObj = {
      date: dateInput.value,
      title: inputTitle.value,
      shortTitle: inputShortTitle.value,
      startTime: appStartTimeValue.value,
      endTime: appEndTimeValue.value,
      tag: inputTaskTag.value,
      alarm: checkbox.checked,
      alarmtime: alarmTimeValue.value
    }
    const el = document.querySelector(`.day-${dateValue}.month-${monthValue}`);

    if (el.querySelector(".task") === null) {
      taskAppend = document.createElement("div");
      taskAppend.classList.add("task");
      el.appendChild(taskAppend);
    }
    else {
      taskAppend = el.querySelector(".task");
    }
    taskAppend = el.querySelector(".task");
    const pTask = document.createElement("p");
    pTask.setAttribute("title", `${inputTitle.value} from ${appStartTimeValue.value} to ${appEndTimeValue.value}`);
    pTask.textContent = taskObj.shortTitle;
    taskAppend.appendChild(pTask);
    tasks.push(taskObj);
    copyOfTasks.push(taskObj);
    pTask.addEventListener("click", (e) => {
      e.stopPropagation();
      showExpendTask(taskObj);
    })

    // Reset inputs
    inputTitle.value = "";
    inputShortTitle.value = "";
    inputTaskTag.value = "select";
    appStartTimeValue.value = "";
    appEndTimeValue.value = "";
    checkbox.checked = false;

    sectionCta.style.display = "none";
    checkBtn.style.background = "#9b9b9b"
    alarmBox.style.display = "none";
    sectionCta.style.top = "8rem"
  };
});


closeTaskWindow.addEventListener("click", () => {
  taskWindow.style.display = "none";
});

showAllactivities.addEventListener("click", () => {
  showAllTasksSection.style.display = "block";
  showTasks();
});

// task-num box
const taskNum = document.createElement("div");
taskNum.classList.add("tasks-num");
showAllTasksSection.appendChild(taskNum);

closeShowTask.addEventListener("click", () => {
  showAllTasksSection.style.display = "none";
  filterTask.value = 'All';
  document.querySelectorAll("td").forEach((e) => {
    e.remove();
  })
  tasks.forEach((task) => {
    createRow(task);
  });
})

filterTask.addEventListener("change", () => {
  document.querySelectorAll("td").forEach((e) => {
    e.remove();
  })

  if (filterTask.value == "All") {
    tasks.forEach((task) => {
      createRow(task);
    });
  }
  else {
    if (tasks.filter((value) => value.tag === filterTask.value).length > 0) {
      tasks.filter((value) => value.tag === filterTask.value).forEach((task) => {
        createRow(task);
      });
    }
    else {
      popup.style.display = "block";
      popupHeading.textContent = "";
      popupParagraph.textContent = "There is no tasks in this category";
      tasks.forEach((task) => {
        createRow(task);
      });
      filterTask.value = 'All';
    };
  };
});

popupBtn.addEventListener("click", () => {
  popup.style.display = "none";
})

// envelope animation
window.onload = function(){
  var tl = new TimelineLite({delay: 1}),
    firstBg = document.querySelectorAll('.text__first-bg'),
    secBg = document.querySelectorAll('.text__second-bg'),
    word  = document.querySelectorAll('.text__word');
  
  tl
    .to(firstBg, 0.2, {scaleX:1})
    .to(secBg, 0.2, {scaleX:1})
    .to(word, 0.1, {opacity:1}, "-=0.1")  
    .to(firstBg, 0.2, {scaleX:0})
    .to(secBg, 0.2, {scaleX:0});
  
  document.querySelector('.restart').onclick = function() {tl.restart()};
}

