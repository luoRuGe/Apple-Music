<template>
    <transition name="slide">
        <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
    </transition>
</template>
<script>
    import MusicList from "../music-list/music-list"
    import {url,callback,ERR_OK} from "../../api/getSingerDetail";
    import {mapGetters} from "vuex"
    export default {
        data(){
            return {
                songs:[]
            }
        },
        created(){
            this._getDetail()
        },
        computed:{
            bgImage(){
                return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${this.$route.params.id}.jpg?max_age=2592000`
            },
            title(){
                return this.singer.name
            },
            ...mapGetters(['singer'])
        },
        methods:{
            _getDetail(){
                var id = this.$route.params.id;
                if(!id){
                    this.$router.push('/singer');
                    return;
                }
                this.$http.jsonp(url,{
                    params:{
                        singermid:id
                    },
                    "jsonp":callback
                }).then((res)=>{
                    this.songs = this._normalizeSongs(res.data.data.list)
                })

            },
            filterSinger(singer){
                let ret = [];
                if(!singer){
                    return ""
                }
                singer.forEach((s)=>{
                    ret.push(s.name)
                })

                return ret.join('/');
            },
            _normalizeSongs(list){
                let ret = [];
                list.forEach((item)=>{
                    let {musicData} = item;
                    ret.push({
                        id:musicData.songid,
                        mid:musicData.songmid,
                        singer:this.filterSinger(musicData.singer),
                        name:musicData.songname,
                        album:musicData.albumname,
                        duration:musicData.interval,
                        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
                        url:`http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`
                    })
                })
                return ret;
            }
        },
        components:{
            MusicList
        }
    }
</script>

<style lang="stylus">
    @import "../../common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
