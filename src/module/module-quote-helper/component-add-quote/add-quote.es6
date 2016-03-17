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
            this.editor.attr('disabled', 'disabled');
            var response = await http.get(this.href);
            this.editor.removeAttr('disabled');
            var text = _.trim($(response).find("#vB_Editor_001_textarea").val());
            var selStart = this.editor.prop('selectionStart');
            var selEnd = this.editor.prop('selectionEnd');
            var v = this.editor.val();
            var textBefore = v.substring(0, selStart);
            var textAfter = v.substring(selEnd, v.length);
            this.editor.val(textBefore + text + textAfter);
            this.editor[0].setSelectionRange(selStart + text.length, selStart + text.length);
            this.editor.focus();
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