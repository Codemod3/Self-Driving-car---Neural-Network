const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
carCanvas.height = window.innerHeight;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
networkCanvas.height = window.innerHeight;


const carCtx = carCanvas.getContext("2d"); // we  are giving access to ctx of all the 2d drawing tools

const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2,carCanvas.width*0.9)
const car = new Car(road.getLanecenter(1), 100, 30, 50, "AI");
const traffic = [
    new Car(road.getLanecenter(1), -300, 30, 50, "DUMMY", 2), 
];

car.draw(carCtx);

animate();

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    //add a camera on the car for the roads to move
    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.7)
    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){ 
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue");  

    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,car.brain);
    requestAnimationFrame(animate);
}


