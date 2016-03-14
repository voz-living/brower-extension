import BaseModule from "core/base-module"

export default class ModuleLinkProcess extends BaseModule{
    constructor(){
        super();
    }

    onDOMReady(){
        super.onDOMReady();

        if(window.__VOZLIVING &&
            window.__VOZLIVING.isThreadPage){
            proccessLink($('body'));
        }
    }
}

export function proccessLink($html, isThreadContentOnly=false){
	replaceLinks($html);
	removeRedirect($html);
	resolveImage($html, isThreadContentOnly);
	resolveYoutube($html, isThreadContentOnly);
}

export function replaceLinks($html){
	$html.find("[id^='post_message_']").each(function() {
        var $this = $(this);
        var nodes = $this.contents();
        var subnodes = $this.find("*:not(a)").contents().filter(function() {
            return this.nodeType === 3;
        });

        _.each(nodes, (node) => {
        	if (node.nodeType === 3)
        		replaceTextWithLink(node);
        });

       	_.each(subnodes, (snode) => {
        	if (snode.parentNode.nodeName.toLowerCase() !== "a")
        		replaceTextWithLink(snode);
        });
    });
}

export function replaceTextWithLink(node){
	if(/(?=[^ ])(h *t *t *p *: *\/ *\/ *)?(([a-zA-Z0-9-\.]+\.)?[a-zA-Z0-9-]{3,}\.(com|net|org|us|info|vn|com\.vn|net\.vn|gov\.vn|edu|edu\.vn)(\/)?([^\s\[]+)?)(?=\s|$|\[)/.test($(node).text())){
        var replacement = $(node).text().replace(/(?=[^ ])(h *t *t *p *: *\/ *\/ *)?(([a-zA-Z0-9-\.]+\.)?[a-zA-Z0-9-]{3,}\.(com|net|org|us|info|vn|com\.vn|net\.vn|gov\.vn|edu|edu\.vn)(\/)?([^\s\[]+)?)(?=\s|$|\[)/gi, "<a data-type='linkdetected' href='http://\$2' target='_blank'>\$2</a>");
        $(node).before(replacement);
        node.nodeValue = "";
    }
}

export function removeRedirect($html){
	$html.find("a[href*='redirect/index.php']").each(function(){
        var $this = $(this);
        var url = $this.attr("href").match(/\?link=(.*)/)[1];
        var decoded = decodeURIComponent(url);
        $this.attr("href", decoded);
    });
}

export function resolveImage($html, isThreadContentOnly){
	var $context;

	if(isThreadContentOnly){
		$context = $html.find("a");
	}else{
		$context = $html.find("[id^='post_message_'] a");
	}

    $context.each(function() {
        var $this = $(this);
        var href = $this.attr("href");
        if (/\.(jpg|png|gif|bmp|jpeg)$/.test(href)) {
            $this.attr("data-smartlink", "image");
            var $img = $(`<div>
            	<img src='${href}'
            		title='Tự động nhận diện link hình với voz living'/>
        		</div>`);
            return $this.after($img);
        }
    });
}

export function resolveYoutube($html, isThreadContentOnly){
	var $context;

	if(isThreadContentOnly){
		$context = $html.find("a");
	}else{
		$context = $html.find("[id^='post_message_'] a");
	}

	$context.each(function() {
        var $img, $this, href, ytb;
        $this = $(this);
        href = $this.attr("href");
        ytb = href.match(/youtube\.com[^\s]+v=([a-zA-Z0-9_-]+)/i);
        if (ytb === null || ytb.length === 0){
            ytb = href.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
        }
        if (ytb !== null && ytb.length > 0) {
            $this.attr("data-smartlink", "youtube");
            $img = $(`<div><iframe width='560' height='315' src='https://www.youtube.com/embed/${ytb[1]}?rel=0'
            					frameborder='0' allowfullscreen
            					title='Có thể xảy ra sai sót trong việc tự động nhận biết youtube, nếu có xin vui lòng báo lỗi qua pm greans(@vozforum)'>
        					</iframe>
					</div>`);
            $this.after($img);
        }
    });
}
