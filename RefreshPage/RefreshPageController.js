({
    // Called when the component is initialized.
    // Subscribes to the channel and displays a toast message.
    // Specifies an error handler function for empApi   
    onInit: function (component, event, helper) {
        component.set('v.subscription', null);
        
        // Get empApi component.
        const empApi = component.find('empApi');

        // Define an error handler function that prints the error to the console.
        const errorHandler = function (message) {
            console.error('Received error ', JSON.stringify(message));
        };

        // Register empApi error listener and pass in the error handler function.
        empApi.onError($A.getCallback(errorHandler));
        helper.subscribe(component, event, helper);
        helper.displayToast(component, 'success', 'Ready to receive request to refresh page.');
    },

    publish: function (component, event, helper) {
        var action = component.get('c.PublishPlatformEvent');
        action.setCallback(component,
            function(response) {
                var state = response.getState();
                if (state === 'SUCCESS'){
                    console.log('Event published');
                } else {
                     console.log('Event NOT published');
                }
            }
        );
        $A.enqueueAction(action);
    },

  })