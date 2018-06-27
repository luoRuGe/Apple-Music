<template>
    <!--slider比较小的外部容器-->
    <div class="slider" ref="slider">
        <!--图片部分：slider-group比较长的内容容器，可以滚动-->
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <!--小圆点部分-->
        <div class="dots">
            <!--当小圆点的索引等于当前页面的索引时，有active样式-->
            <span :class="['dot',{'active':index==currentPageIndex}]" v-for="(item,index) in dots"></span>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        data(){
            return {
                dots:[],
                currentPageIndex:0
            }
        },
        props:{
            loop:{
                type:Boolean,
                default:true
            },
            autoplay:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            this._setSliderWidth();
            this._initSlider();
            this._initDots();
            if(this.autoplay){
                this._play()
            }
            window.addEventListener('resize',()=>{
                if(!this.slider){
                    return;
                }
                this._setSliderWidth(true);
                this.slider.refresh();
            })
        },
        methods:{
            //设置slider-group的宽度
            _setSliderWidth(isResize){
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.classList.add('slider-item');
                    child.style.width = sliderWidth+"px";
                    width+=sliderWidth;
                }
                //只有第一次的时候需要加上2个宽度
                if(this.loop&&!isResize){
                    width+=2*sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width+"px";
            },
            //初始化轮播图
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX: true,
                    snap:{
                        loop: this.loop,
                        threshold: 0.1
                    },
                    momentum: false,
                    //派发一个click事件
                    click:true
                })
                //监听轮播图的滚动结束事件
                this.slider.on('scrollEnd',()=>{
                    let pageIndex = this.slider.getCurrentPage().pageX;//1
                    if(this.loop){
                        pageIndex-=1;
                    }
                    this.currentPageIndex = pageIndex+1;

                    if(this.autoplay){
                        clearTimeout(this.timer);
                        this._play();
                    }
                });
                //监听手指触摸开始事件
                this.slider.on('beforeScrollStart',()=>{
                    clearTimeout(this.timer);
                });
                //监听手指触摸结束事件
                this.slider.on('touchEnd',()=>{
                    clearTimeout(this.timer);
                    this._play();
                })
            },
            //初始化小圆点数据
            _initDots(){
                if(this.loop){
                    this.dots = new Array(this.children.length-2)
                }else{
                    this.dots = new Array(this.children.length)
                }
            },
            //滚动到下一张
            _play(){
                this.timer = setTimeout(()=>{
                    this.slider.next()
                },2000)
            }
        },
        destroyed(){
            clearTimeout(this.timer)
        }
    }
</script>
<style lang="stylus">
    @import "../../common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>


