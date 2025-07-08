type Point = {
  x: number;
  y: number;
};

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function normalizeData(
  data: number[],
  width: number,
  height: number,
  xoffset: number,
  yoffset: number
) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points: number[][] = [];

  for (let i = 0; i < data.length; i++) {
    const x = mapRange(i, 0, data.length - 1, xoffset, width - xoffset);
    const y = height - mapRange(data[i], min, max, yoffset, height - yoffset);
    points.push([x, y]);
  }
  return points;
}

function getControlPoints(data: number[][]) {
  const curvature = 0.15;
  const points: Point[][] = [];
  for (let i = 0; i < data.length - 2; i++) {
    const dx = data[i][0] - data[i + 2][0];
    const dy = data[i][1] - data[i + 2][1];
    const x1 = data[i + 1][0] - dx * curvature;
    const y1 = data[i + 1][1] - dy * curvature;
    const x2 = data[i + 1][0] + dx * curvature;
    const y2 = data[i + 1][1] + dy * curvature;
    const point1 = {
      x: x1,
      y: y1,
    };
    const point2 = {
      x: x2,
      y: y2,
    };

    points.push([point1, point2]);
  }
  return points;
}

function curveToString(data: number[][], height: number) {
  if (data.length < 3) return '';

  const pc = getControlPoints(data);

  let d = '';
  let connection = '';
  d += `M${data[0][0]}, ${data[0][1]}`;
  d += `Q${pc[0][1].x}, ${pc[0][1].y}, ${data[1][0]}, ${data[1][1]}`;
  if (data.length > 2) {
    for (let i = 1; i < pc.length; i++) {
      d += `C${pc[i - 1][0].x}, ${pc[i - 1][0].y} ${pc[i][1].x},${pc[i][1].y} ${data[i + 1][0]},${data[i + 1][1]}`;
    }
    const n = data.length - 1;
    d += `Q${pc[n - 2][0].x}, ${pc[n - 2][0].y} ${data[n][0]},${data[n][1]}`;

    const maxY = height;
    const minX = Math.min(...data.map(t => t[0]));
    connection = `L ${data[n][0]} ${maxY} L ${minX} ${maxY} ${minX} ${data[0][1]}`;
  }

  return [d, connection];
}

export function svgCurveFromPoints(data: number[][], height: number) {
  return curveToString(data, height);
}
