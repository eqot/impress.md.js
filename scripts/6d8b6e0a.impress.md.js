!function(a,b){"use strict";function c(){for(var b=a.body,c=null,d=null,f=b.classList,g=0;g<f.length;g++)f[g].match(/(impress-group-.+)/)&&(c=RegExp.$1),f[g].match(/impress-on-(.+)/)&&(d=e.groups[RegExp.$1]);c&&b.classList.remove(c),d&&b.classList.add("impress-group-"+d)}function d(a){for(var b={},c=a.split(","),d=0;d<c.length;d++)if(c[d].match(/\s*([\w-]+):\s*['"]*([\w-. ]+)['"]*/)){var e=RegExp.$1,f=RegExp.$2;b[e]=f}return b}var e={page:1,x:0,y:0,z:0,dx:1500,dy:0,dz:0,isOpenBracket:!1,groups:{}},f=b.ImpressMd=function(b){this.rootId=b||"impress";var d=marked(g,{renderer:this.renderer});e.isOpenBracket&&(d+="</div>"),this.root=a.getElementById(this.rootId),this.root.innerHTML=d,this.root.addEventListener("impress:stepenter",c),this.root.addEventListener("impress:stepleave",c),impress().init(this.rootId)};f.prototype.renderer=new marked.Renderer,f.prototype.renderer.heading=function(a,b){var c=null;a.match(/(.*)<!-- (.+) -->/)&&(a=RegExp.$1,c=d(RegExp.$2));var f={id:"page"+e.page,classes:"step",tx:0,ty:0,tz:0};c&&(c.x&&(e.x=Number(c.x)),c.y&&(e.y=Number(c.y)),c.z&&(e.z=Number(c.z)),c.dx&&(e.dx=Number(c.dx)),c.dy&&(e.dy=Number(c.dy)),c.dz&&(e.dz=Number(c.dz)),c.tx&&(f.tx=Number(c.tx)),c.ty&&(f.ty=Number(c.ty)),c.tz&&(f.tz=Number(c.tz)),c.id&&(f.id=c.id),c["class"]&&(f.classes+=" "+c["class"]),c.scale&&(f.scale=Number(c.scale)),c.rotate&&(f.rotate=c.rotate),c["rotate-x"]&&(f.rotateX=c["rotate-x"]),c["rotate-y"]&&(f.rotateY=c["rotate-y"]),c["rotate-z"]&&(f.rotateZ=c["rotate-z"])),c.group&&(e.groups[f.id]=c.group);var g="";return e.isOpenBracket&&(g+="</div>\n"),g+='<div id="'+f.id+'" class="'+f.classes+'" data-x="'+(e.x+f.tx)+'" data-y="'+(e.y+f.ty)+'" data-z="'+(e.z+f.tz)+'"'+(f.scale?' data-scale="'+f.scale+'"':"")+(f.rotate?' data-rotate="'+f.rotate+'"':"")+(f.rotateX?' data-rotate-x="'+f.rotateX+'"':"")+(f.rotateY?' data-rotate-y="'+f.rotateY+'"':"")+(f.rotateZ?' data-rotate-z="'+f.rotateZ+'"':"")+">\n",g+="<h"+b+">"+a+"</h"+b+">\n",e.page++,e.x+=e.dx,e.y+=e.dy,e.z+=e.dz,e.isOpenBracket=!0,g};var g="\n\
# impress.md.js    <!-- class: 'slide', id: 'title' -->\n\
\n\
This is a test.\n\
\n\
\n\
## Page 2    <!-- class: 'slide' -->\n\
\n\
This is a test too.\n\
\n\
\n\
## Zoom Test    <!-- class: 'slide zoom-overview', id: 'zoom-test', dx: 0 -->\n\
\n\
This is an overview.\n\
\n\
## Detail 1    <!-- class: 'slide zoom-item', group: 'zoom-test', tx: -280, scale: 0.25 -->\n\
\n\
* foo\n\
* bar\n\
  * bar1\n\
  * bar 2\n\
\n\
## Detail 2    <!-- class: 'slide zoom-item', group: 'zoom-test', scale: 0.25 -->\n\
\n\
## Detail 3    <!-- class: 'slide zoom-item', group: 'zoom-test', tx:  280, scale: 0.25 -->\n\
\n\
* foo\n\
* bar\n\
  * bar1\n\
  * bar 2\n\
\n\
##     <!-- class: 'zoom-overview', id: 'zoom-test-overview', dx: 1500 -->\n\
"}(document,window);