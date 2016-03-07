import BaseModule from "core/base-module"
import ThreadPreview from "./component-thread-preview"

export default class ModuleThreadReview extends BaseModule{
    constructor(){
        super();

        this.threads = [];
        this.mounted = false;
        this.vm = [];
    }

    mountPreviews(){
        var self = this;

        if(this.threads.length > 0)
            _.each(this.threads, (thread) => {
                thread.$element.append(`<div class='mount-${thread.id}'></div>`);
                var mount = thread.$element.find(`.mount-${thread.id}`);
                var threadPreview = new ThreadPreview({
                    data: { id: thread.id, lastPage: thread.pageNum },
                    events: {
                        closeOtherPreview: function(){
                            _.each(self.vm, (cvm) => {
                                if(cvm._uid != this._uid && cvm.show) cvm.close();
                            });
                        }
                    }
                });
                threadPreview.$mount(mount[0]);
                this.vm.push(threadPreview);
            });
    }

    getThreads(){
        var titleList = $("#threadslist tbody[id^='threadbits_forum'] tr td[id^='td_threadtitle_']");

        this.threads = _.map(titleList, (tdTitle) => {
            var $tdTitle = $(tdTitle);
            var id = $tdTitle.attr("id").match(/\d+/)[0];
            var pages = $tdTitle.find(">div span > a");
            var lastPageHref = pages.eq(pages.length - 1).attr("href");
            var lastPage = 1;

            if(lastPageHref) {
                var match = lastPageHref.match(/&page=(\d+)/);
                if(match) lastPage = match[1];
            }

            return { id, pageNum: parseInt(lastPage, 10), $element: $tdTitle };
        });
    }

    onDOMReady(){
        super.onDOMReady();
        this.getThreads();
        this.mountPreviews();
    }
}
