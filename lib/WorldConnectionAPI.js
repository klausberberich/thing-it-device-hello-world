/**
 * This is a class that pretends to find
 * worlds, similar to how many lower level
 * device APIs work. It essentially allows our
 * HelloWorld class to register for the event
 * a world is found.
 */
function WorldConnectionAPI() {

    WorldConnectionAPI.searchWorlds = function (callback){
        setTimout(function(){
            callback({id: "venus", name: "Venus"});
        }, Math.random(10000));

        setTimout(function(){
            callback({id: "earth", name: "Earth"});
        }, Math.random(10000));

        setTimout(function(){
            callback({id: "mars", name: "Mars"});
        }, Math.random(10000));
    };
}
