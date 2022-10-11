import { ref, watch, computed } from 'vue'
const useRc = ({ pictureData }, fn) => {
  const canvas = document.querySelector('#editcanvas')
  // const canvasPre = document.querySelector('#preview')
  const context = canvas.getContext('2d')
  // const contextPre = canvasPre.getContext('2d')
  // const img = document.createElement('img')
  // img.src = pictureData
  // console.log(img.height, img.width)
  // img.onload = function () {
  //   canvas.height = img.height
  //   canvas.width = img.width
  //   context.drawImage(img, 0, 0)
  //   contextPre.drawImage(img, 0, 0)
  //   // cutout(canvas, [255, 255, 255], 0.2) // 对白色进行抠除，容差为0.2
  // }
  function getAimRgb(e) {
    const colorList = context
      .getImageData(e.offsetX, e.offsetY, 1, 1)
      .data.slice(0, 3)
    // cutout(canvas, [colorList[0], colorList[1], colorList[2]], 0.4, {
    //   x: e.offsetX,
    //   y: e.offsetY
    // })
    console.log(e.offsetX, e.offsetY, colorList)
    cutoutFlood(
      canvas,
      e.offsetX,
      e.offsetY,
      [colorList[0], colorList[1], colorList[2]],
      0.2
    )
  }
  // 使用泛洪法，不用扫描法，扫描方法存在问题
  // function cutout(canvas, color, range = 0, pos) {
  //   const context = canvas.getContext('2d')
  //   const imageInfo = context.getImageData(0, 0, canvas.width, canvas.height)
  //   const pixiArr = imageInfo.data
  //   for (let row = 0; row < canvas.height; row++) {
  //     let left = row * 4 * canvas.width
  //     let right = left + 4 * canvas.width - 1 - 3
  //     let leftF = false
  //     let rightF = false
  //     while (!leftF || !rightF) {
  //       if (!leftF) {
  //         if (
  //           testColor(
  //             [pixiArr[left], pixiArr[left + 1], pixiArr[left + 2]],
  //             color,
  //             range
  //           )
  //         ) {
  //           pixiArr[left + 3] = 0
  //           left += 4
  //         } else leftF = true
  //       }
  //       if (!rightF) {
  //         if (
  //           testColor(
  //             [pixiArr[right], pixiArr[right + 1], pixiArr[right + 2]],
  //             color,
  //             range
  //           )
  //         ) {
  //           pixiArr[right + 3] = 0
  //           right -= 4
  //         } else rightF = true
  //       }
  //       if (left === right) {
  //         leftF = true
  //         rightF = true
  //       }
  //     }
  //   }
  //   // 同理进行列扫描
  //   for (let col = 0; col < canvas.width; col++) {
  //     let top = col * 4 // 指向列头
  //     let bottom =
  //       top + (canvas.height - 2) * canvas.width * 4 + canvas.width * 4 // 指向列尾
  //     let topF = false
  //     let bottomF = false
  //     while (!topF || !bottomF) {
  //       if (!topF) {
  //         if (
  //           testColor(
  //             [pixiArr[top], pixiArr[top + 1], pixiArr[top + 2]],
  //             color,
  //             range
  //           )
  //         ) {
  //           pixiArr[top + 3] = 0
  //           top += canvas.width * 4
  //         } else topF = true
  //       }
  //       if (!bottomF) {
  //         if (
  //           testColor(
  //             [pixiArr[bottom], pixiArr[bottom + 1], pixiArr[bottom + 2]],
  //             color,
  //             range
  //           )
  //         ) {
  //           pixiArr[bottom + 3] = 0
  //           bottom -= canvas.width * 4
  //         } else bottomF = true
  //       }

  //       if (top === bottom) {
  //         topF = true
  //         bottomF = true
  //       }
  //     }
  //   }

  //   context.putImageData(imageInfo, 0, 0)
  // }
  function testColor(current, target, range) {
    for (let i = 0; i < 3; i++) {
      if (
        !(
          (1 - range) * target[i] <= current[i] &&
          (1 + range) * target[i] >= current[i]
        )
      ) {
        return false
      }
    }
    return true
  }
  function cutoutFlood(canvas, startX, startY, color, range = 0) {
    const context = canvas.getContext('2d')
    const imageInfo = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixiArr = imageInfo.data
    const stack = []

    function floodFill8(x, y) {
      // 8个方向
      const dx = [0, 1, 1, 1, 0, -1, -1, -1]
      const dy = [-1, -1, 0, 1, 1, 1, 0, -1]

      const map = {} // 标识已经处理过的像素点，防止重复处理

      // 如果开始像素符合条件，则将它放入栈中并标识为已处理
      let cell = (x + y * canvas.width) * 4
      if (
        testColor(
          [pixiArr[cell], pixiArr[cell + 1], pixiArr[cell + 2]],
          color,
          range
        )
      ) {
        const firstPixi = `x${x}y${y}` // `x${x}y${y}`是一个不会重复的唯一标识id
        map[firstPixi] = true
        stack.push({
          x,
          y
        })
      } else return // 否则直接结束

      let p // position
      while ((p = stack.pop())) {
        // 获取栈顶待处理的符合条件的像素的x与y值
        cell = (p.x + p.y * canvas.width) * 4
        pixiArr[cell + 3] = 0
        // 测试周围8个是否符合抠除条件
        for (let i = 0; i < 8; i++) {
          const nx = p.x + dx[i]
          const ny = p.y + dy[i]
          // 是否在范围内并且没有被处理过
          if (
            nx >= 0 &&
            nx < canvas.width &&
            ny >= 0 &&
            ny < canvas.height &&
            !map[`x${nx}y${ny}`]
          ) {
            cell = (nx + ny * canvas.width) * 4
            if (
              testColor(
                [pixiArr[cell], pixiArr[cell + 1], pixiArr[cell + 2]],
                color,
                range
              )
            ) {
              map[`x${nx}y${ny}`] = true // 标识此像素已被处理
              // 没处理过则放入栈中
              stack.push({
                x: nx,
                y: ny
              })
            }
          }
        }
      }
    }
    floodFill8(startX, startY)
    context.putImageData(imageInfo, 0, 0)
    fn()
  }
  return {
    getAimRgb
  }
}
export default useRc
