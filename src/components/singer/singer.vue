<template>
    <div class="singer">
        <list-view  :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>

</template>
<script>
    import {url,params,callback,ERR_OK} from "../../api/getSingerList";
    import ListView from "../../base/list-view/list-view"
    import {mapMutations} from "vuex"
    const HOT_NAME = "热门";
    const HOT_SINGER_LEN = 10;
    export default {
        data(){
            return {
                singers:[]
            }
        },
        created(){
            this._getSingerList();
        },
        methods:{
            _getSingerList(){
                this.$http.jsonp(url,{
                    params:params,
                    jsonp:callback
                }).then((res)=>{
                    if(res.data.code == ERR_OK){
                        console.log(res.data.data.list)
                        this.singers = this._normalizeSinger(res.data.data.list);
                        console.log(this.singers)
                    }
                })
            },
            _normalizeSinger(list){
                let map = {
                    hot:{
                        title:HOT_NAME,
                        items:[]
                    }
                }
                list.forEach((item,index)=>{
                    if(index<HOT_SINGER_LEN){
                        map.hot.items.push({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name,
                            avatar:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                        })
                    }

                    const key = item.Findex;
                    if(!map[key]){
                        map[key]={
                            title:key,
                            items:[]
                        }
                    }
                    map[key].items.push({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        avatar:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    });
                });

                //序列列表
                let hot = [];
                let ret = [];
                for(let key in map){
                    let val = map[key];
                    if(val.title.match(/[a-zA-Z]/)){
                        ret.push(val)
                    }else if(val.title == HOT_NAME){
                        hot.push(val)
                    }
                }
                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0)-b.title.charCodeAt(0)
                })
                return hot.concat(ret);

            },
            selectSinger(singer){
                this.setSinger(singer);
                this.$router.push({
                    path:`/singer/${singer.id}`
                })
            },
            ...mapMutations({
                setSinger:"SET_SINGER"
            })
        },
        components:{
            ListView
        }
    }
</script>
<style lang="stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
