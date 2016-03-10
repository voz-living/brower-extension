var ComponentBarItem = Vue.extend({
    props: ['faIcon','linkTarget'],
    data: () => {
        return {
            badgeNum: 0
        }
    },
    template: require("./template.html"),
    attached: function(){
        require("./style.less");
    },
    created: function(){
        this.$on("selected", () => {
            if(this.$children.length > 0){
                this.$children[0].$emit("selected")
            }
        })
    }
});

export default ComponentBarItem
