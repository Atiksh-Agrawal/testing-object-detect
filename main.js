status = "";

var objects = [];



function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function draw(){
    image(video ,0,0,380,380);

if(status != ""){
  for(i=0 ; i<objects.length ; i++){
    r = random(255);
    g = random(255);
    b = random(255);
    
    document.getElementById("status").innerHTML = "Status : Object detected !" ;
    document.getElementById("num_of_objects").innerHTML = "Number of objects detected:" + objects.length ;
    percent = floor(objects[i].confidence * 100);
    fill(r,g,b);
    stroke(r,g,b);
    text(objects[i].label  +" "+percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);
  }
}
}

function modelLoaded(){
    console.log("CocoSsd is initialized");
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
   if(error){
      console.error(error);
}
   else{
       console.log(results);
       objects = results;
}
}