let timer;
let new_date = new Date();

const countUP = () => {
    new_date.setSeconds(new_date.getSeconds() + 1);
    document.getElementById("time").textContent = new_date.toLocaleTimeString();
}

window.onload = () => {
    var port = chrome.runtime.connect({name: "conn"});
    port.postMessage({type: "opened"});

    port.onMessage.addListener((msg) => {
        if(msg.type === "opened"){
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("HEAD", msg.url, false);
            xmlhttp.setRequestHeader("Content-Type", "text/html");
            xmlhttp.send();

            const date = xmlhttp.getResponseHeader("date");
            new_date = new Date(date);

            document.getElementById("host").textContent = msg.host+"의 서버시간";
            document.getElementById("date").textContent = new_date.toLocaleDateString();
            document.getElementById("time").textContent = new_date.toLocaleTimeString();

            timer = setInterval(countUP, 1000);
        }
    });
};

window.addEventListener("unload", () => {
    clearInterval(timer);
});