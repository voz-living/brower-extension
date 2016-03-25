module.exports = {
    wideScreen: {
        def: true
    },
    quoteNoti5Active: {
        def: true
    },
    quoteNoti5Interval:{
        def: 20,
        validateOnInput: function (val){
            try{
                val = parseInt(val)
                if(!_.isNumber(val)) val = 30;
                if(val > 120) val = 120;
                if(val < 10) val = 10;
            }catch(e){
                val = 30;
            }finally{
                return val;
            }
        }
    },
    threadPreview: {
        def: true
    },
    socialSharing: {
        def: false
    }
}
