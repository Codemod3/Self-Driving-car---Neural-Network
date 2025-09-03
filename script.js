const canvas = document.getElementById("mycanvas");

canvas.width=200

const ctx = canvas.getContext("2d"); // we  are giving access to ctx of all the 2d drawing tools
const road = new Road(canvas.width/2,canvas.width*0.9)
const car = new Car(road.getLanecenter(1), 100, 30, 50, "AI");
const traffic = [
    new Car(road.getLanecenter(1), -300, 30, 50, "DUMMY", 2), 
];

car.draw(ctx);

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    canvas.height = window.innerHeight;

    //add a camera on the car for the roads to move
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7)
    
    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){ 
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue");  
    requestAnimationFrame(animate);
}

 
