// let r;              // 圆的半径
// let xiaoyuanX;       // 小圆 X 轴
// let xiaoyuanY;       // 小圆 Y 轴
// let now_wind = 20;      // 当前值
// let xiaoyuanR;      // 小圆半径
// let x1;
// let y1;
// let max = max;
// let min = min;
let getCanvas = (min, max_wind, canvasWind, now_wind, disable, cirCon,color,title) => {

    const multiple = 0.7 // 总体放大多少

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.save();
    ctx.clearRect(0, 0, canvas_X, canvas_Y); // 清除画布

    var pageX = document.body.clientWidth;
    canvas.width = pageX * 0.6;
    canvas.height = pageX * 0.6;

    canvas.style.width = pageX * multiple+ 'px';
    canvas.style.height = pageX * multiple + 'px';
    canvas.width = pageX * multiple * 2;
    canvas.height = pageX * multiple * 2;
    // 放大倍数
    ctx.scale(2, 2);

    let r = pageX * multiple / 2 * 0.8;

    let cirWidth = r / 7;
    var cirMin = 0.75;
    var canvasWind = canvasWind >= min && canvasWind <= max_wind ? canvasWind : (canvasWind < min ? min : max_wind);
    var cirMax = (2.25 - 0.75) * (canvasWind - min) / (max_wind - min) + 0.75;
    var x1 = r * Math.cos(cirMax * Math.PI);
    var y1 = r * Math.sin(cirMax * Math.PI);
    var xiaoyuanX = Math.ceil(pageX * 0.6 / 2 + x1);
    var xiaoyuanY = Math.ceil(pageX * 0.6 / 2 + y1);
    var canvas_X = pageX * multiple;
    var canvas_Y = pageX * multiple;
    const canvas_title = title || '';
    //==================================  画布的背景色
    // ctx.beginPath();
    // ctx.fillStyle = 'pink';
    // ctx.fillRect(0, 0, canvas_X, canvas_Y)

    // 静态显示
    // -- 背景圆
    ctx.beginPath();
    ctx.translate(canvas_X / 2, canvas_Y / 2);
    ctx.lineWidth = cirWidth;
    ctx.strokeStyle = "rgba(0,0,0,0.10)";
    ctx.arc(0, 0, r, cirMin * Math.PI, 2.25 * Math.PI, false);
    ctx.stroke();
    // -- 范围
    // ===== min
    ctx.beginPath();
    var leftX_x1 = (r - cirWidth / 2) * Math.cos(0.735 * Math.PI);
    var leftY_y1 = (r - cirWidth / 2) * Math.sin(0.735 * Math.PI);
    var leftX_x2 = (r + cirWidth * 2) * Math.cos(0.735 * Math.PI);
    var leftY_y2 = (r + cirWidth * 2) * Math.sin(0.735 * Math.PI);
    ctx.moveTo(leftX_x1, leftY_y1);
    ctx.lineTo(leftX_x2, leftY_y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    // 字体
    ctx.beginPath();
    ctx.font = "normal 14px Arical";
    ctx.fillStyle = color
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(min, leftX_x2 - 15, leftY_y2 + 10);
    ctx.font = "normal 8px Arical";
    ctx.fillStyle = color
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", leftX_x2, leftY_y2 + 10);

    // ===== max
    ctx.beginPath();
    var rightX_x1 = (r - cirWidth / 2) * Math.cos(2.265 * Math.PI);
    var rightY_y1 = (r - cirWidth / 2) * Math.sin(2.265 * Math.PI);
    var rightX_x2 = (r + cirWidth * 2) * Math.cos(2.265 * Math.PI);
    var rightY_y2 = (r + cirWidth * 2) * Math.sin(2.265 * Math.PI);
    ctx.moveTo(rightX_x1, rightY_y1);
    ctx.lineTo(rightX_x2, rightY_y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 字体
    ctx.beginPath();
    ctx.font = "normal 14px Arical";
    ctx.fillStyle = color

    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(max_wind, rightX_x2 + cirWidth - 6, rightY_y2 + 10);
    ctx.font = "normal 8px Arical";
    ctx.fillStyle = color
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", rightX_x2 + 26, rightY_y2 + 10);
    // ==== 当前温度
    ctx.font = "normal 14px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(canvas_title, 0, rightY_y2 + 5);
    let xiaoyuanR;

    // 显示温度
    ctx.font = "bold 50px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    if (now_wind != 0 && typeof (now_wind) != 'undefined' && !disable) {
        ctx.fillText(now_wind, 0, 0);
    } else {
        ctx.fillText("--", 0, 0);
    }
    ctx.font = "normal 14px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", (r - cirWidth * 1.5) * Math.cos(1.75 * Math.PI), (r - cirWidth * 3) * Math.sin(1.75 * Math.PI));
    // 显示进度

    if (!disable) {
        ctx.beginPath();
        ctx.lineWidth = cirWidth + 1;
        ctx.strokeStyle = color;
        ctx.arc(0, 0, r, cirMin * Math.PI, cirMax * Math.PI, false);
        ctx.stroke();
        // 小球
        xiaoyuanR = cirWidth * 0.9;
        if (canvasWind >= min && typeof (canvasWind) != 'undefined' && !cirCon) {
            ctx.beginPath();
            ctx.arc(x1, y1, cirWidth * 0.9, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            canvasWind = min;
        }
    }
    ctx.restore();
    let obj = { r, cirWidth, canvas_X, canvas_Y, canvasWind }
    return obj;
}

export default {
    getCanvas 
}