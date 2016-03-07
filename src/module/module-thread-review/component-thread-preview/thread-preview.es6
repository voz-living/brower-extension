import http from "service/http"

var ThreadPreview = Vue.extend({
    data: function(){
    	return {
	    	showContent: 'first',
			contentFirst: null,
			contentLast: null,
			loadingFirst: false,
			loadingLast: false,
			show: false,
			url: "",
			id: null,
			lastPage: 1
	    }
    },
    template: require("./thread-preview.html"),
    methods: {
    	togglePreviewFirst: async function(){
    		if(!this.contentFirst){
				this.loadingFirst = true;
				this.contentFirst = await this.getPagePreview();
				this.loadingFirst = false;
			}
			if(this.showContent == 'first' || !this.show){
				this.show = !this.show
			}
			this.showContent = 'first';
			this.$emit('closeOtherPreview');
    	},
		togglePreviewLast: async function(){
			if(!this.contentLast){
				this.loadingLast = true;
				this.contentLast = await this.getPagePreview(this.getPageUrl(this.pageNum), 'last');
				this.loadingLast = false;
			}
			if(this.showContent == 'last' || !this.show){
				this.show = !this.show
			}
			this.showContent = 'last';
			this.$emit('closeOtherPreview');
		},
		openNewTab: function(){
			window.open(this.url ,'_blank');
		},
		getPagePreview: async function(url, position='first'){
			var response = await http.get(url || this.url);
			return this.getPost(response, position);
		},
		getPageUrl: function(page=1){
			return `https://vozforums.com/showthread.php?t=${this.id}&page=${page}`;
		},
		getPost: function(response, position='first'){
			return $(response).find(`[id^='post_message']:${position}`).html();
		},
		close: function(){
			this.show = false;
		}
    },
	computed: {
		textOpenPreview: function(){
			if(this.showContent == 'first'){
				if(this.loadingFirst) return 'Đang tải';
				if(this.show) return 'Đóng';
			}
			return 'Xem trước thớt';
		},
		textOpenPreviewLast: function(){
			if(this.showContent == 'last'){
				if(this.loadingLast) return 'Đang tải';
				if(this.show) return 'Đóng';
			}
			return 'Xem post cuối';
		},
		content: function(){
			if(this.showContent == 'last') return this.contentLast;
			return this.contentFirst
		}
	},
	created: function(){
		this.url = this.getPageUrl();
	},
	attached: function(){
        require("./style.less");
    }
});

export default ThreadPreview