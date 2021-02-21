window.addEventListener("load", () => {
  prompt();
})

async function prompt () {
  let img = document.querySelectorAll("img");
  for(let i = 0; i < img.length; i++){
    console.log(img[i]);
    img[i].style.transform = "rotateX(0deg)";
    await sleep(250);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}