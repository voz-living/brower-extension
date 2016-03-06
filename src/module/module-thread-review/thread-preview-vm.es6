import http from "service/http"
import templatePreview from  "./thread-preview-template.html"

export default class Thread{
	constructor({ id=null, pageNum=1, title="", $element=null, url="" }){
		this.id = id;
		this.pageNum = pageNum;
		this.title = title;
		this.$element = $element;
		this.url = url;

		this.isPreviewLoaded = false;
		this.mountElement = null;

		if(this.url == '') this.url = this.getPageUrl();
	}

	mountThreadPreview(){
		this.mountElement = this.appendMount();

		this.vue = new Vue({
			el: this.mountElement,
			template: templatePreview,
			data: {
				showContent: 'first',
				contentFirst: null,
				contentLast: null,
				loadingFirst: false,
				loadingLast: false,
				show: false
			},
			methods: {
				togglePreviewFirst: this.togglePreviewFirst.bind(this),
				togglePreviewLast: this.togglePreviewLast.bind(this),
				openNewTab: this.openNewTab.bind(this)
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
					return 'Xem Post cuối';
				},
				content: function(){
					if(this.showContent == 'last') return this.contentLast;
					return this.contentFirst
				}
			}
		});
	}

	openNewTab(){
		window.open(this.url ,'_blank');
	}

	appendMount(){
		this.$element.append(`<div class='mount-${this.id}'></div>`);
		return this.$element.find(`.mount-${this.id}`)[0];
	}

	getPost(response, position='first'){
		return $(response).find(`[id^='post_message']:${position}`).html();
	}

	async togglePreviewFirst(){
		if(!this.vue.contentFirst){
			this.vue.loadingFirst = true;
			this.vue.contentFirst = await this.getPagePreview();
			this.vue.loadingFirst = false;
		}
		if(this.vue.showContent == 'first' || !this.vue.show){
			this.vue.show = !this.vue.show
		}
		this.vue.showContent = 'first';
	}

	async togglePreviewLast(){
		if(!this.vue.contentLast){
			this.vue.loadingLast = true;
			this.vue.contentLast = await this.getPagePreview(this.getPageUrl(this.pageNum), 'last');
			this.vue.loadingLast = false;
		}
		if(this.vue.showContent == 'last' || !this.vue.show){
			this.vue.show = !this.vue.show
		}
		this.vue.showContent = 'last';
	}

	async getPagePreview(url=this.url, position='first'){
		var response = await http.get(url);
		return this.getPost(response, position);
	}

	getPageUrl(page=1){
		return `https://vozforums.com/showthread.php?t=${this.id}&page=${page}`;
	}
}