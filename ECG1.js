export const drawToECG1 = (ctx) => {
    const amplitude = 80; 
    const frequency = 1.252; 
    const duration = 600; 
    const sampleRate = 1.22; 
    const width = 900;
    const height = 270;

    function drawECG() {
        ctx.beginPath();
        let prevX = 0;
        let prevY = height / 1.2;
        let prevSlope = 0;
        let currentTime = 60;
        let pulseCount = 0;
        var x = (currentTime / sampleRate) * width / duration;
        ctx.lineTo(x,height / 1.2)
        currentTime += 2;

        function drawSegment() {
          if (currentTime >= duration) {
            // get the next frame
            requestAnimationFrame(drawECG);
            return;
          }
      
          x = (currentTime / sampleRate) * width / duration;

          // determine the y-coordinate 
          let y;
          let z = false;
          if (pulseCount == 0) { // small pulse
            y = height / 1.2 - Math.max(0, amplitude * 0.2 * Math.sin(2 * Math.PI * frequency * (currentTime / sampleRate)));
            if(y == height / 1.2){
                pulseCount = 1;
            }
          } else if (pulseCount == 1) { // second small pulse
            y = height / 1.2 - Math.max(0, amplitude * 0.1 * Math.sin(2 * Math.PI * frequency * (currentTime / sampleRate)));
            if(y == height / 1.2){
                pulseCount = 2;
            }
          } else { // heart beat pulse
            y = height / 1.2 - Math.max(0, amplitude * 1.8 * Math.sin(2 * Math.PI * frequency * (currentTime / sampleRate)));
            if(y == height / 1.2){
                z = true;
                pulseCount = 0;
            }
          }
      
          // calculate the slope
          const slope = (y - prevY) / (x - prevX);
      
          // determine the cp for the bezier curve
          const cp1x = prevX + (x - prevX) / 3;
          const cp1y = prevY + (x - prevX) / 3 * prevSlope;
          const cp2x = x - (x - prevX) / 3;
          const cp2y = y - (x - prevX) / 3 * slope;
      
          ctx.clearRect(x, 8, 2, 270);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "green";
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          currentTime++;
          if(z){
            // make the base trace between pulses
            currentTime += 2;
            x = (currentTime / sampleRate) * width / duration;
            ctx.lineTo(x,height / 1.2)
            currentTime++;
          }
          
          ctx.stroke();
      
          prevX = x;
          prevY = y;
          prevSlope = slope;
          
          
          requestAnimationFrame(drawSegment);
        }
      
        drawSegment();
    }
    
    drawECG();
}

