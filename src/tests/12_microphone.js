export default function() {
  return navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(stream => {
      return context.createMediaStreamSource(stream)
    })
}
