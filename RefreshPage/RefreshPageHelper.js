({
    // Client-side function that invokes the subscribe method on the empApi component.
    subscribe: function (component, event, helper) {
        // Get the empApi component.
        const empApi = component.find('empApi');

        // Get the channel from the attribute.
        const channel = component.get('v.channel');
        
        // Subscription option to get only new events.
        const replayId = -1;
        
        // Callback function to be passed in the subscribe call.
        // After an event is received, this callback prints the event
        // payload to the console. A helper method displays the message in the console app.
        const callback = function (message) {
            console.log('Event Received : ' + JSON.stringify(message));
            //$A.get('e.force:refreshView').fire();
            helper.refresh(component, event, helper);
        };

        // Subscribe to the channel and save the returned subscription object.
        empApi.subscribe(channel, replayId, $A.getCallback(callback)).then($A.getCallback(function (newSubscription) {
            console.log('Subscribed to channel ' + channel);
            component.set('v.subscription', newSubscription);
        }));

  },

  refresh: function(component, event, helper) {
    console.log('refresh called');
        // Get the record ID attribute
        var record = component.get("v.recordId");
        
        // Get the Lightning event that opens a record in a new tab
        var redirect = $A.get("e.force:navigateToSObject");
        
        // Pass the record ID to the event
        redirect.setParams({
            "recordId": record
        });
            
        // Open the record
        redirect.fire();
  },

  // Displays the given toast message.
  displayToast: function (component, type, message) {
    const toastEvent = $A.get('e.force:showToast');
    toastEvent.setParams({
        type: type,
        message: message
    });
    toastEvent.fire();
  }

})