export const drawToPleth = (ctx3) => {
    const amplitude = 80; 
    const frequency = 1.2; 
    const duration = 600; 
    const sampleRate = 1.21; 
    const width = 900;
    const height = 270;
    function drawPLETH() {
        ctx3.beginPath();
        let prevX = 0;
        let prevY = height/2;
        let prevSlope = 0;
        let currentTime = 100;
        var x = (currentTime / sampleRate) * width / duration;
        currentTime += 2;

        function drawSegment3() {
          if (currentTime >= duration) {
            // get the next frame
            requestAnimationFrame(drawPLETH);
            return;
          }
      
          x = (currentTime / sampleRate) * width / duration;

          // determine the y-coordinate 
          let y;
     
          y = height / 2 + amplitude * 0.9 * 
            (Math.sin(2 * Math.PI * frequency * (currentTime / sampleRate) + Math.PI / 2) - 
            0.5 * Math.sin(4 * Math.PI * frequency * (currentTime / sampleRate)));
          
          // calculate the slope
          const slope = (y - prevY) / (x - prevX);
      
          // determine the cp for the bezier curve
          const cp1x = prevX + (x - prevX) / 2;
          const cp1y = prevY + (x - prevX) / 10 * prevSlope;
          const cp2x = x - (x - prevX) / 2;
          const cp2y = y - (x - prevX) / 10 * slope;
      
          ctx3.clearRect(x, 8, 2, 270);
          ctx3.lineWidth = 2;
          ctx3.strokeStyle = "skyblue";
          ctx3.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          currentTime++;
          
          ctx3.stroke();
      
          prevX = x;
          prevY = y;
          prevSlope = slope;
          requestAnimationFrame(drawSegment3);
        }
      
        drawSegment3();
    }
    
    drawPLETH();
}