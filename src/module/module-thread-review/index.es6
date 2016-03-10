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

        if(this.threads.length > 0){
            $('<td class="thead" width="20"><span>Preview</span></td>').insertAfter($("#threadslist tbody tr td.thead").eq(1));

            _.each(this.threads, (thread) => {
                thread.$element.append(`<div class='mount-${thread.id}'></div>`);
                var tdButton = $(`<td class='mount-button-td mount-button-${thread.id}'>
                        <div class='btn-preview'>
                            <i class="fa fa-eye"></i>
                        </div>
                        <div class='btn-view-last-post'>
                            <i class="fa fa-fast-forward"></i>
                        </div>
                        <div class='btn-open-new-tab'>
                            <i class="fa fa-share"></i>
                        </div>
                    </td>`).insertAfter(thread.$element);
                var mount = thread.$element.find(`.mount-${thread.id}`);
                var threadPreview = new ThreadPreview({
                    data: { id: thread.id, pageNum: thread.pageNum, controlTd: tdButton },
                    events: {
                        closeOtherPreview: function(){
                            _.each(self.vm, (cvm) => {
                                if(cvm._uid != this._uid && cvm.show) cvm.close();
                            });
                        }
                    }
                });
                $('div.btn-preview', tdButton).on('click', threadPreview.viewFirstPost);
                $('div.btn-open-new-tab', tdButton).on('click', threadPreview.openNewTab);
                $('div.btn-view-last-post', tdButton).on('click', threadPreview.viewLastPost);
                threadPreview.$mount(mount[0]);
                this.vm.push(threadPreview);
            });
        }
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
