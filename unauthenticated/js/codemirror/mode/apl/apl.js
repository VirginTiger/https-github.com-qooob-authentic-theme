(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("apl",function(){var e={".":"innerProduct","\\":"scan","/":"reduce","⌿":"reduce1Axis","⍀":"scan1Axis","¨":"each","⍣":"power"};var i={"+":["conjugate","add"],"−":["negate","subtract"],"×":["signOf","multiply"],"÷":["reciprocal","divide"],"⌈":["ceiling","greaterOf"],"⌊":["floor","lesserOf"],"∣":["absolute","residue"],"⍳":["indexGenerate","indexOf"],"?":["roll","deal"],"⋆":["exponentiate","toThePowerOf"],"⍟":["naturalLog","logToTheBase"],"○":["piTimes","circularFuncs"],"!":["factorial","binomial"],"⌹":["matrixInverse","matrixDivide"],"<":[null,"lessThan"],"≤":[null,"lessThanOrEqual"],"=":[null,"equals"],">":[null,"greaterThan"],"≥":[null,"greaterThanOrEqual"],"≠":[null,"notEqual"],"≡":["depth","match"],"≢":[null,"notMatch"],"∈":["enlist","membership"],"⍷":[null,"find"],"∪":["unique","union"],"∩":[null,"intersection"],"∼":["not","without"],"∨":[null,"or"],"∧":[null,"and"],"⍱":[null,"nor"],"⍲":[null,"nand"],"⍴":["shapeOf","reshape"],",":["ravel","catenate"],"⍪":[null,"firstAxisCatenate"],"⌽":["reverse","rotate"],"⊖":["axis1Reverse","axis1Rotate"],"⍉":["transpose",null],"↑":["first","take"],"↓":[null,"drop"],"⊂":["enclose","partitionWithAxis"],"⊃":["diclose","pick"],"⌷":[null,"index"],"⍋":["gradeUp",null],"⍒":["gradeDown",null],"⊤":["encode",null],"⊥":["decode",null],"⍕":["format","formatByExample"],"⍎":["execute",null],"⊣":["stop","left"],"⊢":["pass","right"]};var b=/[\.\/⌿⍀¨⍣]/;var d=/⍬/;var h=/[\+−×÷⌈⌊∣⍳\?⋆⍟○!⌹<≤=>≥≠≡≢∈⍷∪∩∼∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⌷⍋⍒⊤⊥⍕⍎⊣⊢]/;var g=/←/;var c=/[⍝#].*$/;var f=function(j){var k;k=false;return function(l){k=l;if(l===j){return k==="\\"}return true}};return{startState:function(){return{prev:false,func:false,op:false,string:false,escape:false}},token:function(m,k){var j,l;if(m.eatSpace()){return null}j=m.next();if(j==='"'||j==="'"){m.eatWhile(f(j));m.next();k.prev=true;return"string"}if(/[\[{\(]/.test(j)){k.prev=false;return null}if(/[\]}\)]/.test(j)){k.prev=true;return null}if(d.test(j)){k.prev=false;return"niladic"}if(/[¯\d]/.test(j)){if(k.func){k.func=false;k.prev=false}else{k.prev=true}m.eatWhile(/[\w\.]/);return"number"}if(b.test(j)){return"operator apl-"+e[j]}if(g.test(j)){return"apl-arrow"}if(h.test(j)){l="apl-";if(i[j]!=null){if(k.prev){l+=i[j][1]}else{l+=i[j][0]}}k.func=true;k.prev=false;return"function "+l}if(c.test(j)){m.skipToEnd();return"comment"}if(j==="∘"&&m.peek()==="."){m.next();return"function jot-dot"}m.eatWhile(/[\w\$_]/);k.prev=true;return"keyword"}}});a.defineMIME("text/apl","apl")});