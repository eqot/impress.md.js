!function(a,b){"use strict";function c(){for(var b=a.body,c=[],d=[],e=b.classList,g=0;g<e.length;g++)e[g].match(/(impress-group-.+)/)&&c.push(RegExp.$1),e[g].match(/impress-on-(.+)/)&&(d=f.groups[RegExp.$1]);if(c.length>0)for(var g=0;g<c.length;g++)b.classList.remove(c[g]);if(d&&d.length>0)for(var g=0;g<d.length;g++)b.classList.add("impress-group-"+d[g])}function d(a){for(var b={},c=a.split(","),d=0;d<c.length;d++)if(c[d].match(/\s*([\w-]+):\s*['"]*([\w-. ]+)['"]*/)){var e=RegExp.$1,f=RegExp.$2;b[e]=f}return b}function e(b){var c=a.createElement("div");return c.innerHTML=b,0===c.childNodes.length?"":c.childNodes[0].nodeValue}var f={page:1,x:0,y:0,z:0,dx:1500,dy:0,dz:0,isOpenBracket:!1,groups:{}},g=b.ImpressMd=function(b){this.rootId=b||"impress";var d=marked(h,{renderer:this.renderer});f.isOpenBracket&&(d+="</div>"),this.root=a.getElementById(this.rootId),this.root.innerHTML=d,this.root.addEventListener("impress:stepenter",c),this.root.addEventListener("impress:stepleave",c),impress().init(this.rootId)};g.prototype.renderer=new marked.Renderer,g.prototype.renderer.heading=function(a,b){var c=null;a.match(/(.*)<!-- (.+) -->/)&&(a=RegExp.$1,c=d(RegExp.$2));var e={id:"page"+f.page,classes:"step",tx:0,ty:0,tz:0};c&&(c.x&&(f.x=Number(c.x)),c.y&&(f.y=Number(c.y)),c.z&&(f.z=Number(c.z)),c.dx&&(f.dx=Number(c.dx)),c.dy&&(f.dy=Number(c.dy)),c.dz&&(f.dz=Number(c.dz)),c.tx&&(e.tx=Number(c.tx)),c.ty&&(e.ty=Number(c.ty)),c.tz&&(e.tz=Number(c.tz)),c.id&&(e.id=c.id),c["class"]&&(e.classes+=" "+c["class"]),c.scale&&(e.scale=Number(c.scale)),c.rotate&&(e.rotate=c.rotate),c["rotate-x"]&&(e.rotateX=c["rotate-x"]),c["rotate-y"]&&(e.rotateY=c["rotate-y"]),c["rotate-z"]&&(e.rotateZ=c["rotate-z"]),c.group&&(f.groups[e.id]=c.group.split(" ")));var g="";return f.isOpenBracket&&(g+="</div>\n"),g+='<div id="'+e.id+'" class="'+e.classes+'" data-x="'+(f.x+e.tx)+'" data-y="'+(f.y+e.ty)+'" data-z="'+(f.z+e.tz)+'"'+(e.scale?' data-scale="'+e.scale+'"':"")+(e.rotate?' data-rotate="'+e.rotate+'"':"")+(e.rotateX?' data-rotate-x="'+e.rotateX+'"':"")+(e.rotateY?' data-rotate-y="'+e.rotateY+'"':"")+(e.rotateZ?' data-rotate-z="'+e.rotateZ+'"':"")+">\n",g+="<h"+b+">"+a+"</h"+b+">\n",f.page++,f.x+=f.dx,f.y+=f.dy,f.z+=f.dz,f.isOpenBracket=!0,g},g.prototype.renderer.image=function(a,b,c){var f=null;e(c).match(/(.*)<!-- (.+) -->/)&&(f=d(RegExp.$2),c=escape(RegExp.$1.replace(/\s+$/,"")));var g='<img src="'+a+'" alt="'+c+'"';return b&&(g+=' title="'+b+'"'),f&&(f["class"]&&(g+=' class="'+f["class"]+'"'),f.id&&(g+=' id="'+f.id+'"'),f.width&&(g+=' width="'+f.width+'"')),g+=">"};var h="\n\
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
## Zoom Test    <!-- group: 'zoom-test', class: 'slide zoom-overview', dx: 0 -->\n\
\n\
This is an overview.\n\
\n\
## Detail 1    <!-- group: 'zoom-test zoom-test-child', class: 'slide zoom-item', scale: 0.25, tx: -280 -->\n\
\n\
* foo\n\
* bar\n\
  * bar1\n\
  * bar 2\n\
\n\
## Detail 2    <!-- group: 'zoom-test zoom-test-child', class: 'slide zoom-item', scale: 0.25 -->\n\
\n\
## Detail 3    <!-- group: 'zoom-test zoom-test-child', class: 'slide zoom-item', scale: 0.25, tx:  280 -->\n\
\n\
* foo\n\
* bar\n\
  * bar1\n\
  * bar 2\n\
\n\
##     <!-- group: 'zoom-test', class: 'zoom-overview', dx: 1500 -->\n\
\n\
\n\
## 3D Layers Test    <!-- class: 'slide layers-3d', dx: 0 -->\n\
\n\
##     <!-- group: 'layers-test', class: 'layers-3d', z: 100, rotate-x: -70, rotate-y: -45 -->\n\
\n\
<div class='layers'>\n\
  ![Layer 1   <!-- class: 'layer', id: 'layer1', width: 560 -->](images/layer1.svg)\n\
  ![Layer 2   <!-- class: 'layer', id: 'layer2', width: 560 -->](images/layer2.svg)\n\
  ![Layer 3   <!-- class: 'layer', id: 'layer3', width: 560 -->](images/layer3.svg)\n\
</div>\n\
\n\
##     <!-- group: 'layers-test', id: 'layers-detail' -->\n\
"}(document,window);