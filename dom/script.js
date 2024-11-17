ctr = 0;

function callback(){
    document.querySelector("h1").innerHTML=ctr;
    console.log(ctr);
    ctr = ctr + 1;
}

// setInterval(callback, 1000);