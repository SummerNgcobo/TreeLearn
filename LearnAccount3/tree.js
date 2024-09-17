"use strict";
var W,H,R,i=0,L;
var points = [], points2 = [];

function sin(n){
    return Math.sin(n);
}

function cos(n){
    return Math.cos(n);
}

window.onload = function(){
    var cnv = document.getElementById("cnv");
    var ctx = cnv.getContext("2d");
    function init(){
        W = window.innerWidth;
        H = window.innerHeight;
        cnv.width = W;
        cnv.height = H;
        L = W<H?W:H;
        R = L/10;
       // H *= 0.8;
    }
    init();
    ctx.translate(W/2,(L/2-H)/2);
    
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(0,H + (H-L/2)/2,(H-L/2)/2,0,Math.PI*2);
    ctx.fill();
    
    //window.onresize = init;
    
    function Point(x,y){
        this.x = x;
        this.y = y;
        this.moveTo = function(){
            ctx.moveTo(this.x,this.y);
        }
        this.lineTo = function(){
            ctx.lineTo(this.x,this.y);
        }
        
    }
    
    let x = new Point(0,H);
    points.push(x);
    
    
    function animate(){
        ctx.strokeStyle = "#352315";
        ctx.lineWidth = ((7-i)/7)*10;
        let a = Math.PI/(2**i + 1);
        for(let point of points){
            ctx.beginPath();
            point.moveTo();
            let A = new Point(R*cos(a),H-R*sin(a));
            A.lineTo();
            points2.push(A);
            a += Math.PI/(2**i + 1);
            if(!(a>=Math.PI)){
                point.moveTo();
                let B = new Point(R*cos(a),H-R*sin(a));
                B.lineTo();
                points2.push(B);
                //ctx.stroke();
                a += Math.PI/(2**i + 1);
            }
            ctx.stroke();
    
            // Add petals at specific points
            if(i > 5 && points.indexOf(point) % 5 === 0) {
                addPetals(A.x, A.y);
            }
        }
        R += L/18;
        i++;
        points = points2;
        points2 = [];
    
        if(i<8){
            setTimeout(animate,3000);
        }
        if(i>5){
            for(let center of points){
                ctx.beginPath();
                ctx.fillStyle = "darkgreen";
                ctx.arc(center.x,center.y,2+(L/50)*Math.random(),0,Math.PI*2);
                ctx.fill();
            }
        }
    }
    
    // Function to add petals at specific points
    function addPetals(x, y) {
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2); // Center petal
        ctx.fill();
    
        // Add two side petals
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.arc(0, -10, 3, 0, Math.PI * 2); // Top-left petal
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 10, 3, 0, Math.PI * 2); // Bottom-left petal
        ctx.fill();
        ctx.restore();
    
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 4);
        ctx.beginPath();
        ctx.arc(0, -10, 3, 0, Math.PI * 2); // Top-right petal
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 10, 3, 0, Math.PI * 2); // Bottom-right petal
        ctx.fill();
        ctx.restore();
    }
       
    
    animate();
    

}