class svgImage {
  constructor(element){
    this.element = element;
    element.style.transitionDelay = "0s";
    element.style.transitionDuration = "0s";
    this.baseValCp = {}
    const originalTransforms = this.getTranslateXY(element.transform.baseVal[0].matrix);
    this.x = originalTransforms.translateX;
    this.y = originalTransforms.translateY;
    this.setUp();
  }
  setUp(){
    const yDir = ((Math.random()>=0.5)? 1 : 0) * 2 - 1
    const xDir = ((Math.random()>=0.5)? 1 : 0) * 2 - 1
    const zDir = ((Math.random()>=0.5)? 1 : 0) * 2 - 1

    this.element.style.transform = `translate(${Math.random()*100}vw, ${Math.random()*100}vh)`+` translateZ(${zDir * Math.random()*50}vh) rotateX(${Math.random()*360}deg) rotateY(${Math.random()*360}deg)`;
    this.element.style.transitionDelay = `${Math.random()*2}s`
    this.element.style.transitionDuration = `${Math.random()*2}s`
    this.element.style.opacity = "0"
  }
  getTranslateXY(m) {
    const matrix = new DOMMatrixReadOnly(`matrix(${m.a}, ${m.b}, ${m.c}, ${m.d}, ${m.e}, ${m.f})`)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
      }
  }
  reshape(){
    console.log(this.x);
    this.element.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`
    this.element.style.opacity = "1"
  }
}

class SVGScene {
  constructor(element){
    this.element = element;
    this.imgs = [];
    this.setUp();
    
  }
  setUp(){
    for(let i = 0; i <= 436; i++){
     this.imgs.push(new svgImage(this.element.getElementById(`id_${i}`)));
    }
  }
  trigger(){
    this.imgs.forEach(img => {
      img.reshape();
    })
  }

}

const svg = document.getElementsByTagName("svg")[0];

let scene = new SVGScene(svg)

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function reveal(){
  await sleep(2000);
  scene.trigger();
}
reveal()