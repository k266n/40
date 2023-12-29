song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWrist = "";
score_left_wrist = 0;
score_right_wrist = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is Initalized');
}
function draw(){
    image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("#FF0000");
song1_status = song1.isPlaying();
song2_status = song2.isPlaying();
if(score_right_wrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song2.stop();
    if(song1_status == false){
        document.getElementById("song").innerHTML = "playing song";
        song1.play();
    }
}
if(score_left_wrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if(song2_status == false){
        document.getElementById("song").innerHTML = "playing song";
        song2.play();
    }
}
}

function pause_music(){
    song.pause();
}
function stop_music(){
    song.stop();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log(" score right wrist = "+ score_right_wrist +"score ledt wrist "+ score_left_wrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = "+ leftWristX+" leftWristY = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = "+ rightWristX+" rightWristY = "+rightWristY);
    }
}