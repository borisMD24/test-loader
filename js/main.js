class svgImage {
  constructor(element){
    this.element = element;
    element.style.transitionDelay = "0";
    element.style.transitionDuration = "0";
    this.baseValCp = {}
    const originalTransforms = this.getTranslateXY(element.transform.baseVal[0].matrix); // resoud la matrice de transformation
    this.x = originalTransforms.translateX; // enregistre les valeurs initiales de transformation
    this.y = originalTransforms.translateY;
    this.setUp();
    let self = this;
    setTimeout(()=>{ // le timeout sert a s'assurer que le transform du setup s'applique bien
      self.setElementTransition()
    }, 100);
  }
  setUp(){
    const zDir = ((Math.random()>=0.5)? 1 : 0) * 2 - 1 // inutile, un vestige
    this.element.style.transform = `translate(${Math.random()*100}vw, ${Math.random()*100}vh)`+` rotateX(${Math.random()*1080}deg) rotateY(${Math.random()*1080}deg) scale(${Math.random()*5})`;  // applique les transformations aleatoires
    this.element.style.opacity = "0"
  }
  setElementTransition(){
    this.element.style.transitionDelay = `${Math.random()*1.5}s`
    this.element.style.transitionDuration = `${Math.random()*2}s`
  }
  getTranslateXY(m) { // resoud la matrice de transformation 
    const matrix = new DOMMatrixReadOnly(`matrix(${m.a}, ${m.b}, ${m.c}, ${m.d}, ${m.e}, ${m.f})`)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
      }
  }
  reshape(){ // remet le transform a sa valeur initiale
    setTimeout(()=>{
      this.element.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`
      this.element.style.opacity = "1"
    }, 300)
  }
}

class SVGScene {
  constructor(element){
    this.element = element;
    this.imgs = [];
    this.setUp();
    
  }
  setUp(){ // trouve tous les triangles et initialise tous les SVG image
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
  //await sleep(2000);
  scene.trigger();
}
reveal()
