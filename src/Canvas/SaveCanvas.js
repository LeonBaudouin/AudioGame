export function saveCanvas(canvas) {
  const dataURL = canvas.toDataURL()
  const blobBin = atob(dataURL.split(',')[1])
  const array = []
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i))
  }
  const file = new Blob([new Uint8Array(array)], { type: 'image/png' })

  upload(file, 'Youpi')
}

export function upload(file, title) {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('experiment', file)

  fetch('http://localhost:3000/experiment/', {
    body: formData,
    method: 'post',
  })
}
