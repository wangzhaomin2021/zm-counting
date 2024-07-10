enum CountingState {
  Pennding,
  Running,
  Paused,
  Finished
}

export interface CountingOptions {
  tick?: () => void
}

export default class Counting {
  public passTime: number // 过去时间
  private countingPoint: number // 计时点
  private _state: CountingState
  private timer: number | null = null
  private tick: () => void

  constructor({ tick = () => { } }: CountingOptions) {
    this.passTime = 0
    this.countingPoint = 0
    this._state = CountingState.Pennding
    this.timer = null
    this.tick = tick
  }


  get state() {
    return this._state
  }

  get time() {
    const milliseconds = Math.abs(this.passTime)
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      milliseconds: milliseconds % 1000
    }
  }

  private counting() {
    const now = Date.now()
    this.passTime += now - this.countingPoint
    this.countingPoint = now
    if (this.tick) this.tick()
    this.timer = requestAnimationFrame(() => this.counting())
  }

  private stopCounting() {
    if (this.timer) cancelAnimationFrame(this.timer)
  }

  // 开始
  public async start() {
    this.stopCounting()
    this._state = CountingState.Running
    this.passTime = 0
    this.countingPoint = Date.now()
    this.counting()
  }

  // 暂停
  public async pause() {
    if (this._state === CountingState.Running) {
      this._state = CountingState.Paused
      this.passTime += Date.now() - this.countingPoint
      this.stopCounting()
    }
  }

  // 恢复
  public async resume() {
    if (this._state === CountingState.Paused) {
      this._state = CountingState.Running
      this.countingPoint = Date.now()
      this.counting()
    }
  }

  // 结束
  public async end() {
    this._state = CountingState.Finished
    this.passTime = 0
    this.stopCounting()
  }

  // 重置
  public async reset() {
    this._state = CountingState.Pennding
    this.passTime = 0
    this.stopCounting()
  }
}
