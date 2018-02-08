var getById = function(id){
	return document.getElementById(id);
}

var getByAttr = function(attr,name){
	var result = [],
    elems = document.getElementsByTagName( '*' );

	for( var i = 0, elem; elem = elems[i++]; ) {
	    if ( elem.getAttribute( attr, 2 ) == name ) {
	        result[ result.length ] = elem;
	    }
	}

	return result;

}

elements = document.querySelectorAll('.js-type');

elements.forEach(function(item){
    item.onchange = function(){
        var type = this.dataset.type,
            segms = document.querySelectorAll('.segm-block'),
            strs = document.querySelectorAll('.str-block');
        if(type == 'segm-title'){
            segms.forEach(function(segm){
                segm.classList.remove('hide');
            });
            strs.forEach(function(str){
                str.classList.add('hide');
            });
        }
        else if(type == 'str-title'){
            segms.forEach(function(segm){
                segm.classList.add('hide');
            });
            strs.forEach(function(str){
                str.classList.remove('hide');
            });
        }
    };
});
