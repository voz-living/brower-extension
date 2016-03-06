var VozLiving = require("content/runtime");
import ModuleAdsRemove from "module/module-ads-remove"
import ModuleThreadReview from "module/module-thread-review"
import ModuleQuoteNoti5 from "module/quote-noti5"
import ModuleTopBar from "module/module-top-bar"

VozLiving.loadModules(
	ModuleAdsRemove,
	ModuleTopBar,
	ModuleThreadReview,
	ModuleQuoteNoti5
);
