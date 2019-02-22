const t=(t,i)=>{if(!t)throw new Error(`[flipjs] ${i}`)},i=(i,s)=>{t("string"==typeof s,"className must be string type."),i.classList.add(s)},s=(t,i)=>t.currentStyle?t.currentStyle[i]:getComputedStyle(t,!1)[i],a=(t,i,s=null,a=!0,e=!0)=>{const r=new CustomEvent(i,{detail:s,bubbles:a,cancelable:e});t.dispatchEvent(r)};var e={play(){t("string"==typeof this._easing,"\n      waap player only support string easing value for now.\n      reference: https://www.w3schools.com/jsref/prop_style_transitiontimingfunction.asp.\n    ");const i=[{transformOrigin:this._transformOrigin,transform:`\n          translate(${this._invert.x}px, ${this._invert.y}px) \n          scale(${this._invert.sx}, ${this._invert.sy})\n        `,opacity:this._first.opacity},{transformOrigin:this._transformOrigin,transform:"none",opacity:this._last.opacity}],s={delay:this._delay,duration:this._duration,easing:this._easing,fill:this._waap_fill,iterationStart:this._waap_iterationStart,iterations:this._waap_iterations},a=this._target.animate(i,s);return a.onfinish=(()=>{this.cleanUpAndFire()}),a}},r={play(i){"linear"===this._easing&&(this._easing=(t=>t)),t("function"==typeof this._easing,"the raf player requires that easing be a function."),this._start=i?i+this._delay:window.performance.now()+this._delay;const s=()=>{let t=(window.performance.now()-this._start)/this._duration;t=((t,i=Number.NEGATIVE_INFINITY,s=Number.POSITIVE_INFINITY)=>Math.min(s,Math.max(i,t)))(t,0,1);let i=this._easing(t),a={x:this._invert.x*(1-i),y:this._invert.y*(1-i),sx:this._invert.sx+i*(1-this._invert.sx),sy:this._invert.sy+i*(1-this._invert.sy),a:this._first.opacity+i*this._invert.a};this._transform&&(this._target.style.transform=`\n          translate(${a.x}px, ${a.y}px)\n          scale(${a.sx}, ${a.sy})\n        `),this._opacity&&(this._target.style.opacity=a.a),t<1?requestAnimationFrame(s):this.cleanUpAndFire()};requestAnimationFrame(s)}};class n{constructor(){t(new.target!==n,"FlipCore cannot be instantiated and can only be inherited.")}static get version(){return"v1.0.1"}static get players(){return this._cache}static extends(i,s){this._cache||(this._cache={}),t(!this._cache[i],`player ${i} already exists.`),t(!!s.play,"player must have a play() function."),this._cache[i]=s}}class l extends n{constructor(i={}){super();const s=Object.assign({},{duration:300,delay:0,easing:"linear",play:"WAAP",customPlay:"",transformOrigin:"0 0",waap_fill:"both",waap_iterationStart:"0.0",waap_iterations:"1",transform:!0,opacity:!0},i);t(s.target,"the target dom node must be provided."),this._start=0,this._target=s.target,Object.keys(s).forEach(t=>{s.hasOwnProperty(t)&&(this[`_${t}`]=s[t])});const a=l._cache[s.customPlay?s.customPlay:s.play];let e;t(a,`unkown player ${s.customPlay?s.customPlay:s.play}.`),t(a.play,"player must have a play() function."),this.cleanUpAndFire=this.cleanUpAndFire.bind(this),Object.keys(a).forEach(t=>{e=a[t],this[`_${t}`]=e.bind(this)}),this._first={layout:null,opacity:0},this._last={layout:null,opacity:0},this._invert={x:0,y:0,sx:1,sy:1,a:0,d:!1}}cleanUpAndFire(){this._target.style.transform=null,this._target.style.transformOrigin=null,this._target.style.willChange=null,this._target.style.opacity=null,this._first.layout=null,this._first.opacity=0,this._last.layout=null,this._last.opacity=0,this._invert.x=0,this._invert.y=0,this._invert.sx=1,this._invert.sy=1,this._invert.a=0,this._invert.d=!1,a(this._target,"flipComplete")}snapshot(t){return this.first(),this.last(t),this.invert(),this}first(){return this._first.layout=this._target.getBoundingClientRect(),this._first.opacity=parseFloat(s(this._target,"opacity")),this}last(t){return t&&i(this._target,t),this._last.layout=this._target.getBoundingClientRect(),this._last.opacity=parseFloat(s(this._target,"opacity")),this}invert(){let i=[];t(this._first.layout,"please call first() before invert()."),t(this._last.layout,"please call last() before invert().");const{layout:{left:s,top:a,width:e,height:r},opacity:n}=this._first,{layout:{left:l,top:h,width:o,height:y},opacity:_}=this._last;return Object.assign(this._invert,{x:s-l,y:a-h,sx:e/o,sy:r/y,a:_-n,d:!0}),this._transform&&(this._target.style.transformOrigin=this._transformOrigin,this._target.style.transform=`translate(${this._invert.x}px, ${this._invert.y}px) scale(${this._invert.sx}, ${this._invert.sy})`,i.push("transform")),this._opacity&&(this._target.style.opacity=n,i.push("opacity")),this._target.style.willChange=i.join(","),this}play(i){return t(this._invert.d,"please call invert() brfore play()."),this._play(i)}}l.extends("WAAP",e),l.extends("RAF",r);export default l;
