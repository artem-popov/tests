"use strict";

var log = _ => (console.log(_), _);
var c = (x, y, z) => x(y(z));
var c2 = function(){ let _ = Array.prototype.slice.apply(arguments); let param = _[_.length - 1]; _ = _.slice(0, _.length - 1); return _.reduceRight((acc,i) => i(acc), param) }
var t = (fn, x) => fn(x).next().value; 
var p = (generator, value) => new Promise(resolve => resolve(generator(value).next().value) ); 



var a =  function *(x){ while(true) yield x + 1 };
var b = function* (x){ while(true) yield new Promise(function(resolve){ setTimeout(_=>resolve(x+1), 1000) })}


log('simple call:')
log( a(a(a(1).next().value).next().value).next().value )

log('With helper:')
var at = t.bind(void 0, a)
log( at(at(at(1))) )

log('Printable:')
var at = t.bind(void 0, a)
var alc = c.bind(void 0, at, log)
log( alc(alc(alc(1))) )

log('Composable:')
var at = t.bind(void 0, a)
var alc2 = c2.bind(void 0, at, log, at, log, at, log)
log( alc2(1) )

log('With promises:')
var ap = p.bind(void 0, a)
log(1); // See timed call for better
var end = ap(1).then(log) 
            .then(_=>ap(_)).then(log)
            .then(_=>ap(_)).then(log)
            .then(_=>ap(_)).then(log)

end = end.then( _ => {
    log('Timed call:')
    return Promise.resolve(1).then(log)
                .then(_ => b(_).next().value).then(log)
                .then(_ => b(_).next().value).then(log)
                .then(_ => b(_).next().value).then(log)
})


end = end.then( _ => {
    log('With helper:')
    var bt = t.bind(void 0, b)
    return Promise.resolve(1).then(log)
                .then(_=>bt(_)).then(log)
                .then(_=>bt(_)).then(log)
                .then(_=>bt(_)).then(log)
})
