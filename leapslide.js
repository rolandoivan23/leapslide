presentaciones_coll = new Mongo.Collection("presentaciones_coll");

if (Meteor.isClient) {
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