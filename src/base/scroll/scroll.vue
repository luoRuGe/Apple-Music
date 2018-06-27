<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
    import BScroll from "better-scroll";
    export default {
        mounted(){
            setTimeout(()=>{
                this._initScroll()
            },20)
        },
        methods:{
            _initScroll(){
                if(this.$refs.wrapper){
                    return;
                }
                new BScroll(this.$refs.wrapper,{
                    click:true,
                    probeType:1
                })
            }
        }
    }
</script>
