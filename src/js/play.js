const boxs = document.querySelectorAll("#board > div");
const buttonStart = document.getElementById("start");

const difficulties = [
    {
        value: 1,
        text: "Facile",
        classValue: "badge-success"
    },
    {
        value: 2,
        text: "Moyen",
        classValue: "badge-warning"
    },
    {
        value: 3,
        text: "Difficile",
        classValue: "badge-danger"
    }
];
let difficulty = 1;
let started = false;
let end = false;
let point = 0;
let time = 30;
let interval = 1000;
let level = 1;
let sparkyDisplayTimeOut;

boxs.forEach((box)=>{
    box.addEventListener("click", (event)=>{
        event.preventDefault();
        if(time <= 0){
            return;
        }
        if(started === false){
            start();
        }
        if(box.dataset.sparky === "true"){
            addPoint();
            interval -= 5;
            document.getElementById("vitesse").textContent = interval;
        }
        showAndHideSparkys(box.dataset.index);
    });
});


//Changer la difficulté
function changeDifficulty(){
    difficulty += 1;
    if(difficulty > 3){
        difficulty = 1;
    }
    const label = document.querySelector("[data-difficulty]");
    label.textContent = difficulties[difficulty - 1].text;
    label.classList.remove("badge-success", "badge-warning", "badge-danger");
    label.classList.add(difficulties[difficulty - 1].classValue);
    switch (difficulty){
        case 1:
            interval = 1000;
            break;
        case 2:
            interval = 800;
            break;
        case 3:
            interval = 500;
            break;
    }
    document.getElementById("vitesse").textContent = interval;
}
document.querySelector("[data-difficulty]").addEventListener("click", changeDifficulty);

//Demarrer la partie
buttonStart.addEventListener("click", function (){
   start();
   showAndHideSparkys();
   document.getElementById("level").textContent = level;
});

//Niveau
function nextLevel(){
    level += 1;
    document.getElementById("level").textContent = level;
}
document.getElementById("levelNext").addEventListener("click", nextLevel);
//Timer
function start(){
    started = true;
    time = 30;
    point = 0;
    end = false;
    switch (difficulty){
        case 1:
            interval = 1000;
            break;
        case 2:
            interval = 800;
            break;
        case 3:
            interval = 500;
            break;
    }
    document.getElementById("vitesse").textContent = interval;
    document.getElementById("time").textContent = time;
    document.getElementById("point").textContent = point;
    setInterval(removeTime, 1000);
}
function removeTime(){
    if(time <= 0){
        sparkyMaskAll();
        if(end === false){
            if(point >= (10 * level)){
                const modal = new Modal("modal-success");
                modal.setTitle("Bravo !");
                modal.setMessage("Vous avez terminé avec " + point + " points");
                modal.show();
            } else {
                const modal = new Modal("modal-error");
                modal.setTitle("Mince !");
                modal.setMessage("Le temps est écoulé !");
                modal.show();
            }
            end = true;
            started = false;
        }
    } else {
        time -= 1;
        document.getElementById("time").textContent = time;
    }
}
//Points
function addPoint(){
    point += 1;
    document.getElementById("point").textContent = point;
}
//Sparky Robot
function sparkyMaskAll(){
    boxs.forEach((box)=>{
        box.dataset.sparky = "false";
    });
}
function showAndHideSparkys(ignore = false){
    clearTimeout(sparkyDisplayTimeOut);
    sparkyMaskAll();
    if(end == true || time <= 0){
        return;
    }
    let random = 0;
    if(ignore === false){
        random = Math.floor(Math.random() * boxs.length);
    } else {
        do {
            random = Math.floor(Math.random() * boxs.length);
        } while(random === ignore);
    }
    boxs[random].dataset.sparky = "true";
    sparkyDisplayTimeOut = setTimeout(showAndHideSparkys, interval);
}