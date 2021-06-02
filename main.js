song = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("Harry Potter - Main Theme.mp3")
    song1 = loadSound("Harry Potter - Metal Version.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + " rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1status = song.isPlaying()
    song2status = song1.isPlaying()

    fill("FF0000");
    stroke("FF0000");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if (song2status == false) {
            song1.play()
            document.getElementById("song").innerHTML = "Playing = Harry Potter - Metal Version.mp3";
        }

    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2status == false) {
            song.play()
            document.getElementById("song").innerHTML = "Playing = Harry Potter - Main Theme.mp3";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}