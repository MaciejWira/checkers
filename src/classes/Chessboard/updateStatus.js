const updateStatus = function(id, actionType, capturedId){
    
    if ( this.status.game === 'on' ){

        // capture
        if ( actionType === 'capture' && capturedId ){
            this._turnAction(id, capturedId);
        } 
        
        // field with a figure
        if ( actionType === 'select' ){
            this.activeFieldId = id;
        } 
        
        // for disactivating activeField
        else if ( actionType === 'deselect' ) {
            this.activeFieldId = null;
        } 
        
        else if ( actionType === 'move' ) {
            this._turnAction(id);
        };

        if ( !this.activeFieldId ) this._filterPossibilities();
        else this._setActiveFieldRanges();

    } 

    this.checkStatus();
    this.stage.render();

};

export default updateStatus;

