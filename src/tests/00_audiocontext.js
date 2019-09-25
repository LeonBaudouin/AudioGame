export default function() {
  const chapter = document.createElement('div')
  chapter.innerText = 'audiocontext'

  const BaseAudioContext = window.AudioContext || window.webkitAudioContext
  const context = new BaseAudioContext()
  console.log(context)

  const section = document.createElement('section')
  section.append(chapter)

  return section
}
