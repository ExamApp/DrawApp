var pot1 = [
    ["101","Brazil"],
    ["102","Denmark"],
    ["103","Norway"],
    ["104","Chillie"],
    ["105","Germany"],
    ["106","England"]
];

FillPot = function(team, group){

     var _id = -1;
     if(team == "Brazil") _id= 101;
      if(team == "Norway") _id= 103;

     var selVal =   $("#t-"+ _id).text();


    setTimeout(function(){
      $("#t-"+_id).addClass("pot_team_animate");
    }, 1000);

    //step2
    setTimeout(function(){
        $("#"+group).addClass("pot_team_animate");

        setTimeout(function(){
                $("#"+group).text(selVal).addClass("pot_group_done");    //.effect( "shake", "slow" );;

                //restore
                 setTimeout(function(){
                    $("#t-"+_id).addClass("pot_team_done");
                    }, 1000);

            }, 1000);

    }, 6000);

    

}