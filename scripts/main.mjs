let p=false;
let displayText='';
let prec={
    '+':0,'-':1,'*':2,'/':3,'(':-1
  };
let operand_stack=[],operator_stack=[];
let history={};
//let reset=true;
function power()
{
    document.getElementById('history-display').innerHTML='';
    document.getElementById('info').innerHTML='There you go!';
    p=!(p);
    if(p)
    displayText=0;
    else
    displayText='';
    display();
}

function reset()
{
    if(!p)
    return;
    displayText='0';
    display();
}

function update(value)
{
    if(!p)
    return;
    document.getElementById('info').innerHTML='Have fun!';
    if(displayText.toString().indexOf('Ans')!=-1)                   //if Ans is present
    displayText=displayText.substring(displayText.indexOf('=')+1);
    if(displayText=='0')                                            //if displayText is 0 (Entering for the first time)
    {
        if(isNaN(value)&&value!='='&&value!='('&&value!=')')        //if value is not a number
        displayText+=value.toString();
        else
        displayText=value.toString();
    }
    else if(value=='=')
    evalExp(displayText+')');
    else                                                            
    displayText+=value.toString();
    display();
}

function updateDisplay(full_exp)
{
    let key=full_exp.substring(0,full_exp.indexOf('='));
    let children=document.getElementById('history-display').children;
    let str='',temp='';
    for(let i=0;i<children.length;i++)
    {
        temp=children[i].innerHTML;
        if(temp.substring(0,temp.indexOf('='))!=key)
        str+=temp+'<br>';
        else
        break;
    }
    document.getElementById('history-display').innerHTML=str;
}

function display()
{
    document.getElementById('display').innerHTML=displayText;
}

function displayHistory(oldDisplayText)
{
    let par=document.getElementById('history-display');
    let child=document.createElement('p');
    child.innerHTML=oldDisplayText+' = '+history[oldDisplayText];
    child.className='history-view';
    //child.onclick=updateDisplay(child.innerHTML);
    par.appendChild(child);
}

function eval_op(a,b,op)
{
    let c=0;
    switch (op) {
        case '+':
            c=a+b;
            break;
        
        case '-':
            c=a-b;
            break;
        
        case '/':
            c=a/b;
            break;

        case '*':
            c=a*b;
            break;

        default:
            break;
    }
    return c;
}

function evalExp(array)
{
    let i=0,temp='',a=0,b=0,junk='';
    let l=array.length;
    operator_stack.push('(');
    for(i=0;i<l;i++)
    {
        if(array[i]=='(')
        {
            if(temp!='')
            operand_stack.push(parseFloat(temp));
            operator_stack.push(array[i]);
            temp='';
        }
        else if(array[i]==')')
        {
            if(temp!='')
            operand_stack.push(parseFloat(temp));
            while(operator_stack[operator_stack.length-1]!='(')
            {
                a=operand_stack.pop();
                b=operand_stack.pop();
                sym=operator_stack.pop();
                operand_stack.push(eval_op(b,a,sym));
            }
            junk=operator_stack.pop();
            temp='';
        }
        else if(array[i]=='/'||array[i]=='+'||array[i]=='*'||array[i]=='-')
        {
            if(temp!='')
            operand_stack.push(parseFloat(temp));
            while(operator_stack.length!=0&&prec[operator_stack[operator_stack.length-1]]>=prec[array[i]])
            {
                a=operand_stack.pop();
                b=operand_stack.pop();
                sym=operator_stack.pop();
                operand_stack.push(eval_op(b,a,sym));
            }
            operator_stack.push(array[i]);
            temp='';
        }
        else
        temp+=array[i];
    }
    history[displayText]=operand_stack[0];
    let oldDisplayText=displayText;
    displayText="Ans:="+operand_stack.pop();
    display();
    displayHistory(oldDisplayText);
}
