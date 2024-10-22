import "./styles.scss";

const main = document.querySelector(".main-body");
const buttonOk = document.querySelector(".button-ok");
const windowsResult = document.createElement("div");
windowsResult.classList.add("table");
main.append(windowsResult);

function getFirstDateOfCurrentMonth() {
  const now = new Date(); // Получаем текущую дату
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 2)
    .toISOString()
    .slice(0, 10); // Создаем новую дату, указывая год, месяц и день
  return firstDate; // Возвращаем первое число месяца
}

function getLastDateOfCurrentMonth() {
  const now = new Date(); // Получаем текущую дату
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Получаем первую дату следующего месяца
  const lastDate = new Date(nextMonth - 1).toISOString().slice(0, 10); // Вычитаем один миллисекунд (1 день) от первой даты следующего месяца
  return lastDate; // Возвращаем последнее число текущего месяца
}

const datOt = document.querySelector(".ot-date");
const datDo = document.querySelector(".do-date");
datOt.value = getFirstDateOfCurrentMonth();
datDo.value = getLastDateOfCurrentMonth();

function rand(min, max, num) {
  try {
    let sum =
      Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
    if (sum >= min && sum <= max && sum % num == 0) {
      return sum;
    } else {
      return rand(min, max, num);
    }
  } catch (err) {
    windowsResult.innerHTML = "Ошибка в кратности";
  }
}

/*function getRandomDateExcludingWeekends(startDate, endDate) {
  const getRandomDate = (start, end) => {
    const randomTimestamp =
      Math.floor(Math.random() * (end - start + 1)) + start;
    return new Date(randomTimestamp);
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Воскресенье (0) или Суббота (6)
  };

  let randomDate;
  do {
    randomDate = getRandomDate(startDate.getTime(), endDate.getTime());
  } while (isWeekend(randomDate));

  return randomDate.toLocaleDateString("de-DE");
}*/
/*function getRandomDateExcludingWeekends(startDate, endDate, existingDates) {
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Воскресенье (0) или Суббота (6)
  };

  const generateRandomDate = (start, end) => {
    const randomTimestamp =
      Math.floor(Math.random() * (end - start + 1)) + start;
    return new Date(randomTimestamp);
  };

  if (existingDates.length >= (endDate - startDate) / (1000 * 60 * 60 * 24)) {
    throw new Error("Все доступные даты уже использованы.");
    return "Все доступные даты уже использованы.";
  }

  let randomDate;
  do {
    randomDate = generateRandomDate(startDate.getTime(), endDate.getTime());
  } while (
    isWeekend(randomDate) ||
    existingDates.includes(randomDate.toDateString())
  );

  existingDates.push(randomDate.toDateString()); // Сохраняем дату в массив существующих дат
  // Сохраняем дату в массив

  return randomDate; //.toLocaleDateString("de-DE")
}*/
function getRandomDateExcludingWeekends(startDate, endDate, existingDates) {
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Воскресенье (0) или Суббота (6)
  };

  const generateRandomDate = (start, end) => {
    const randomTimestamp =
      Math.floor(Math.random() * (end - start + 1)) + start;
    return new Date(randomTimestamp);
  };

  // Проверка доступных рабочих дней в диапазоне
  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const availableDates = [];

  for (let i = 0; i <= totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    if (
      !isWeekend(currentDate) &&
      !existingDates.includes(currentDate.toDateString())
    ) {
      availableDates.push(currentDate);
    }
  }

  // Если нет доступных рабочих дней, выдаем ошибку
  if (availableDates.length === 0) {
    throw new Error("Нет доступных рабочих дней.");
  }

  // Генерируем случайную дату из доступных
  const randomIndex = Math.floor(Math.random() * availableDates.length);
  const randomDate = availableDates[randomIndex];

  // Сохраняем сгенерированную дату в массив существующих дат
  existingDates.push(randomDate.toDateString());

  return randomDate;
}

function createTable() {
  const sum = document.querySelector(".sum").value;
  const sumOt = document.querySelector(".ot-sum").value;
  const kratnost = document.querySelector(".katn").value;
  const sumDo = document.querySelector(".do-sum").value;
  const dateOt = document.querySelector(".ot-date").value;
  const dateDo = document.querySelector(".do-date").value;
  const coli4 = document.querySelector(".coli4").value;
  const clean = document.querySelectorAll(".block");
  clean.forEach((userItem) => {
    //console.log(userItem);
    userItem.remove();
  });
  windowsResult.innerHTML = "Итог:";
  let sumIndex = sum;
  const table = document.createElement("table");
  table.classList.add("block");
  windowsResult.append(table);
  const thead = document.createElement("thead");
  table.append(thead);
  const tr = document.createElement("tr");
  thead.append(tr);
  const th1 = document.createElement("th");
  thead.append(th1);
  th1.innerHTML = `Дата`;
  const th2 = document.createElement("th");
  thead.append(th2);
  th2.innerHTML = `Сумма`;
  const tbody = document.createElement("tbody");
  table.append(tbody);
  let existingDates = [];
  let listDates = [];
  const start = new Date(dateOt);
  const end = new Date(dateDo);
  for (let i = 0; i < coli4 && sumIndex > 0; i++) {
    try {
      const randomDate = getRandomDateExcludingWeekends(
        start,
        end,
        existingDates
      );
      listDates.push(randomDate);
    } catch (error) {
      console.error(error.message);
      listDates.push(error.message);
    }
  }
  listDates.sort((a, b) => new Date(a) - new Date(b));
  for (let i = 0; i < coli4 && sumIndex > 0; i++) {
    const tr = document.createElement("tr");
    tbody.append(tr);

    if (i + 1 == coli4) {
      const td1 = document.createElement("td");
      tr.append(td1);
      const td2 = document.createElement("td");
      tr.append(td2);
      if (listDates[i] == "Нет доступных рабочих дней.") {
        td1.innerHTML = listDates[i];
      } else {
        td1.innerHTML = new Date(listDates[i]).toLocaleDateString("de-DE");
      }
      td2.innerHTML += ` ${sumIndex}`;
      break;
    }

    let number = rand(sumOt, sumDo, kratnost);
    sumIndex = sumIndex - number;
    if (sumIndex >= 0) {
      const td1 = document.createElement("td");
      tr.append(td1);
      const td2 = document.createElement("td");
      tr.append(td2);

      if (listDates[i] == "Нет доступных рабочих дней.") {
        td1.innerHTML = listDates[i];
      } else {
        td1.innerHTML = new Date(listDates[i]).toLocaleDateString("de-DE");
      }
      td2.innerHTML += ` ${number}`;
    }
  }
}

buttonOk.addEventListener("click", createTable);
