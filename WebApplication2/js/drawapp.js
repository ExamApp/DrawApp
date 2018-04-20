
(function (window) {
    var AFCDraw = typeof AFCDraw != 'undefined' ? AFCDraw : {};

    AFCDraw.Service = new (function () {
        var instance;
        var init = function () {
            //------------------------------------------------- Draw Service ---------------------------------------------------
            return {
                variables: {
                    baseUrl: '/',
                    PotUrl: '/server/potresponse.json',
                },
                getPotDetails: function (onCallBack) {
                      $.ajax({
                        url: $AFCDrawService.variables.PotUrl,
                        type: 'GET',
                        cache: false,
                        datatype: "jsonp",
                        contentType: "application/json",
                        async: true,
                        success: function (data) {

                            if (typeof onCallBack !== undefined && typeof onCallBack === "function")
                                onCallBack(data);
                        },
                        error: function (err) {
                           
                        }
                    });  
                }
            };
        };
        return {
            getInstance: function () {
                if (!instance) {
                    instance = init();
                }

                return instance;
            }
        };
    });
    window.$AFCDrawService = AFCDraw.Service.getInstance();
})(window);

var DrawServiceVw = {
        
    GetPotDetails: function()
    {
         $AFCDrawService.getPotDetails(DrawServiceVw.GetPotDetails_CallBack);
    },
    GetPotDetails_CallBack: function(response)
    {
        var potData = response.P;
        $("#potTemplate").tmpl(potData).appendTo("#potContainer");
    }

};



