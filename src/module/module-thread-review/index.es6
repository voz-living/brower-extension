import BaseModule from "core/base-module"
import Thread from "./thread-preview-vm"

export default class ModuleThreadReview extends BaseModule{
    constructor(){
        super();

        this.threads = [];
        this.mounted = false;
    }

    mountPreviews(){
        if(this.threads.length > 0)
            _.each(this.threads, (thread) => thread.mountThreadPreview());
    }

    getThreads(){
        var titleList = $("#threadslist tbody[id^='threadbits_forum'] tr td[id^='td_threadtitle_']");

        this.threads = _.map(titleList, (tdTitle) => {
            var $tdTitle = $(tdTitle);
            var id = $tdTitle.attr("id").match(/\d+/)[0];
            var pages = $tdTitle.find(">div span > a");
            var lastPageHref = pages.eq(pages.length - 1).attr("href");
            var lastPage = 1;
            var title = "";

            if(lastPageHref) {
                var match = lastPageHref.match(/&page=(\d+)/);
                if(match) lastPage = match[1];
            }

            return new Thread({ id, pageNum: parseInt(lastPage, 10), title, $element: $tdTitle });
        });
    }

    onDOMReady(){
        super.onDOMReady();
        require('./style.less');
        this.getThreads();
        this.mountPreviews();
    }
}
