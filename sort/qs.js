var qs = function(a){
    if(a.length === 0) return a; 
    if(a.length === 1) return a; 

    var mid = Math.round(a.length/2);
    var smaller = a.filter( function(_){ return _<a[mid]});
    var bigger = a.filter( function(_){return _>a[mid]});
    var equal = a.filter( function(_){return _===a[mid]});

    console.log('\n', a, ';', 'a[' , mid, '] = ', a[mid],  '; res:', smaller, equal, bigger)

    return qs( smaller ).concat(equal).concat( qs( bigger ) )
}

module.exports = qs;
