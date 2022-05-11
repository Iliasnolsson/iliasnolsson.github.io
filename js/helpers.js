
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function distance_linear({fromX, fromY, toX, toY}) {
    let y = toX - fromX;
    let x = toY - fromY;
    return Math.sqrt(x * x + y * y);
}