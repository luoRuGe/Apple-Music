import Vue from 'vue';
import VueRouter from 'vue-router';

import Search from "../components/search/search"
import Recommend from "../components/recommend/recommend"
import Rank from "../components/rank/rank"
import Singer from "../components/singer/singer"
import SingerDetail from "../components/singer-detail/singer-detail"

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/recommend"
        },
        {
            path:"/recommend",
            component:Recommend
        },
        {
            path:"/singer",
            component:Singer,
            children:[
                {
                    path:":id",
                    component:SingerDetail
                }
            ]
        },
        {
            path:"/rank",
            component:Rank
        },
        {
            path:"/search",
            component:Search
        }
    ]
})




