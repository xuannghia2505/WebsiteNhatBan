function hideMenu(){
    document.getElementById('navLinks').style.right="-200px";
}
function showMenu(){
    document.getElementById('navLinks').style.right="0px"
}

function changePost(type,element){
    let tabs = document.getElementsByClassName('tab-item');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className='tab-item';
        
    }
    element.className='tab-item active';
    document.getElementById(type).style.display = 'block';
    
    switch(type){
        case 'nguoimoi': 
            document.getElementById('n5').style.display= "none";
            document.getElementById('n4').style.display= "none";
            
            break;
        case 'n5': 
            document.getElementById('nguoimoi').style.display= "none";
            document.getElementById('n4').style.display= "none";
            break;
        case 'n4': 
            document.getElementById('nguoimoi').style.display= "none";
            document.getElementById('n5').style.display= "none";
            break;
    }

}
function showHira(){
    document.getElementById('hiragana').className= "active";
    document.getElementById('katakana').className= "";
    document.getElementById('hideKata').style.display="";
    document.getElementById('hideHira').style.display="none";
}
function showKata(){
    document.getElementById('hiragana').className= "";
    document.getElementById('katakana').className= "active";
    document.getElementById('hideKata').style.display="none";
    document.getElementById('hideHira').style.display="";
}
