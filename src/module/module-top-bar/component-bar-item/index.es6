var ComponentBarItem = Vue.extend({
    props: ['faIcon'],
    template: require("./template.html"),
    attached: function(){
        require("./style.less");
    }
});

export default ComponentBarItem
