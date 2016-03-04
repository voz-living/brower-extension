import BaseModule from "core/base-module"

export default class ModuleAdsRemove extends BaseModule{
    constructor(){
        super();
    }

    onDOMReady(){
        super.onDOMReady();
        if ($(".middleads+table > tbody > tr > td:eq(1) [id^=div-gpt-ad]").length > 0) {
                $(".middleads+table > tbody > tr > td:eq(1)").remove();
            }
        $(".middleads+div > table > tbody > tr > td:eq(1)").remove();
        $("[id^=div-gpt-ad]").hide();
        $("[id^=google_ads_div],.middleads").hide();

        $(".page > div > div:eq(0)").append("<a href='/showthread.php?t=4725010' style='text-align:center; font-size:18px;display: block; color: green;'>Chung tay report page ngôn tình</a>")

        // should have an option here
        $(".page").css({
            width: "100%",
            maxWidth:"5000px"
        });
    }
}
