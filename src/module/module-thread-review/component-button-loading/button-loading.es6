var ButtonLoading = Vue.extend({
    props: {
        loading: {
            default: false
        },
        disable: {
            default: false
        },
        _className: {
            default: 'btn-loading',
            type: String
        }
    },
    template: require("./button-loading.html"),
	attached: function(){
        require("./style.less");
    }
});

export default ButtonLoading