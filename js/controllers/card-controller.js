App.CardController = Ember.ObjectController.extend({
  isEditing : false,
  newList : null,
  needs: ['lists'],

  removeCardFromList : function(){
      var card = this.get( 'model' ),
      list = card.get( 'list' );
      list.get( 'cards' ).removeObject( card );
  },

  updateModel : function( cardMethod ){
    var card = this.get( 'model' );

    if( cardMethod && cardMethod in card){
      card[ cardMethod ]();
    }

    card.save();
  },

  updateList : function(){
    
    var card = this.get( 'model' ),
      list = card.get( 'list' ),
      newList = this.get( 'newList' );

    this.removeCardFromList();

    newList.get( 'cards' ).pushObject( card );

    card.set( 'list', this.get( 'newList' ) );

    card.save().then( function(){
      list.save();
      newList.save();
    } );
  }.observes( 'newList' ),

  actions : {
  	editCard : function(){
  		this.set( 'isEditing', true )
  	},

  	deleteCard : function(){
  		this.removeCardFromList();
  		this.updateModel( 'deleteRecord' );
  	},

  	updateCard : function(){
  		this.set( 'isEditing', false );

        this.updateModel();
  	}
  }
});