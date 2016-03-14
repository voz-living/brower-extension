import http from "service/http"
import ButtonLoading from "../component-button-loading"
import {proccessLink} from "../../module-link-process"

var ThreadPreview = Vue.extend({
    data: function(){
    	return {
			show: false,
			url: "",
			id: null,
			pageNum: 1,
			currentPostIndex: null,
			currentPageIndex: null,
			currentHtmlViewPosts: null,
			firstPageHtml: null,
			lastPageHtml: null,
			controlDisable: false,
			controlTd: null
	    }
    },
    components: {
        "button-loading": ButtonLoading
    },
    template: require("./thread-preview.html"),
    methods: {
    	openAndViewFirst: function(){
    		if(this.show) return this.close();
    		this.viewFirstPost();
			this.$emit('closeOtherPreview');
    	},
    	viewFirstPost: function(){
    		if(this.currentPageIndex != 0 
    			|| this.currentHtmlViewPosts == null){
    			this.currentPageIndex = 0;
    			this.currentPostIndex = 0;
    			this._getCurrentPost();
    		}else{
    			this.currentPostIndex = 0;
    			this.open();
    		}
    	},
    	viewLastPost: function(){
    		if(this.currentPageIndex != this.pageNum - 1){
    			this.currentPageIndex = this.pageNum - 1;
	    		this.currentPostIndex = 'last';
	    		this._getCurrentPost();
    		}else{
    			this.currentPostIndex = this.currentHtmlViewPosts.length - 1;
    			this.open();
    		}
    	},
		openNewTab: function(){
			window.open(this.url ,'_blank');
		},
		close: function(){
			this.show = false;
			this.controlTd.removeClass('active')
		},
		open: function(){
			this.show = true;
			this.controlTd.addClass('active')
		},
		nextPost: async function(){
			var postNum = this.currentHtmlViewPosts.length;

			if(this.currentPageIndex == this.pageNum - 1 
				&& this.currentPostIndex == postNum - 1) return;
			
			if(this.currentPostIndex < postNum - 1){
				this.currentPostIndex += 1;
			}else if(this.currentPostIndex == postNum - 1){
				this.currentPageIndex += 1;
				this.currentPostIndex = 0;
				await this._getCurrentPost();
			}
		},
		prevPost: async function(){
			if(this.currentPageIndex == 0
				&& this.currentPostIndex == 0) return;
			if(this.currentPostIndex > 0){
				this.currentPostIndex -= 1;
			}else if(this.currentPostIndex == 0){
				this.currentPageIndex -= 1;
				this.currentPostIndex = 'last';
				await this._getCurrentPost();
			}
		},
		_getCurrentPost: async function(){
    		this.controlDisable = true;
			await this._loadPost(this.currentPageIndex, this.currentPostIndex)
			this.controlDisable = false;
			this.open();	
		},
		_loadPost: async function(pageIndex, postIndex){
    		var response = await this._getPageByIndex(pageIndex);
			if(response == null) return;
			
			this.currentHtmlViewPosts = $(response).find(`[id^='post_message']`);
			
			if(postIndex == 'last'){
				this.currentPostIndex = this.currentHtmlViewPosts.length - 1;
			}else{
				this.currentPostIndex = postIndex;
			}
    	},
		_getPageUrl: function(page=1){
			return `https://vozforums.com/showthread.php?t=${this.id}&page=${page}`;
		},
		_getPostByIndex: function(index){
			if(typeof(this.currentHtmlViewPosts) == 'string'){
				this.currentHtmlViewPosts = $(this.currentHtmlViewPosts).find(`[id^='post_message']`);
			}
			return this.currentHtmlViewPosts.eq(index).html();
		},
		_getPageByIndex: async function(index){
			if(index < this.pageNum){
				var response = await http.get(this._getPageUrl(index + 1));
				return response;
			}
			return null;
		}
    },
	computed: {
		content: function(){
			if(this.currentPageIndex != null 
				&& this.currentHtmlViewPosts != null){
				var $html = this.currentHtmlViewPosts.eq(this.currentPostIndex);
					proccessLink($html, true);
					$html = $html.html();
					$html = $html.replace(/(<!--.*-->)/g, '');
				return $html;
			}
			return '';
		}
	},
	created: function(){
		this.url = this._getPageUrl();
	},
	attached: function(){
        require("./style.less");
    }
});

export default ThreadPreview