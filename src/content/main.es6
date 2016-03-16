var VozLiving = require("content/runtime");
import ModuleMisc from "module/module-misc"
import ModuleThreadReview from "module/module-thread-review"
import ModuleQuoteNoti5 from "module/quote-noti5"
import ModuleTopBar from "module/module-top-bar"
import ModuleLinkProcess from "module/module-link-process"
import ModuleEmotionHelper from "module/module-emotion-helper"
import ModuleQuoteHelper from "module/module-quote-helper"

VozLiving.loadModules(
	ModuleMisc,
	ModuleTopBar,
	ModuleThreadReview,
	ModuleQuoteNoti5,
	ModuleLinkProcess,
	ModuleEmotionHelper,
	ModuleQuoteHelper
);
