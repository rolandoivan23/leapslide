presentaciones_coll = new Mongo.Collection("presentaciones_coll");

if (Meteor.isClient) {
  //Meteor.suscribe('cambiar_diapositiva');
  Template.presentaciones_temp.helpers({
    presentaciones: function(){return presentaciones_coll.find({})}
  });

  Template.presentaciones_temp.events({
    'submit .presentaciones-form': function(event){

        nombre = event.target.nombre.value;
        desc = event.target.descripcion.value;
        Meteor.call('crear_presentacion', nombre, desc);
    }
  });
  Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
    crear_presentacion: function(nombre, descripcion){
        if(!Meteor.userId()){
            alert('Fallo la creacion');
            throw new Meteor.Error('No autorizado');
        }

        presentaciones_coll.insert({
            nombre: nombre,
            descripcion: descripcion,
            createdAt: new Date(),
            creador: Meteor.userId()
        });
    }
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '402732173235031',
    secret: '0f22ddd7aae0190718e64c9dea0dec36'
});
