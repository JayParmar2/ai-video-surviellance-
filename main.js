Status = "";
object=[];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();

}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;

    }
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
        objectDetector.detect(video,gotresults);

        for (i = 0; i < object.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "status : objectdetected";


            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);

            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }
        }
    }


}





function play_video() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status : object detected";
    object_name = document.getElementById("object_name").value;



}

function modelloaded() {
    console.log("modelloaded");
    Status = true;

}