
function nullParser(input){
	input = spaceParser(input);
	   
	if(input.slice(0,4) === 'null')
    return [input.slice(0,4),input.slice(4)];
  return null;     
}
//console.log((nullParser('null,12')));

function spaceParser(input){
	var i = 0;
	if(input.slice(0,1) === " "){
    while(input.slice(i,i+1) === " "){
      i++;
    }
    return(input.slice(i));
	}
	return input;
}
//console.log((spaceParser('        pooja')));
 
function stringParser(input){
	input = spaceParser(input);
	var i = 1;
	if(input[0] === "\""){
    while(input.slice(i,i+1) !== "\"" && i < input.length){
      i++;
    }
    if(input.slice(i,i+1) === "\"")
      return [input.slice(1,i),input.slice(i+1)];
  }
	return null;
}
//console.log(stringParser('"pooja",12'));

function booleanParser(input){
	input = spaceParser(input);
	
	if(input.slice(0,4) === 'true')
		return[true,input.slice(4)];
	else if(input.slice(0,5) === 'false')
		return[false,input.slice(5)];
	return null;
}
//console.log(booleanParser('true'));

function numberParser(input){
	input = spaceParser(input);
	 // if(!isNaN(inp)){
	    if(input.match(/[+-]?\d+([.e]?[+-]?\d*)?/gi)){
      var t = input.match(/[+-]?\d+([.e]?[+-]?\d*)?/gi)[0];
	    var l = t.length;
	    return[parseFloat(t),input.slice(l)];
//	}
    }
	return null;   
}
//console.log(parseEngine('23'));

function arrayParser(input){
	input = spaceParser(input);
	var arr = [];
	var f = 0;
	if(input[0] == '['){
    input = input.slice(1);
		while(input.length > 0 && input.slice(0,1) !== ']'){
			input = spaceParser(input);
			if(input.slice(0,1) == '['){
        var k = input.indexOf(']');
        arr.push(arrayParser(input.slice(0,k+1)));
        //var k = input.indexOf(']');
        input = input.slice(k+1);
			}else if(input.slice(0,1) == '\,')
				input = input.slice(1);
			else if(input.slice(0,1) == '\{'){
        var k = input.indexOf('}');
				arr.push(objectParser(input.slice(0,k+1)));
         //var k = input.indexOf('}');
        input = input.slice(k+1);
      }
      else{
        var n = parseEngine(input);
        //arr.push(n[0]);
        //input = n[1].slice(1);

        if(n === null){
          //f = 1;
          break;
        }
        arr.push(n[0]);
        input = n[1].slice(1);
      }
    }
    //if(f == 0)
    return arr;
    //else return null;
	}
	return null;
}
//console.log(arrayParser('[1,["pooja"],[123,true],{"as":1}]'));

function objectParser(input){
	input = spaceParser(input);
	var str = {};
	if(input.split(0,1 == '{')){
		input = input.slice(1);
	  while(input.length > 0 && input.slice(0,1) !== '}'){
		  input = spaceParser(input);
      if(input.slice(0,1) == '\,')
        input = input.slice(1);
		//if(stringParser(input)){
		  var h = stringParser(input);
      if(h == null)
        break;
		  var k = h[0];
		  input = h[1];
        //}else break;
      if(k == null)
        break;
       // if(input.slice(0,1) == '\,')
        //	input = input.slice(1);
      input = spaceParser(input);
      if(input.slice(0,1) == ':')
        input = input.slice(1);
      input = spaceParser(input);
      if(input.slice(0,1) == '['){
        var l = input.indexOf(']');
        var h = arrayParser(input.slice(0,l+1));
        input = input.slice(l+1); 
        str[k] = h;
      } else if(input.slice(0,1) == '{') {
          var l = input.indexOf('}');
          var h = objectParser(input.slice(0,l+1));
          input = input.slice(l+1);
          str[k] = h;
      } else if(parseEngine(input)) {
           // console.log(input);
            var h = parseEngine(input);
            //console.log(h);
            input = h[1].slice(1);
            str[k] = h[0];
      }
      if(h == null)
        break;
        //str[k] = h[0];      
    }
    return str;
  }return null;
}                      
//console.log(objectParser('{"qas":[2,"sdf"],"aws":"ffg","add":7}'));

function parseEngine(input){
    if(nullParser(input))
		  return(nullParser(input));
    if(stringParser(input))
		  return(stringParser(input));
    if(booleanParser(input))
		  return(booleanParser(input));
    if(numberParser(input))
		  return(numberParser(input));
    if(arrayParser(input))
		  return(arrayParser(input));
	  else if(objectParser(input))
	  	return(objectParser(input));
	  return null;
}
//console.log(JSON.stringify(objectParser('{"ad":1,"name":"pooja","df":{"xssf":[1,2]},"sdf":{}}')));
//console.log((parseEngine('{"ad":"aqwer","name":"pooja","df":{"xssf":[1,2]},"sdf":{}}')));
//console.log(arrayParser('[null,1,true]'));
//console.log(arrayParser('[{"df":1,"dF":["dv",23],"asd":[1,2,"sd"]},{"a":1}]'));
//console.log(objectParser('{"client": {"host": "127.0.0.1","port": [8983,65],"path": "/solr","core": "null"}}'));
//console.log((arrayParser('[1,[2,3],{"as":12},[2,3]]')));
console.log(objectParser('{"name": true,"version": "1.10.0","description": "BDD/TDD assertion library for node.js and the browser. Test framework agnostic.","license": "MIT","keywords": ["test","assertion","assert","testing","chai"],"main": "chai.js","ignore": ["build","components","lib","node_modules","support","test","index.js","Makefile",".*"],"dependencies": {},"devDependencies": {}}'));
//console.log(objectParser('{"name": "isarray","description": "Array#isArray for older browsers","version": "0.0.1","repository": "juliangruber/isarray","homepage": "https://github.com/juliangruber/isarray","main": "index.js","scripts": ["index.js"],"dependencies": {},"keywords": ["browser","isarray","array"],"author": {"name": "Julian Gruber","email": "mail@juliangruber.com","url": "http://juliangruber.com"},"license": "MIT"}'));
//console.log(arrayParser('["var"," ","multiLineString"," ","="," ","\\\nWhile I was writing along\\\nI suddenly forgot to","\n","add"," ","a"," ","backslash"]'));
//console.log(arrayParser('[{"website": "http://www.7-eleven.com/?yext=35710","phone": "(212) 227-7919","title": "7-Eleven"},1,2]'));
//console.log(arrayParser('[2,[2,"jk",true],9]'));
//console.log(objectParser('{"cdv":sh}'));