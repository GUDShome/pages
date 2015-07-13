$(function () {
    $("#load").hide();
    $(".results").hide();

	var actors = [];
    var set = [];


     $('#add').click(function(e){
         $( ".results p" ).empty();
         $("#load").show();
         $('.actor').each(function(i) {
            actors[i] = $(this).val();
            var encode = encodeURIComponent(actors[i]);
            $.ajax({
                type: 'GET',
                url: 'https://jsonp.afeld.me/?url=http%3A%2F%2Fwww.myapifilms.com%2Fimdb%3Fname%3D' + encode + '%26format%3DJSON%26filmography%3D1%26limit%3D1%26lang%3Den-us%26exactFilter%3D0%26bornDied%3D0%26starSign%3D0%26uniqueName%3D0%26actorActress%3D0%26actorTrivia%3D0%26actorPhotos%3DN%26actorVideos%3DN%26salary%3D0%26spouses%3D0%26tradeMark%3D0%26personalQuotes%3D0%2Ffilmography',
                dataType: 'json',
                success: function(resp) {
                    if (resp[0] == undefined) {
                        alert('You entered "' + actors[i] + '". Please enter a valid actor using spaces between names!');
                    } else {
                        set[i] = resp[0].filmographies[0].filmography;
                    }
                }
            });
        });

        $(document).ajaxStop(function() {
            var titles = [];
            for (actor in set) {
                titles[actor] = [];
                for(i=0;i<set[actor].length;i++) {
                    titles[actor].push(set[actor][i].title);
                }
            };

            console.log(set[0]);
            console.log(set[1]);


            var both = intersect(titles[0], titles[1]);
            $("#load").hide();
            $(".results").show();

            if (both.length == 0) {
                $(".results p").append("...unfortunately, nothing! Try another pair!");
            } else {
                for(thing in both) {
                $(".results p").append("- " + both[thing] + "<br>");
                }
            }

            i = 0;
            set = [];
            actors = [];

            titles = [];
            both = [];

        });
    });

    function intersect(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        });
    }



});
