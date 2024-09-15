function randomvrot(){
    randomVar_1 = Math.ceil(Math.random() * 700);
    randomVar_2 = Math.ceil(Math.random() * 700);
    randomVar_3 = Math.ceil(Math.random() * 700);
    randomVar_4 = Math.ceil(Math.random() * 700);
    // console.log(randomVar);

    var x = document.getElementsByClassName("class-first");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.fontVariationSettings = '"vrot" ' + randomVar_1;
    }

    var y = document.getElementsByClassName("class-second");
    var h;
    for (h = 0; h < y.length; h++) {
        y[h].style.fontVariationSettings = '"vrot" ' + randomVar_2;
    }

    var z = document.getElementsByClassName("class-third");
    var k;
    for (k = 0; k < z.length; k++) {
        z[k].style.fontVariationSettings = '"vrot" ' + randomVar_3;
    }

    var t = document.getElementsByClassName("class-forth");
    var j;
    for (j = 0; j < t.length; j++) {
        t[j].style.fontVariationSettings = '"vrot" ' + randomVar_4;
    }

    setTimeout(function(){ randomvrot(); }, 2500);
}
setTimeout(function(){ randomvrot(); }, 500);
