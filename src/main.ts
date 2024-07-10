import './style.css'
import Counting from './counting'

const view = (counting: Counting) => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>${counting.time.minutes}:${counting.time.seconds}:${counting.time.milliseconds}</h1>
    <div class="card">
      <button onclick="start()" type="button">开始</button>
      <button onclick="pause()" type="button">暂停</button>
      <button onclick="resume()" type="button">继续</button>
      <button onclick="end()" type="button">结束</button>
      <button onclick="reset()" type="button">重置</button>
    </div>
  </div>
`
}

const viewH1 = () => document.querySelector<HTMLDivElement>('h1')!.innerHTML = `${counting.time.minutes}:${counting.time.seconds}:${counting.time.milliseconds}`
const counting = new Counting({
  tick: viewH1
})


window.start = () => {
  console.log('===> counting.start')
  counting.start()
}
window.pause = () => {
  console.log('===> counting.pause')
  counting.pause()
}
window.resume = () => {
  console.log('===> counting.resume')
  counting.resume()
}
window.end = () => {
  console.log('===> counting.end')
  counting.end()
}
window.reset = () => {
  console.log('===> counting.reset')
  counting.reset().then(viewH1)
}

view(counting)
console.log(counting)
