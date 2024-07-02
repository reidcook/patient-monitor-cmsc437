export const drawToCapno = (ctx4) => {
    const amplitude = 80; 
    const frequency = 1.209; 
    const duration = 600; 
    const sampleRate = 1.2; 
    const width = 900;
    const height = 270;
    function drawCAPNO() {
        ctx4.beginPath();
        let prevX = 0;
        let prevY = height/1.2;
        let prevSlope = 0;
        let currentTime = 100;
        let waveformCount = 0;
        var x = (currentTime / sampleRate) * width / duration;
        currentTime += 2;

        function drawSegment4() {
          if (currentTime >= duration) {
            // get the next frame
            requestAnimationFrame(drawCAPNO);
            return;
          }
      
          x = (currentTime / sampleRate) * width / duration;

          // determine the y-coordinate 
          let y;
     
          y = height / 1.2 - Math.max(0,amplitude * 1.5 * 
            (Math.sin(2 * Math.PI * frequency * (currentTime / sampleRate) + Math.PI / 3.7) - 
            0.27 * Math.sin(4 * Math.PI * frequency * (currentTime / sampleRate) + Math.PI / 8.5)));

           // try to make the top a little flat 
            if (waveformCount > 0 && waveformCount < 3) {
                y = height / 1.2 + amplitude * 0.8 * 0.005;
                waveformCount = -1;
            }
          // calculate the slope
          const slope = (y - prevY) / (x - prevX);
      
          // determine the cp for the bezier curve
          const cp1x = prevX + (x - prevX) / 3;
          const cp1y = prevY + (x - prevX) / 50 * prevSlope;
          const cp2x = x - (x - prevX) / 3;
          const cp2y = y - (x - prevX) / 50 * slope;
      
          ctx4.clearRect(x, 8, 10, 270);
          ctx4.lineWidth = 2;
          ctx4.strokeStyle = "yellow";
          ctx4.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          currentTime++;
          
          ctx4.stroke();
      
          prevX = x;
          prevY = y;
          prevSlope = slope;
          waveformCount++;
          requestAnimationFrame(drawSegment4);
        }
      
        drawSegment4();
    }
    
    drawCAPNO();
}