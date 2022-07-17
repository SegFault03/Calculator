let s='1.2+3.6*5/2.6+4.5#';
let prec={
  '+':0,'-':0,'*':1,'/':2
};
let operand_stack=[],operator_stack=[];
function makeString(numbers,symbols)
{
  let number='';
  for(let i=0;i<s.length;i=i+1)
  {
    if(s[i]=='/'||s[i]=='+'||s[i]=='*'||s[i]=='-'||s[i]=='#')
    {  
      numbers.push(parseFloat(number));
      number='';
      symbols.push(s[i]);
    }
    else
    number+=s[i];
  }
  symbols.pop();
}

function eval()
{
    let l=s.length,i=0;
    let numbers=[],symbols=[];
    makeString(numbers,symbols);
    let expression=[];
    for(i=0;i<numbers.length+symbols.length;i=i+1)
    {
      if(i%2==0)
      {
        //console.log("i: ",i,"item: ",numbers[i/2]);
        expression.push(numbers[i/2]);
      }
      else
      {
        //console.log("i: ",i,"item: ",symbols[(i-1)/2]);
        expression.push(symbols[(i-1)/2]);
      }
    }
    console.log(expression);
}

module.exports={
  prec,operand_stack,operator_stack,eval
};