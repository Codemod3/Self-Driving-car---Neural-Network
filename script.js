const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
carCanvas.height = window.innerHeight;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
networkCanvas.height = window.innerHeight;


const carCtx = carCanvas.getContext("2d"); // we  are giving access to ctx of all the 2d drawing tools

const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2,carCanvas.width*0.9)
const N = 500;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        bestCar.brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );     
    }
} 
const traffic = [
    new Car(road.getLanecenter(1), -100, 30, 50, "DUMMY", 2), 
    new Car(road.getLanecenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLanecenter(2), -300, 30, 50, "DUMMY", 2)
];


animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(cars[0].brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}
function generateCars(N){
    const cars = [];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLanecenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}


function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }

    //this is the function to get the best car
    //fittness function, there its the max distance wont work for curved roads
    const bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    //add a camera on the car for the roads to move
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7)
    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){ 
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }  
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}


