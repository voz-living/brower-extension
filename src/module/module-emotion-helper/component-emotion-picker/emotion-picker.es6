import emotions from "./emotions";

var EmotionPicker = Vue.extend({
	data: function(){
		return {
			emotions: emotions,
			editor: null
		}
	},
	methods: {
		prepareEmotionUrl: function(url){
			if(url.indexOf('http') > -1) return '';
			if(url.charAt(0) != "/") url = "/" + url;
			return "https://vozforums.com" + url;
		},
		choseEmotion: function(emotion){
			var smilieText = emotion.text;
            var v = this.editor.val();
            var selStart = this.editor.prop('selectionStart');
            var selEnd = this.editor.prop('selectionEnd');
            var textBefore = v.substring(0, selStart);
            var textAfter = v.substring(selEnd, v.length);
            this.editor.val(textBefore + smilieText + textAfter);
            this.editor[0].setSelectionRange(selStart + smilieText.length, selStart + smilieText.length);
            this.editor.focus();
		}
	},
	template: require("./emotion-picker.html"),
	attached: function(){
		require("./style.less");
	}
});

export default EmotionPicker;