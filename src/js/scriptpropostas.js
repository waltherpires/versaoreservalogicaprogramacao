let flag = 0;
document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('b1')) {
        let tabela1 = this.getElementById("t1")
        
        if(flag === 0) {
            tabela1.style.display = "block"; 
            flag = 1;
        } else if(flag === 1) {
            tabela1.style.display = "none";
            flag = 0;
        }
    }
    if(el.classList.contains('b2')){
        let tabela2 = this.getElementById("t2");
        
        if(flag === 0) {
            tabela2.style.display = "block"; 
            flag = 1;
        } else {
            tabela2.style.display = "none";
            flag = 0;
        }
    }
    if(el.classList.contains('b3')){
        let tabela3 = this.getElementById("t3");
        
        if(flag === 0) {
            tabela3.style.display = "block"; 
            flag = 1;
        } else {
            tabela3.style.display = "none";
            flag = 0;
        }
    }
})