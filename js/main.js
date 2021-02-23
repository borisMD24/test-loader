const reveal = async () => {
  let tr = Array.from(document.querySelectorAll("svg image"));
  let cnt = 0;
  while(tr.length >= 1){
    let n = Math.floor(Math.random() * Math.floor(tr.length));
    tr[n].style.opacity = "1"
    tr.splice(n, 1);
    await sleep (tr.length/(75*tr.length/100));
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
reveal();
