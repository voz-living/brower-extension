export default function wideScreen(settingStorage){
    settingStorage.get("wideScreen", true).then((isWideScreen) => {
    // or var isWideScreen = await settingStorage.get("wideScreen", true);
        if(!isWideScreen) return;
        $(".page").css({
            width: "100%",
            maxWidth:"5000px"
        });
    });
}
