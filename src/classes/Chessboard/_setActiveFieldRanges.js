const _setActiveFieldRanges = function(){
    if ( !this.activeFieldId ){
        this.moveRange = [];
        return;
    };
    const activeField = this.getField( this.activeFieldId );

    if ( this.captureMode ){
        this.captureStreaksActive = this.captureStreaksActive
                                        .map( streak => streak.slice(1))
                                        .filter( streak => streak[0].id === this.activeFieldId)
        console.log(this.activeFieldId);
        console.log(this.captureStreaksActive);
    } else if ( this.captureStreaks.length ){ // active field can capture
        this.captureStreaksActive = this.captureStreaks.filter( streak => streak[0].id === this.activeFieldId );
        console.log(this.captureStreaksActive);
    } else {
        this.moveRange = activeField.figure.filterRange( this, this.activeFieldId ).moveRange
    }
}

export default _setActiveFieldRanges;