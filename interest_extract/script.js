var canvas = document.getElementById('canvas');
console.log('model loaded');
document.getElementById('inp').onchange = function(e) {
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};

function draw() {
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
}

function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}

const clearButton = document.getElementById("clear");
clearButton.onclick = () => {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


const img = document.getElementById("canvas");
const runButton = document.getElementById('run');
runButton.onclick = async() => {
    const model = await cocoSsd.load();
    const result = await model.detect(img);
    console.log(result)
    var txt = document.getElementById("txt_input").value;
    txt = txt.toLowerCase();
    if (txt == "") {
        alert("Enter class");
    } else {
        var classInfo = result.filter(i => txt.includes(i.class));
        console.log(classInfo);
        if (classInfo.length == 0) {
            document.getElementById("result").innerHTML = "Class not found in image";
        }
        var ctx = canvas.getContext("2d");

        for (var i = 0; i < classInfo.length; i++) {
            x = classInfo[i].bbox[0];
            y = classInfo[i].bbox[1];
            width = classInfo[i].bbox[2];
            height = classInfo[i].bbox[3];

            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.strokeStyle = "#66FF00";
            ctx.stroke();
        }
    }
}