let p=false;
let displayText='';
let prec={
    '+':0,'-':1,'*':2,'/':3,'(':-1
  };
let operand_stack=[],operator_stack=[];
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
        evalExp(displayText+')');
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
        if(array[i]==')')
        {
            operand_stack.push(parseFloat(temp));
            while(operator_stack[operator_stack.length-1]!='(')
            {
                a=operand_stack.pop();
                b=operand_stack.pop();
                sym=operator_stack.pop();
                operand_stack.push(eval_op(b,a,sym));
            }
            junk=operator_stack.pop();
        }
        else if(array[i]=='/'||array[i]=='+'||array[i]=='*'||array[i]=='-'||array[i]=='(')
        {
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
    displayText=displayText+"=\n"+operand_stack.pop();
    display();
}
