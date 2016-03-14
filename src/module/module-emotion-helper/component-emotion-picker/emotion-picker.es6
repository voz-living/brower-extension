import emotions from "./emotions";

console.log(emotions)

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
        }
    },
    template: require("./emotion-picker.html"),
	attached: function(){
        require("./style.less");
    }
});

export default EmotionPicker;