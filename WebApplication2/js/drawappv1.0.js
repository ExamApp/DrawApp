(function (window) {
    var drawApp = angular.module("drawApp", []);

    //draw service
    drawApp.service('drawService', ['$http', function ($http) {

        this.getPots = function () {
            var url = "/server/potresponse.json";
            var data = $http.get(url);

            return data;
        };

        this.getResults = function () {
            var url = "/server/groups_feed.json";
            var data = $http.get(url);

            return data;
        };
    }]);


    drawApp.controller("drawController",
        ['$scope', '$http', 'drawService', function ($scope, $http, drawService) {

            $scope.draw = {};
            $scope.draw.groups = [
                { "id": "0", "abbr": "g-a", "name": "Group - A", "team": [1, 2, 3, 4] },
                { "id": "1", "abbr": "g-b", "name": "Group - B", "team": [1, 2, 3, 4] },
                { "id": "2", "abbr": "g-c", "name": "Group - C", "team": [1, 2, 3, 4] },
                { "id": "3", "abbr": "g-d", "name": "Group - D", "team": [1, 2, 3, 4] },
                { "id": "4", "abbr": "g-e", "name": "Group - E", "team": [1, 2, 3, 4] },
                { "id": "5", "abbr": "g-f", "name": "Group - F", "team": [1, 2, 3, 4] }
            ];

            loadPots();
           // loadLiveResults();

            function loadPots() {
                var promise = drawService.getPots();
                promise.then(function (resp) {
                    $scope.draw.pots = resp.data.P;
                    console.log('pots',$scope.draw.pots);

                }, function (err) {
                    console.log('printing error starts: loadPots');
                    console.log(err);
                    $scope.Message = "Call-Failed";
                });
            }

            function loadLiveResults() {
                var promise = drawService.getResults();
                promise.then(function (resp) {
                    $scope.draw.results = resp.data;
                    console.log('draw.results', $scope.draw.results);

                    ProcessDraw(resp.data);

                }, function (err) {
                    console.log('printing error starts: loadLiveResults');
                    console.log(err);
                    $scope.Message = "Call-Failed";
                });
            }

            ProcessDraw = function (draw) {

                //data.forEach(function (draw) {

                   
                //         var procDraw = {
                //            pot: draw.P,
                //            team: draw.C,
                //            grp: draw.G,
                //            gIdx: draw.O
                //        };

                //         //var timerId = setTimeout(ProcessInstruction(procDraw), 16000);
                         
                //         console.log('ins passed...', timerId);
                    
                //});

                //
                for (var i = 0; i < draw.length; i++) {
                    (function (i) {
                        setTimeout(function () {
                            var curDraw = draw[i];
                            var procDraw = {
                                pot: curDraw.P,
                                team: curDraw.C,
                                grp: curDraw.G,
                                gIdx: curDraw.O
                            };

                            console.log(procDraw);
                            GetFromPot(procDraw);
                        }, 4000 * i);
                    })(i);
                };
                //
            };

            GetFromPot = function (data) {
                var proIns = "P" + data.pot + "_" + data.team + "-" + "G" + data.grp + "_" + data.gIdx;

                //sample: P0_156-G0_3
                console.log('Ins', proIns);

                var elePot = "P" + data.pot + "_" + data.team;
                var eleGrp = "G" + data.grp + "_" + data.gIdx;
                var eleGrpHead = "G" + data.grp;

                console.log("reading ", elePot);
                var teamInSelection = $("#" + elePot + "> span")[1];
                var teamSelectedText = $("#" + elePot + "> span")[1].innerHTML;

                var groupEleInSelection = $("#" + eleGrp + '> span.group_box_index_a2');

                //$("#" + elePot).addClass("pot_team_animate"); //animate POT first
                $(teamInSelection).addClass("pot_team_animate"); //animate POT first
                $('#' + eleGrpHead + '> div.grp_card_teams').addClass("grp_card_animate"); //animate group box 2nd

                //step2
                setTimeout(function () {
                    $(groupEleInSelection).addClass("pot_team_animate"); //animate on group value 
                    $("#" + eleGrp + "> span")[1].innerHTML = teamSelectedText;
                    $('#' + eleGrpHead + '> div.grp_card_teams').removeClass("grp_card_animate"); //remove grp animation
                        //.css("border", "2px solid blue");

                    setTimeout(function () {
                        $("#" + eleGrp).addClass("pot_group_done"); //all done with pot
                        $(groupEleInSelection).removeClass("pot_team_animate");

                    }, 2000);
                }, 2000);

                //step3
                setTimeout(function () {
                    $("#" + elePot).removeClass("pot_team_animate"); // remove pot animation
                    $(teamInSelection).removeClass("pot_team_animate"); //deanimate POT 
                    $("#" + elePot).addClass("pot_team_done"); //set POT elem disabled
                }, 4000);
               
            }
        }]);

})(window);