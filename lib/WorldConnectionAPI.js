/**
 * This is a class that pretends to find
 * worlds, similar to how many lower level
 * device APIs work. It essentially allows our
 * HelloWorld class to register for the event
 * a world is found.
 */
function WorldConnectionAPI() {
}

// Return a couple of worlds that were found
// to allow HelloWorld to pick the one it is
// configured for.
WorldConnectionAPI.prototype.searchWorlds = function (callback) {
    setTimeout(function () {
        callback({id: "venus", name: "Venus"});
    }, Math.random() * 10000);

    setTimeout(function () {
        callback({id: "earth", name: "Earth"});
    }, Math.random() * 10000);

    setTimeout(function () {
        callback({id: "mars", name: "Mars"});
    }, Math.random() * 10000);
};

// Starting 45s from now, send an event every 15 seconds
WorldConnectionAPI.prototype.registerForEvent = function (world, callback) {

    // starting timer now, send "fire" event every 45s
    setInterval(function () {
        callback({id: "fire", name: "Fire", status: "burning", world: world});
    }, 45000);

    // starting timer in 15s, send "rain" event every 45s
    setTimeout(function () {
        setInterval(function () {
            callback({id: "expand", name: "Expand", status: "growing", world: world});
        }, 45000);

    }, 15000);

    // starting timer in 30s, send "hide" event every 45s
    setTimeout(function () {
        setInterval(function () {
            callback({id: "hide", name: "Hide", status: "Hiding", world: world});
        }, 45000);

    }, 30000);
}

module.exports = WorldConnectionAPI;
