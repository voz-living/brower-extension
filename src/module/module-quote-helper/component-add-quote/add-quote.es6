import http from "service/http"

var AddQuote = Vue.extend({
    data: function(){
        return {
            editor: null,
            href: null
        }
    },
    methods: {
        getQuotes: async function(){
            this.editor.val("Đang xử lý...");
            var response = await http.get(this.href);
            var text = $(response).find("#vB_Editor_001_textarea").val();
            this.editor.val(text);
        },
        clearQuotes: function(){
            Cookie.set('vbulletin_multiquote', '');
            $("[src='https://vozforums.com/images/buttons/multiquote_on.gif']")
                .attr("src","https://vozforums.com/images/buttons/multiquote_off.gif");
        }
    },
    template: require("./add-quote.html"),
	attached: function(){
        require("./style.less");
    }
});

export default AddQuote