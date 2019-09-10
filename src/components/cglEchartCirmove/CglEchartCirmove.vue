<template>
  <div>
    <div id="CglEchartCirmove" class="flex">

        <div id="echartContainer" 
            class="echart-box"
            :style="{width: echartWidth, height: echartWidth}">
            <v-chart :options="gauge"/>
        </div>

        <div id="content" class="flex-clo" :style="`color:${this.titleColor}`">
            <i v-show="!this.viewData.disable" class="ico iconfont" @click.prevent="clickIcoFn(1)">&#xe734;</i>

            <div v-if="this.viewData.disable"><b>--</b></div>
            <div v-else><b>{{val}}</b><i>{{unit}}</i></div>
            
            <i v-show="!this.viewData.disable" class="ico iconfont" @click.prevent="clickIcoFn(-1)">&#xe608;</i>
        </div>
    </div>
  </div>
</template>

<script>
import DragGuage from '@/components/cglEchartCirmove/dragGuage.js'
export default {
  name: "CglEchartCirmove",
  props:['viewData', 'fatherVal'],
  data() {
    const diameter = document.body.clientWidth; // 直径
    return {
        val:0,             // 当前值
        chartVal:0,        // 滑动参数值
        titleColor:'#333',
        unit:'',
        echartWidth: diameter + 'px',
        gauge:{
            series: [
                {
                    type: "gauge",     // 仪表盘
                    startAngle: 270,   // 起始角度
                    endAngle: -89.99,  // 结束角度
                    radius: (diameter / 2) * 0.7,  // 表盘半径
                    axisLabel: {       // ==========================  刻度标签。
                        show: false
                    },
                    axisLine: {        // ==========================  表盘轴线相关配置
                        show: false,     // 是否显示仪表盘轴线
                        lineStyle: {
                        width: 0,      // 轴线宽度
                        color: [[50 / 100, "#5CBB9D"], [1, "#dbdbdb"]],  // 轴线颜色
                        shadowColor: "#dbdbdb", // 默认透明
                        shadowBlur: 10,         // 阴影颜色
                        opacity: 0              // 图形透明度,为 0 不会绘制改图形
                        }
                    },
                    axisTick: {        // ==========================  小刻度相关
                        show: true,      // 是否显示刻度
                        length: (diameter / 2) * 0.1,    // 刻度线长,支持相对半径的百分比
                        lineStyle: {     // 仪表详情数据相关
                        width: (diameter / 2) * 0.014, // 线宽
                        color: "auto"  // 线的颜色
                        }
                    },
                    splitLine: {       // ===========================  分隔线
                        show: false      // 是否显示分隔线
                    },
                    pointer: {         // ===========================  指针长度
                        show: false      // 是否显示指针
                    },
                    min: 1,            // 最小数据
                    max: 100,          // 最大数据
                    clockwise: true,   // 仪表盘刻度顺时针增长
                    splitNumber: 6,    // 仪表盘刻度的分割段数
                    detail: {          // 仪表盘详情，用于显示数据。
                        show: false      // 是否显示详情
                    }
                },
                {
                    type: "gauge",
                    startAngle: 270,
                    endAngle: -89.99,
                    radius: (diameter / 2) * 0.55,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                        width: 0,
                        color: [[0 / 100, "#5CBB9D"], [1, "#dbdbdb"]],
                        shadowColor: "#dbdbdb", // 默认透明
                        shadowBlur: 10,
                        opacity: 0
                        }
                    },
                    axisTick: {
                        show: true,
                        length: (diameter / 2) * 0.03,
                        lineStyle: {
                        width: (diameter / 2) * 0.008,
                        color: "auto"
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    min: 1,
                    clockwise: true,
                    max: 100,
                    splitNumber: 6,
                    detail: {
                        show: false
                    }
                }
            ],
         }
    };
  },
  created:function(){
    var echarts = require("echarts");
    this.updateFatherData();
  },
  watch:{
    viewData:function(){
        this.updateFatherData();
    },
    fatherVal:function(){
        this.updateFatherData();
    }
  },
  mounted() {
    const _ = this;
    this.dragGuage = new DragGuage(document.getElementById("echartContainer"),{
        noDrag(){
            // return false // 禁用
            if(_.viewData.disable){
                return true;
            }
        },
        touchStart(){
            // console.log("touchStart =======");
        },
        touchMove(angle){
            const chartVal = _.getValueByAngle(angle, _.chartVal)
            // console.log("touchMove =======",chartVal);
            _.$emit('fatherMove',chartVal)
        },
        touchEnd(angle){
            const chartVal = _.getValueByAngle(angle, _.chartVal)
            _.chartVal = chartVal;
            _.$emit('fatherEnd',chartVal)
            // console.log("touchEnd =======",chartVal);
        }
    })
  },
  methods: {
    clickIcoFn(unit){

        if(this.viewData.disable){
            return;
        } 
        const step = this.viewData.step || 1;
        const addNum = step * unit;
        const min = this.viewData.fange[0] || 0;
        const max = this.viewData.fange[1] || 100;
        let chartVal = this.chartVal + addNum;
        chartVal = chartVal <= min ? min : chartVal;
        chartVal = chartVal >= max ? max : chartVal;

        this.getYuanhuanUI(chartVal);
        this.val = chartVal;
        this.chartVal = chartVal;

        this.$emit('fatherClick',chartVal);
    },
    // ======================================
    updateFatherData(){
        const min = this.viewData.fange[0] || 0;
        const max = this.viewData.fange[1] || 100;
        const splitNumber = this.viewData.splitNumber || 6;
        const titleColor = this.viewData.titleColor || '#333';
        const unit = this.viewData.unit || '';
        const dis = this.viewData.disable;
        const val =  dis ? 0 : this.fatherVal || 0;

        this.gauge.series[0].min = min;
        this.gauge.series[0].max = max;
        this.gauge.series[1].min = min;
        this.gauge.series[1].max = max;
        this.gauge.series[1].splitNumber = splitNumber;
        this.val = val;
        this.chartVal = val;
        this.titleColor = titleColor;
        this.unit = unit;

        this.getYuanhuanUI(val);
    },
    getYuanhuanUI(pageresult){  // ===== 根据数据，显示圆环 UI 
        const persult =(pageresult - this.viewData.fange[0])  / (this.viewData.fange[1] - this.viewData.fange[0]) * 100 ;
        const gauge = this.gauge;
        const deColor = this.viewData.color || '#dbdbdb';
        const selColor = this.viewData.selColor || '#5CBB9D';

        gauge.series[0].axisLine.lineStyle.color = [
            [persult / 100, selColor],
            [1, deColor]
        ];
        gauge.series[1].axisLine.lineStyle.color = [
            [persult / 100, selColor],
            [1, deColor]
        ];
        this.gauge = gauge;
    },
    getValueByAngle(angle, defaultValue){ // ===== 根据角度获取值
        console.log('%c angle, defaultValue ===','background:#green;color:#fff' ,angle, defaultValue);
        const value = Math.round(
            angle / 
            ( (2 * Math.PI) / 
             (this.viewData.fange[1] - this.viewData.fange[0] + 1)
            )
        ); 

        const step = this.viewData.step || 1;
        const addNum = parseInt(parseInt(value) / step);
        var result = addNum * step + parseInt(defaultValue);
        if (result < this.viewData.fange[0]) {
            result = this.viewData.fange[0];
        }
        if (result > this.viewData.fange[1]) {
            result = this.viewData.fange[1];
        }

        this.getYuanhuanUI(result);
        this.val = result;
        return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#CglEchartCirmove{
    position: relative;
    #content{
        position: absolute;
        flex-direction: column;
        z-index: 2;
        color: #333;
        .ico{
            display: inline-block;
            font-size: .533rem;
            padding:.267rem .533rem;
        }
        div{
            b{
                font-size: 140px;
            }
            i{
                font-size: .533rem;
            }
        }
    }
    .echart-box .echarts {
        width: 100%;
        height: 100%;
    }
}

</style>
