//util=require("./test")
let p=false;
let displayText='';
//let reset=true;
function power()
{
    document.getElementById('info').innerHTML='There you go!';
    p=!(p);
    if(p)
    displayText=0;
    else
    displayText='';
    display();
}

function update(value)
{
    if(!p)
    return;
    document.getElementById('info').innerHTML='Have fun!';
    if(isNaN(value)&&value!='-'&&value!='=')
    displayText+=value.toString();
    else if(value=='=')
    {

    }
    else
    {
        if(displayText=='0')
        displayText=value.toString();
        else
        displayText+=value.toString();
    }
    display();
}

function display()
{
    document.getElementById('display').innerHTML=displayText;
}