var dynamicListener = require('./dynamicListener');

module.exports = function setupDynamicListener(eventSettingsCollection,type,callback){
  // setup direct bindings on dynamic Dom
  for( var i = eventSettingsCollection.length-1; i >= 0; i--){
    eventSettings = eventSettingsCollection[i];
    if(eventSettings.eventHandlerOnElement){
      dynamicListener.register(eventSettings,type,function(eventSettings,event){
        callback(eventSettings,event);
      });

      // TODO: Remove this? It's for optimization but it makes things brittle and difficult to understand.
      eventSettingsCollection.splice(i,1);
    }
  }
};
