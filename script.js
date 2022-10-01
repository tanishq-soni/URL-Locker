check_for_unlock();

var url = document.getElementById("url");
var url_key = document.getElementById("url_key");

document.getElementById("lock_btn").addEventListener("click", encrypt, false);

function encrypt(){
    if(url.value == '' || url_key.value == ''){
        alert('URL & Key should not be empty!!!')
    }
    else{
    var EncryptED = CryptoJS.AES.encrypt(url.value, url_key.value);
    //document.getElementById("locked_url").value=EncryptED.toString();
    //console.log(EncryptED.toString());
    var url_hash = EncryptED.toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    var locked_url = "http://127.0.0.1:5500/?hash="+url_hash;
    document.getElementById("locked_url").innerHTML=locked_url;

    }
}

function check_for_unlock(){
    const urlvalues = window.location.search;

    const urlparams = new URLSearchParams(urlvalues);
    
    const lurl_hash = urlparams.get('hash');
    
    if(lurl_hash != null){
        document.getElementById("lock-div-id").style.display="none";
        document.getElementById("unlock-div-id").style.display="block";
    }
    else{
        document.getElementById("lock-div-id").style.display="block";
        document.getElementById("unlock-div-id").style.display="none";
    }
}

document.getElementById("unlock_btn").addEventListener("click", unlock, false);

function unlock(){
    const urlvalues = window.location.search;

    const urlparams = new URLSearchParams(urlvalues);
    
    const lurl_hash = urlparams.get('hash').toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    
    if(lurl_hash != null){
    
        console.log("Hash: " + lurl_hash);

        var lurl_key = document.getElementById("lurl_key");
        try{
            var DecryptED = CryptoJS.AES.decrypt(lurl_hash, lurl_key.value);
            if (DecryptED.toString(CryptoJS.enc.Utf8).length > 0) {
                var unlocked_url = DecryptED.toString(CryptoJS.enc.Utf8);
                console.log(unlocked_url)
                window.location.replace(unlocked_url);
            } else {
                alert("URL or Key is incorrect!!!");
            }
        }
        catch(e){
            alert("URL or Key is incorrect!!!");
        }
    }
}




