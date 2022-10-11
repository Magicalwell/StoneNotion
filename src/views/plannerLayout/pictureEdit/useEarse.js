export function useEarse(props) {
  const canvas = document.querySelector('#editcanvas')
  const canvasCon = canvas.getContext('2d')
  let darwingSurfaceImageData = null
  let isErasing = false

  canvasCon.fillStyle = 'rgba(200, 10, 50, .1)'
  canvasCon.strokeStyle = 'rgba(200, 10, 50, .8)'

  //   canvasCon.beginPath()
  //   canvasCon.save()
  //   canvasCon.translate(canvas.width / 2, canvas.height / 2)
  //   const part = 17
  //   const unitAngle = (Math.PI * 2) / part
  //   for (let i = 0; i < part; i++) {
  //     canvasCon.save()
  //     canvasCon.rotate(unitAngle * i)
  //     canvasCon.fillRect(
  //       0,
  //       -canvas.width / 16,
  //       canvas.width / 5,
  //       canvas.width / 8
  //     )
  //     canvasCon.restore()
  //   }
  //   canvasCon.restore()
  //   canvasCon.closePath()

  function saveDrawingSfarce() {
    darwingSurfaceImageData = canvasCon.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )
  }

  saveDrawingSfarce()
  function restoreDrawingSface() {
    canvasCon.putImageData(darwingSurfaceImageData, 0, 0)
  }
  function drawEraser({ x, y }) {
    console.log(x, y)
    canvasCon.save()
    canvasCon.beginPath()
    canvasCon.arc(x, y, 10, 0, Math.PI * 2, false)
    canvasCon.clip()
    canvasCon.clearRect(0, 0, canvas.width, canvas.height)
    canvasCon.closePath()
    canvasCon.restore()
  }
  function removeEarseListener() {
    canvas.onmousedown = null
    canvas.onmouseup = null
    canvas.onmousemove = null
  }
  canvas.onmousedown = function (e) {
    if (e.button !== 0) {
      return
    }
    isErasing = true
    const rect = canvas.getBoundingClientRect()
    var x = e.offsetX * (canvas.width / rect.width)
    var y = e.offsetY * (canvas.height / rect.height)
    drawEraser({
      x: x,
      y: y
    })
  }

  canvas.onmouseup = function (e) {
    isErasing = false
    saveDrawingSfarce()
    restoreDrawingSface()
  }

  canvas.onmousemove = function (e) {
    if (e.button !== 0) {
      return
    }
    if (isErasing) {
      const rect = canvas.getBoundingClientRect()
      var x = e.offsetX * (canvas.width / rect.width)
      var y = e.offsetY * (canvas.height / rect.height)
      drawEraser({
        x: x,
        y: y
      })
    }
  }

  return { removeEarseListener }
}
