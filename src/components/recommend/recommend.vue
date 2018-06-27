<template>
    <div class="recommend">
        <scroll class="recommend-content">
            <div>
                <div class="slider-wrapper" v-if="recommend.length">
                    <slider :loop="true" :autoplay="true">
                        <div v-for="item in recommend">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in dissList" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" alt="" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
    import Slider from '../../base/slider/slider'
    import Scroll from "../../base/scroll/scroll"
    import {url,callback,ERR_OK} from "../../api/getRecommend"
    import {host,port,path} from "../../api/getDissList"
    import axios from "axios"
    export default {
        data(){
            return {
                recommend:[],
                dissList:[]
            }
        },
        created(){
            this._getRecommend();
        },
        methods:{
            //请求轮播图数据
            _getRecommend(){
                this.$http.jsonp(url,
                    {
                        "jsonp":callback
                    }).then((res)=>{
                        if(res.body.code==ERR_OK){
                            console.log(res.body.data.slider)
                            this.recommend = res.body.data.slider;
                        }
                    this._getDissList();
                    })
            },
            _getDissList(){
                axios.get(`http://${host}:${port}${path}`).then((response)=>{
                    this.dissList = response.data;
                })
            }
        },
        components:{
            Slider,
            Scroll
        }
    }
</script>
<style lang="stylus">
    @import "../../common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>