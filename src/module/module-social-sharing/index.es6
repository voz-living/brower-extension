import BaseModule from "core/base-module"
import VozLiving from "content/runtime"

export default class ModuleSocialSharing extends BaseModule{
    constructor(){
        super();
        this.fb_requirements = null;
    }

    init(){
    	$("[id^='td_post_']").each(function(){
            var $this = $(this);
            var id = $this.attr("id").match(/\d+/)[0];
            var href = location.href+"#post_message_"+id;
            var shrBtn = $('<div class="fb-share-button" data-href="'+href+'" data-type="icon_link" data-layout="button_count"></div>&nbsp;');
            var controls = $this.find(">div:last");
            if(controls.length > 0){
                controls.prepend(shrBtn);
            }
        });

        this.fb_requirements = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=354069784734041";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
    	$(document.body).prepend(this.fb_requirements);
    }

    onDOMReady(){
        super.onDOMReady();

        if(VozLiving.isThreadPage) this.init();
    }
}