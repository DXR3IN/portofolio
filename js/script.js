// const kordinat = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// circles.forEach(function (circle) {
//   circle.x = 0;
//   circle.y = 0;
// });

// window.addEventListener("mousemove", function (e) {
//   kordinat.x = e.pageX;  
//   kordinat.y = e.pageY;

//   console.log(kordinat);
// });

// function animate_Circles() {

//   let x = kordinat.x;
//   let y = kordinat.y;

//   circles.forEach(function (circle, index) {
//     circle.style.left = x - 12 + "px";
//     circle.style.top = y - 12 + "px";

//     circle.style.scale = (circles.length - index) / circles.length;

//     circle.x = x;
//     circle.y = y;

//     const nextCircle = circles[index + 1] || circles[0];
//     x += (nextCircle.x - x) * 0.3;
//     y += (nextCircle.y - y) * 0.3;
//   });

//   requestAnimationFrame(animate_Circles);
// }

// animate_Circles();



function generateSquares(count, width, height, canvasWidth, canvasHeight) {
  const squares = [];
  for (let i = 0; i < count; i++) {
    squares.push({
      x: Math.floor(Math.random() * canvasWidth / width) * width,
      y: Math.floor(Math.random() * canvasHeight / height) * height
    });
  }
  return squares;
}

function drawGrid(ctx, width, height, canvasWidth, canvasHeight, opacity) {
  ctx.strokeStyle = `rgba(128, 128, 128, ${opacity})`;
  ctx.fillStyle = `rgba(128, 128, 128, ${opacity})`;
  for (let x = 0; x < canvasWidth; x += width) {
    for (let y = 0; y < canvasHeight; y += height) {
      ctx.strokeRect(x, y, width, height);
    }
  }
}

function animateSquares(ctx, squares, width, height, maxOpacity, duration) {
  squares.forEach((square, index) => {
    setTimeout(() => {
      const interval = setInterval(() => {
        ctx.clearRect(square.x, square.y, width, height);
        square.x = Math.floor(Math.random() * ctx.canvas.width / width) * width;
        square.y = Math.floor(Math.random() * ctx.canvas.height / height) * height;
        ctx.globalAlpha = maxOpacity;
        ctx.fillRect(square.x, square.y, width, height);
        ctx.globalAlpha = 1;
      }, duration * 1000);
    }, index * 100);
  });
}

function resizeCanvas(canvas, ctx, squares, width, height, numSquares, maxOpacity, duration) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, width, height, canvas.width, canvas.height, 0.3); // Redraw grid with 30% opacity
  animateSquares(ctx, squares, width, height, maxOpacity, duration);
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gridPatternCanvas');
  const ctx = canvas.getContext('2d');
  const width = 40;
  const height = 40;
  const numSquares = 50;
  const maxOpacity = 0.5;
  const duration = 4;
  let currentOpacity = 0;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const squares = generateSquares(numSquares, width, height, canvas.width, canvas.height);

  // Gradually increase the opacity of the grid
  const opacityInterval = setInterval(() => {
    if (currentOpacity >= 0.3) {
      clearInterval(opacityInterval);
    } else {
      currentOpacity += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, width, height, canvas.width, canvas.height, currentOpacity);
    }
  }, 50);

  animateSquares(ctx, squares, width, height, maxOpacity, duration);

  window.addEventListener('resize', () => {
    resizeCanvas(canvas, ctx, squares, width, height, numSquares, maxOpacity, duration);
  });
});

//in animation for skill page
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('odd')) {
          target.classList.add('slide-in-left');
        } else {
          target.classList.add('slide-in-right');
        }

        // Add event listener to remove 'div-animation' class after animation ends
        target.addEventListener('animationend', () => {
          target.classList.remove('div-animation');
        }, { once: true });

        observer.unobserve(target);
      }
    });
  });

  document.querySelectorAll('.div-animation').forEach(div => {
    observer.observe(div);
  });
});

//home button
document.addEventListener('DOMContentLoaded', function() {
  const head = document.getElementById('head');
  const backToTop = document.getElementById('back-to-top');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        backToTop.style.display = 'none';
      } else {
        backToTop.style.display = 'flex';
      }
    });
  });

  observer.observe(head);
});
