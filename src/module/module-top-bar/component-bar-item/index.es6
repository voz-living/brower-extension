var ComponentBarItem = Vue.extend({
    props: ['faIcon','linkTarget'],
    data: () => {
        return {
            badgeNum: 1
        }
    },
    template: require("./template.html"),
    attached: function(){
        require("./style.less");
    },
    created: function(){

    }
});

export default ComponentBarItem
