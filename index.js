const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let size = 200; //Side of a triangle
const msPerFrame = 42; //24 FPS
const animationLength = 2; //In seconds
let curveOffset = 0;
let t = 0;
const tTotal = msPerFrame * animationLength;
let rev = false;

function setup() {
    setInterval(() => {
        if(!rev) {
            t++;
        } else {
            t--;
        }

        if(t == 0) {
            rev = false;
        } else if(t == tTotal) {
            rev = true;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw();
    }, msPerFrame);
}

function draw() {
    ctx.strokeStyle = "black";

    const angle = Math.PI/3;
    const h = size * Math.sqrt(3) / 2;
    
    let counter = 0;
    for (let i = -size; i < canvas.width; i += size) {
        for(let j = -size; j < canvas.height; j += h) {
            counter ++;

            //Calculating the coordinates
            let x1 = i;
            if(counter % 2 == 0) {
                x1 += size/2;
            }
            let y1 = j;

            let x2 = x1 + size;
            let y2 = y1;

            let x3 = (Math.cos(angle) * (x2 - x1) - Math.sin(angle) * (y2 - y1)) + x1;
            let y3 = (Math.sin(angle) * (x2 - x1) + Math.cos(angle) * (y2 - y1)) + y1;

            let x4 = x3 + size
            let y4 = y3;
            
            //Calculating curve control points
            let cx1 = ((t - 0) / (tTotal - 0)) * (x3 - x1) + x1 + curveOffset;
            let cy1 = ((t - 0) / (tTotal - 0)) * (y3 - y1) + y1 - curveOffset;

            let cx2 = ((t - 0) / (tTotal - 0)) * (x1 - x3) + x3 + curveOffset;
            let cy2 = ((t - 0) / (tTotal - 0)) * (y1 - y3) + y3 - curveOffset;

            let cx3 = ((t - 0) / (tTotal - 0)) * (x4 - x2) + x2 - curveOffset;
            let cy3 = ((t - 0) / (tTotal - 0)) * (y4 - y2) + y2 + curveOffset;

            let cx4 = ((t - 0) / (tTotal - 0)) * (x2 - x4) + x4 - curveOffset;
            let cy4 = ((t - 0) / (tTotal - 0)) * (y2 - y4) + y4 + curveOffset;

            //Drawing the two triangles of the pattern
            var grd1 = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 300, canvas.width/2, canvas.height/2, 500);
            grd1.addColorStop(1, "#ff8c00");
            grd1.addColorStop(0, "#ff2f2f");
            ctx.fillStyle = "#e2d810";
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.quadraticCurveTo(cx1,cy1,x2,y2);
            ctx.quadraticCurveTo(cx2,cy2,x3,y3);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();

            var grd2 = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500);
            grd2.addColorStop(1, "#00fa96");
            grd2.addColorStop(0, "#6060ff");
            ctx.fillStyle = "#d9138a";
            ctx.beginPath();
            ctx.moveTo(x2,y2);
            ctx.quadraticCurveTo(cx3,cy3,x3,y3);
            ctx.quadraticCurveTo(cx4,cy4,x4,y4);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();
        }
    }
}

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
});

window.addEventListener("keydown", ({key}) => {
    if(key == "ArrowUp") {
        size += 0.7;
    } else if (key == "ArrowDown") {
        size -= 0.7;
    } else if (key == "ArrowLeft") {
        curveOffset -= 2.5;
    } else if (key == "ArrowRight") {
        curveOffset += 2.5;
    }
});
