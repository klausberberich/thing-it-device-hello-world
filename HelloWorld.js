/**
 * The module exports are used by the [thing-it-node].
 * the first couple before state are mandatory for the device.
 *
 * State will be shown in many default screens and can very easily
 * be accessed in the HTML UI and other places.
 *
 * Services will be exposed in UIs as invocable by the user
 * and they will be exposed for orchestration.
 *
 * Configuration will be displayed when adding a device
 * on www.thing-it.com and in allows the device to access
 * the users' values during device creation on www.thing-it.com
 *
 */

module.exports = {
    metadata: {
        family: "helloworld",
        plugin: "helloworld",
        label: "Hello World",
        tangible: true,
        discoverable: true,
        state: [{
            id: "aText",
            label: "Text",
            type: {
                id: "string"
            }
        }, {
            id: "anInteger",
            label: "Integer",
            type: {
                id: "integer"
            }
        }, {
            id: "looping",
            label: "Looping",
            type: {
                id: "boolean"
            }
        }],
        actorTypes: [],
        sensorTypes: [],
        services: [{
            id: "sayHello",
            label: "Say Hello"
        }, {
            id: "sayWorld",
            label: "Say World"
        }, {
            id: "sayHelloWorld",
            label: "Say Hellow World"
        }, {
            id: "startLoop",
            label: "Start Loop"
        }, {
            id: "stopLoop",
            label: "Stop Loop"
        }],
        configuration: [{
            id: "simulated",
            label: "Simulated",
            type: {
                id: "boolean"
            }
        }, {
            id: "worldName",
            label: "World Name",
            type: {
                id: "string"
            }
        }]
    },

    /**
     * Invoked during start up to create the instance of 
     * HelloWorld for this specific device.
     * 
     */
    create: function (device) {
        return new HelloWorld();
    },

    /**
     * Discovery is an advanced function we don't need
     * for our Hello World example.
     *  
     */
    discovery: function (options) {
        var discovery = new HelloWorldDiscovery();
        discovery.options = options;
        return discovery;
    }
};

var q = require('q');
var WorldConnectionAPI;

/**
 * Discovery is an advanced function we don't need
 * for our Hello World example.
 *
 */
function HelloWorldDiscovery() {
    /**
     *
     */
    HelloWorldDiscovery.prototype.start = function () {
    };

    /**
     *
     */
    HelloWorldDiscovery.prototype.stop = function () {
    };
}

/**
 * This is our main class that we will use from here. An
 * instance of this class will follow us through all of
 * the code. It inherits a couple of things from the base
 * device class of the [thing-it-node] which will be pointed
 * out.
 */
function HellowWorld() {

    /**
     * This function is called on start of the device. Everyting starts here.
     * It is mandatory to have this function. After that you can basically
     * do what you want.
     *
     * Typical tasks performed here are:
     * - Initializing state values
     * - Scanning for a device
     * - Initializing simulation mode
     * - Loading dependencies
     *
     */
    HelloWorld.prototype.start = function () {
        var deferred = q.defer();

        // Initialize state values
        this.state = {
            aText: null,
            anInteger: 0,
            looping: false
        };

        this.logDebug("Hello World state: " + JSON.stringify(this.state));


        // Check for simulated mode. Simulated mode is typically used
        // to showcase how a device functions and operates with other
        // devices without the need to actually connect to such a device.
        // Simulations will also be executed on www.thing-it.com and
        // allow displaying the functionality in views like the Switchboard
        // or the mobile UI.
        if (!this.isSimulated()) {
            this.logInfo("Starting up HelloWorld.");

            // Loading these dependencies only in "real" mode makes the
            // simulation leaner and easier to run and test.
            if (!WorldConnectionAPI) {
                WorldConnectionAPI = require("../WorldConnectionAPI");
            }

            // Scan for the presence of the device.
            // There is no need to call the function scan - from here on
            // you're on your own with how you'd like your device to operate
            // Check many of the code examples in other plugins.
            this.scan();
            deferred.resolve();
        } else {
            this.logInfo("Starting up simulated HelloWorld.");
            deferred.resolve();

            // If in simulation mode, start up the device as such.
            // There is no need to call the function initiateSimulation - from here on
            // you're on your own with how you'd like your device to simulate
            // Check many of the code examples in other plugins.
            this.initiateSimulation();
        }

        return deferred.promise;
    };

    /**
     * In our HelloWorld example there isn't much to connect to.
     * We will use the setTimeout function to pretent we get a
     * connection a few seconds after scan is invoked.
     *
     * This is usually where a lower level library is invoked
     * that scans for the actual device and tries to connect.
     *
     * Notice the first use of a configuration value, in this case worldName.
     * This configuration value will be the value a user entered on
     * www.thing-it.com during device setup.
     *
     * In this example we will allow to connect in the non-sumlated / real mode
     * against one of the worlds:
     * - Venus
     * - Earth
     * - Mars
     *
     * Simulation mode will allow to connect against any world.
     */
    HelloWorld.prototype.scan = function () {
        this.logInfo("Scanning for World " + this.configuration.worldName + " started.");

        // Connect to a search API. In our simplified example
        // this API will call the callback once per world for
        // a total duration of up to 10 seconds with the earth values.
        WorldConnectionAPI.searchWorlds(function (world) {
            var deferred = q.defer();

            // Check whether the world found matches this device
            if (world == this.configuration.worldName){
                this.logInfo("Found matching world with name ", world.name, " and with ID ", word.id, ".");
                this.world = world;
                // If it is found, connect the device.
                // This is another function that isn't required
                // but commonly used.
                this.connect();
            }
            else{
                this.logInfo("Found non-matching world with name ", world.name, " and with ID ", word.id, ".");
            }

            deferred.resolve();
            return deferred.promise;
        }.bind(this));
    };


    /**
     *
     */
    HelloWorld.prototype.connect = function () {
        this.state = {
            aText: this.world.id + ": " + this.world.name,
            anInteger: aText.length,
            looping: false
        };

        this.sayHelloWorld();
    }

    /**
     * Use of this.publishStateChange will push the change
     * to aText up to any UI using this value.
     * It's an inherited method from the device super
     * object.
     */
    HelloWorld.prototype.sayHello = function(){
        this.aText = "Hello";
        this.logInfo(this.aText);
        this.publishStateChange();
    }

    /**
     * Use of this.publishStateChange will push the change
     * to aText up to any UI using this value.
     * It's an inherited method from the device super
     * object.
     */
    HelloWorld.prototype.sayWorld = function(){
        this.aText = this.world.name;
        this.logInfo(this.aText);
        this.publishStateChange();
    }

    /**
     * Use of this.publishStateChange will push the change
     * to aText up to any UI using this value.
     * It's an inherited method from the device super
     * object.
     */
    HelloWorld.prototype.sayHello = function(){
        this.aText = "Hello " + this.world.name;
        this.logInfo(this.aText);
        this.publishStateChange();
    }

    /**
     *
     */
    HelloWorld.prototype.startLoop = function(){
        //TODO
    }

    /**
     *
     */
    HelloWorld.prototype.stopLoop = function(){
        //TODO
    }

    /**
     *
     */
    HelloWorld.prototype.setState = function (state) {
        this.state = state;

        this.publishStateChange();
    };

    /**
     *
     */
    HelloWorld.prototype.getState = function () {
        return this.state;
    };


    /**
     *
     *
     */
    HelloWorld.prototype.initiateSimulation = function(){
    }

}
