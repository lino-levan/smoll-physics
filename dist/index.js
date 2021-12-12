var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var c,b=[];!(c=a.next()).done;)b.push(c.value);return b};
$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};function require(a){return{}[a]}
var $jscomp$destructuring$var0=function(){var a=function(a,b,e,g,d){this.color=a;this.x=b;this.y=e;this.r=g;this.velocity={x:0,y:0};this.past={x:0,y:0};this.stuck=d;this.mass=Math.PI*this.r*this.r/1E3};a.prototype.physicsStep=function(a,b){if(!this.stuck){this.move(a,this.velocity);var c=-(.3*this.velocity.x),g=250*this.mass-.3*this.velocity.y;this.y===height-this.r/2&&0!==this.velocity.x&&(c+=-(this.velocity.x/Math.abs(this.velocity.x))*this.mass*250);b=this.getCollisions(b);1<b.length&&console.log("oh no multiple collisions");
if(0<b.length){b=b[0];this.move(a,{x:-this.velocity.x,y:-this.velocity.y});b.move(a,{x:-b.velocity.x,y:-b.velocity.y});var d=this.mass,h=b.mass,m=sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y),n=sqrt(b.velocity.x*b.velocity.x+b.velocity.y*b.velocity.y),k=atan2(this.velocity.y,this.velocity.x),l=atan2(b.velocity.y,b.velocity.x),f=0===b.x-this.x?90:atan((b.y-this.y)/(b.x-this.x)),p=m*cos(k-f);m*=sin(k-f);k=n*cos(l-f);n*=sin(l-f);l=((d-h)*p+(h+h)*k)/(d+h);d=((d+d)*p+(h-d)*k)/(d+
h);this.velocity.x=cos(f)*l+cos(f+90)*m;this.velocity.y=sin(f)*l+sin(f+90)*m;b.velocity.x=cos(f)*d+cos(f+90)*n;b.velocity.y=sin(f)*d+sin(f+90)*n}this.velocity.x=1E6<this.velocity.x?1E6:this.velocity.x;this.velocity.y=1E6<this.velocity.y?1E6:this.velocity.y;this.velocity.x+=c/this.mass*a;this.velocity.y+=g/this.mass*a}};a.prototype.move=function(a,b){this.stuck||(this.past.x=this.x,this.past.y=this.y,this.x+=b.x*a,this.y+=b.y*a,this.y>height-this.r/2&&(this.velocity.y=-this.velocity.y,this.y=height-
this.r/2),this.x>width-this.r/2&&(this.velocity.x=-this.velocity.x,this.x=width-this.r/2),this.x<this.r/2&&(this.velocity.x=-this.velocity.x,this.x=this.r/2),this.y<this.r/2&&(this.velocity.y=-this.velocity.y,this.y=this.r/2))};a.prototype.getCollisions=function(a){var b=this,c=[];a.forEach(function(a){b!==a&&dist(b.x,b.y,a.x,a.y)<(b.r+a.r)/2&&c.push(a)});return c};a.prototype.draw=function(){noStroke();fill(100,0,0);ellipse(this.past.x,this.past.y,this.r,this.r);fill(this.color);ellipse(this.x,this.y,
this.r,this.r)};a.prototype.setPos=function(a,b){this.x=a;this.y=b};return{Ball:a}}(),Ball=$jscomp$destructuring$var0.Ball,timestep=2E3,groupSize=3,balls=[];noStroke();balls.push(new Ball(color(random(100,255),random(100,255),random(100,255)),100,50,40,!1));setTimeout(function(){balls.push(new Ball(color(random(100,255),random(100,255),random(100,255)),130,50,40,!1))},500);var ballGroups=[];
function createBallGroups(a){ballGroups=[];for(var c=width/groupSize,b=height/groupSize,e={x:0};e.x<groupSize;e={x:e.x},e.x++){ballGroups.push([]);for(var g={y:0};g.y<groupSize;g={y:g.y},g.y++)ballGroups[e.x].push([]),a.forEach(function(a,e){return function(d){d.x>=a.x*c&&d.x<(a.x+1)*c&&d.y>=e.y*b&&d.y<(e.y+1)*b&&ballGroups[a.x][e.y].push(d)}}(e,g))}}function getBallGroup(a,c){return 0<=a&&a<groupSize&&0<=c&&c<groupSize&&void 0!==ballGroups[a][c]?ballGroups[a][c]:[]}
function draw(){background(250,250,255);kdraw.canvas.width=window.innerWidth;kdraw.canvas.height=window.innerHeight;if(1!==groupSize){createBallGroups(balls);for(var a=0;a<groupSize;a++)for(var c={},b=0;b<groupSize;c={zonesOfInfluence:c.zonesOfInfluence},b++)c.zonesOfInfluence=[].concat($jscomp.arrayFromIterable(getBallGroup(a+1,b)),$jscomp.arrayFromIterable(getBallGroup(a+1,b-1)),$jscomp.arrayFromIterable(getBallGroup(a+1,b+1)),$jscomp.arrayFromIterable(getBallGroup(a,b)),$jscomp.arrayFromIterable(getBallGroup(a,
b-1)),$jscomp.arrayFromIterable(getBallGroup(a,b+1)),$jscomp.arrayFromIterable(getBallGroup(a-1,b)),$jscomp.arrayFromIterable(getBallGroup(a-1,b-1)),$jscomp.arrayFromIterable(getBallGroup(a-1,b+1))),getBallGroup(a,b).forEach(function(a){return function(b){for(var c=0;c<timestep;c++)b.physicsStep(60/timestep/1E3,a.zonesOfInfluence)}}(c))}else for(a=0;a<timestep;a++)balls.forEach(function(a){a.physicsStep(60/timestep/1E3,balls)});balls.forEach(function(a){a.draw()})}
function mouseReleased(){balls.push(new Ball(color(random(100,255),random(100,255),random(100,255)),mouseX,mouseY,40,!1))};