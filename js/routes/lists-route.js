App.ListsRoute = Ember.Route.extend({
  model : function(){
  	return this.get( 'store' ).findAll( 'list' );
  }
});