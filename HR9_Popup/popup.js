document.getElementById("btn").addEventListener("click", ()=>{
    document.getElementById("exampleFormControlTextarea1").innerHTML = "changed";
});

document.getElementById("exampleFormControlTextarea1").addEventListener("change", (content)=>{
    alert(content);
});