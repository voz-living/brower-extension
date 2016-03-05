import http from "service/http"
import templateReview from  "./template-review"

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
			template: templateReview,
			data: {
				content: "",
				loading: false,
				show: false
			},
			methods: {
				togglePreview: this.togglePreview.bind(this)
			}
		});
	}

	appendMount(){
		this.$element.append(`<div class='mount-${this.id}'></div>`);
		return this.$element.find(`.mount-${this.id}`)[0];
	}

	getPost(response, position='first'){
		return $(response).find(`[id^='post_message']:${position}`).html();
	}

	togglePreview(){
		if(!this.isPreviewLoaded){
			var self = this;

			this.vue.loading = true;
			http.get(this.url).then((response) => {
				self.vue.content = self.getPost(response);
				self.vue.loading = false;
				this.isPreviewLoaded = true;
			});
		}
		this.vue.show = !this.vue.show;
	}

	getPageUrl(page=1){
		return `https://vozforums.com/showthread.php?t=${this.id}&page=${page}`;
	}
}