if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  presentaciones = new Mongo.collection('presentaciones');

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.helpers({
    presentaciones: function(){return presentaciones.find(), {sort: {fecha_creacion: -1}}}
  });

  Template.body.events({
     crear_presentacion: function(){

     }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
