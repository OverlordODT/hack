<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Overlord Osint</title>
<style>
    body {
        font-family: 'Roboto Mono', Monaco, Consolas, 'Lucida Console', monospace;
        /* Изменен шрифт на моноширинный для "хакерского" вида */
        background: linear-gradient(to right, #800080, #000000);
        color: #fff;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        position: relative; /* Добавлено для позиционирования красного экрана */
    }
    h1 {
        font-size: 36px;
        margin-top: 20px;
    }
    #searchResult {
        margin-top: 20px;
        display: none;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    input[type=text] {
        width: calc(100% - 80px);
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }
    #countdown {
        margin-top: 20px;
        display: none;
    }
    p {
        margin-top: 20px;
        text-align: center;
    }
    #infoContainer {
        border: 2px solid #000;
        padding: 20px;
        margin-top: 20px;
        border-radius: 10px;
        background: linear-gradient(to right, #800080, #000000);
        width: 80%;
    }
    .registerButton, .loginButton {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        font-size: 16px;
        width: 200px;
    }
    .loginButton {
        background: #fff;
        color: #800080;
    }
    .registerButton {
        background: linear-gradient(to right, #800080, #000000);
        color: #fff;
    }
    /* Стили для красного экрана */
    #redScreen {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
    }
    #redScreen p {
        font-size: 24px;
        font-weight: bold;
    }
</style>
</head>
<body>

<a href="https://ibb.co/ZN41hHK"><img src="https://i.ibb.co/yVvB8h5/photo1713007406-1.jpg" alt="Overlord Osint Image" style="width: 100px; margin-top: 20px;"></a>
<h1>Overlord Osint</h1>

<h2>Поиск в таблице</h2>

<input type="text" id="myInput" oninput="checkInput()" placeholder="Введите текст для поиска...">
<button onclick="startSearch()" style="background: linear-gradient(to right, #800080, #000000); color: #fff; padding: 10px 20px; border: none; border-radius: 5px;">Начать поиск</button>

<div id="searching" style="display: none;">
    <p>Ищу...</p>
</div>

<div id="searchResult">
    <table id="resultTable">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody id="resultBody">
      </tbody>
    </table>
</div>

<div id="countdown">
    <p>Ожидайте, пока не произойдет сброс таймера:</p>
    <button id="countdownButton" disabled>0:00</button>
</div>

<p id="notFound" style="display: none; color: red;">Информация не найдена</p>

<div id="infoContainer">
    <p>Наш сервис специализируется на поиске информации по открытым источникам.</p>
    <p>Попробуйте:</p>
    <p>???Telegram Username<br>(@jbaxs)</p>
    <p>??Номер телефона<br>(+7 980 *** ****)</p>
    <p>??Фамилия имя<br>(Дмитрий Феодосов)</p>
    <p>??Почта<br>(*****@gmail.com)</p>
    <p>??IP<br>(192.168.10.57)</p>
</div>

<!-- Добавлен красный экран -->
<div id="redScreen">
    <p>Запросы закончились! Зарегистрируйтесь, чтобы продолжить.</p>
</div>

<!-- Добавлены кнопки "Войти" и "Зарегистрироваться" -->
<button class="loginButton">Войти</button>
<button class="registerButton">Зарегистрироваться</button>

<script>
var lastSearchTime = localStorage.getItem('lastSearchTime') ? parseInt(localStorage.getItem('lastSearchTime')) : 0;
var userSearchCount = localStorage.getItem('userSearchCount') ? parseInt(localStorage.getItem('userSearchCount')) : 0;
var remainingRequests = 10 - userSearchCount; // Изначально оставшихся запросов 10
var countdownInterval;

function startSearch() {
    if (remainingRequests <= 0) {
        document.getElementById("redScreen").style.display = "flex"; // Показываем красный экран
        return;
    }

    var currentTime = new Date().getTime();
    if (currentTime - lastSearchTime < 10000) { // 10 секунд в миллисекундах
        alert("Пожалуйста, подождите 10 секунд перед выполнением нового запроса.");
        return;
    }

    document.getElementById("myInput").disabled = true;
    document.querySelector("button").disabled = true;
    document.getElementById("searching").style.display = "block";
    
    setTimeout(function() {
        searchTable();
        document.getElementById("searching").style.display = "none";
        document.getElementById("myInput").disabled = false;
        document.querySelector("button").disabled = false;
        startCountdown();
    }, 1000); // Задержка перед началом поиска (1 секунда)
}

function checkInput() {
    var inputValue = document.getElementById("myInput").value.trim();
    if (inputValue === "" || inputValue.length === 1) {
        document.getElementById("searchResult").style.display = "none";
        document.getElementById("notFound").style.display = "none";
    }
}

function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase().trim(); // Убираем пробелы из начала и конца строки
    if (filter === "" || filter.length === 1) return; // Если введена пустая строка или один символ, выходим из функции

    table = document.getElementById("resultBody");
    table.innerHTML = ""; // Очистка предыдущих результатов

    var originalTable = document.getElementById("myTable");
    tr = originalTable.getElementsByTagName("tr");

    var resultsFound = false;
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    var cloneRow = tr[i].cloneNode(true);
                    table.appendChild(cloneRow);
                    resultsFound = true;
                    break;
                }
            }
        }
    }
    
    if (resultsFound) {
        document.getElementById("searchResult").style.display = "block";
        document.getElementById("notFound").style.display = "none";
        remainingRequests--; // Уменьшаем количество оставшихся запросов
    } else {
        document.getElementById("searchResult").style.display = "none";
        document.getElementById("notFound").style.display = "block";
    }
    
    lastSearchTime = new Date().getTime();
    localStorage.setItem('lastSearchTime', lastSearchTime.toString());
    localStorage.setItem('userSearchCount', userSearchCount.toString());
}

function startCountdown() {
    var countdownButton = document.getElementById("countdownButton");
    var count = 10; // 10 секунд
    countdownButton.disabled = true;
    countdownButton.textContent = formatTime(count);
    document.getElementById("countdown").style.display = "block";

    countdownInterval = setInterval(function() {
        count--;
        countdownButton.textContent = formatTime(count);
        if (count <= 0) {
            clearInterval(countdownInterval);
            countdownButton.disabled = false;
            countdownButton.textContent = "0:00";
            document.getElementById("countdown").style.display = "none";
        }
    }, 1000);
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}
</script>

<!-- Эта таблица скрыта и не отображается пользователю -->
<table id="myTable" style="display: none;">
  <thead>
    <tr>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Иван</td>
      <td>Иванов</td>
      <td>ivan@example.com</td>
    </tr>
    <tr>
      <td>Петр</td>
      <td>Петров</td>
      <td>peter@example.com</td>
    </tr>
    <tr>
      <td>Анна</td>
      <td>Сидорова</td>
      <td>anna@example.com</td>
    </tr>
  </tbody>
</table>

</body>
</html>
