var _ = require('underscore');

class RowProperties{
  constructor (rowMetadata={}, rowComponent=null, isCustom=false) {
    this.rowMetadata = rowMetadata;
    this.rowComponent = rowComponent;
    this.isCustom = isCustom;
    // assign unique Id to each griddle instance
    this.gridId = _.uniqueId();
  }

  getRowKey(row, key) {
    var uniqueId;

    if(this.hasRowMetadataKey()){
      uniqueId = row[this.rowMetadata.key];
    }
    else{
      uniqueId = 'grid_' + this.gridId + '_row_' + key;
    }

    //todo: add error handling

  	return uniqueId;
  }

  hasRowMetadataKey(){
   return this.hasRowMetadata() && this.rowMetadata.key !== null && this.rowMetadata.key !== undefined;
  }

  getBodyRowMetadataClass(rowData){
    if (this.hasRowMetadata() && this.rowMetadata.bodyCssClassName !== null && this.rowMetadata.bodyCssClassName !== undefined) {
      if (typeof(this.rowMetadata.bodyCssClassName) === 'function') {
        return this.rowMetadata.bodyCssClassName(rowData);
      } else {
        return this.rowMetadata.bodyCssClassName;
      }
    }
    return null;
  }

  getHeaderRowMetadataClass(){
    return this.hasRowMetadata() && this.rowMetadata.headerCssClassName !== null && this.rowMetadata.headerCssClassName !== undefined ? this.rowMetadata.headerCssClassName : null;
  }

  hasRowMetadata(){
   return this.rowMetadata !== null;
  }
}

module.exports = RowProperties;
