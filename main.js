song = "";
song1 = "";

function preload() {
    song = loadSound("Harry Potter - Main Theme.mp3")
    song1 = loadSound("Harry Potter - Metal Version.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function play() {
    song.play();
}