export default class DragGuage {
  constructor (dom, options) {
    this.$element = dom
    this.options = Object.assign({
      touchMove: function () {},
      touchEnd: function () {},
      touchStart: function () {},
      noDrag: false
    }, options)
    this.diameter = document.body.offsetWidth
    this.offsetTop = dom.getBoundingClientRect().top
    // this.offsetLeft = dom.getBoundingClientRect().left
    this.direction = 1 // 1:顺时针 0：逆时针
    this.now = null
    this.axis = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    }
    this.drag()
  }

  setEndPointer (e) {
    this.axis.x2 = e.touches[0].clientX - this.diameter / 2
    this.axis.y2 = this.diameter / 2 + this.offsetTop - e.touches[0].clientY
  }

  setStartPointer (e) {
    this.axis.x1 = e.touches[0].clientX - this.diameter / 2
    this.axis.y1 = this.diameter / 2 + this.offsetTop - e.touches[0].clientY
  }

  setCurrentPointer (x, y) {
    this.axis.x = x
    this.axis.y = y
  }

  validateStartPointer () {
    const { x1, y1 } = this.axis
    const dis = Math.sqrt(x1 * x1 + y1 * y1)
    if ((dis < this.diameter / 2 * 0.8) && (dis > this.diameter / 2 * 0.5)) {
      this.draging = true
    } else {
      this.draging = false
    }
    // if (Math.abs(x - x1) < 20 || Math.abs(y - y1) < 20) {
    //   this.draging = false
    // } else {
    //   this.draging = true
    // }
  }

  move (e) {
    const { noDrag } = this.options
    if (!this.draging) return
    if (typeof noDrag === 'function' ? noDrag() : noDrag) return
    
    this.setEndPointer(e)
    this.renderAngle()
    if (this.options.touchMove) {
      this.options.touchMove.call(this, this.angle)
    }
    this.setCurrentPointer(this.axis.x2, this.axis.y2)
  }

  drag () {
    this.$element.addEventListener('touchstart', (e) => {
      const { noDrag } = this.options
      this.now = Date.now()
      if (typeof noDrag === 'function' ? noDrag() : noDrag) return;
      this.angle = 0
      if (e.touches.length > 1) {
        return;
      }
      if (this.options.touchStart) {
        this.options.touchStart.call(this)
      }
      this.setStartPointer(e)
      // 判断点是否在圆弧内
      this.validateStartPointer()
      this.setCurrentPointer(this.axis.x1, this.axis.y1)
    })
    this.$element.addEventListener('touchmove', this.move.bind(this))
    this.$element.addEventListener('touchend', (e) => {
      const { noDrag } = this.options
      this.delta = Date.now() - this.now
      if (this.draging) {
        if (typeof noDrag === 'function' ? noDrag() : noDrag) return;
        if (this.options.touchEnd) {
          this.options.touchEnd.call(this, this.angle)
        }
      }
      this.draging = false
    })
  }

  renderAngle () {
    
    // 先计算点1
    const { x, y, x2, y2 } = this.axis
    let angle1 = Math.atan2(y, x)
    let angle2 = Math.atan2(y2, x2)
    const dis = (angle1 - angle2) / Math.PI * 180
    if ((angle1 > 0 && angle2 > 0) || (angle1 < 0 && angle2 < 0)) {
      this.direction = dis > 0 ? 1 : dis < 0 ? -1 : 0
    }
    this.angle = this.angle + this.getAngle() * this.direction
    this.angle = this.angle > Math.PI * 2 ? Math.PI * 2 : this.angle
    this.angle = this.angle < -Math.PI * 2 ? -Math.PI * 2 : this.angle
    this.angle = isNaN(this.angle) ? 0 : this.angle
  }

  getAngle () {
    const { x, y, x2, y2 } = this.axis
    let mo, ji
    mo = Math.sqrt(x * x + y * y) * Math.sqrt(x2 * x2 + y2 * y2)
    ji = x * x2 + y * y2
    return Math.acos(ji / mo)
  }
}
