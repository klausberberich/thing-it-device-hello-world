/**
 * This test file allows to run the basic initiation of the
 * HellowWorld class. It does not, however, simulate full
 * interaction with the node.
 */

var HelloWorld = require('../HelloWorld');

var helloWorld = HelloWorld.create({});

helloWorld.isSimulated = function () {
    return false;
};
helloWorld.configuration = {
    simulated: false,
    worldName: "Earth",
    loopInterval: 5000
};
helloWorld.publishEvent = function(event, data){
    console.log("Event", event);
};
helloWorld.publishStateChange = function(){
    console.log("State Change", this.getState());
};
helloWorld.logInfo = function(){
    if (arguments.length == 1 ) {
        console.log(arguments[0]);
    }
    else{
        console.log(arguments);
    }
}
helloWorld.logDebug = function(){
    helloWorld.logInfo(arguments);
}
helloWorld.logError = function(){
    helloWorld.logInfo(arguments);
}

console.log("About to start");
helloWorld.start();

// test stopLoop invocation via UI every 12s
setInterval(function(){
    helloWorld.stopLoop();
},12000);

// test startLoop invocation via UI every 8s, delayed by 12s
setTimeout(function (){
    setInterval(function(){
        helloWorld.startLoop();
    },8000);
}, 12000);

// test sayHello invocation via UI every 17s
setInterval(function(){
    helloWorld.sayHello();
},17000);

// test sayWorld invocation via UI every 16s
setInterval(function(){
    helloWorld.sayWorld();
},16000);

// test sayHello invocation via UI every 9s
setInterval(function(){
    helloWorld.sayHelloWorld();
},9000);

