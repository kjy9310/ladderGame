var idNum = 0;
var arra=[];
var num=0;
var ladderArray=[];
function getRandomNumber(min, max) {
    return parseInt( Math.random() * (max - min) + min )
}

function makeLine(line=" ", id){
    const div = document.createElement("div")
    div.id = id
    const innerDiv1 = document.createElement("div")
    const innerDiv2 = document.createElement("div")
    div.appendChild(innerDiv1)
    div.appendChild(innerDiv2)
    switch(line){
        case "|":
            div.className="vertical ladder"
            return div
        case "-":
            div.className="horizontal ladder"
            return div
        case " ":
            div.className="empty ladder"
            return div
    }
}

function makeLadderArray(width=1,height=10){
    let array2Return = []
    //y 축
    for(let y=0; y<height; y++){
        array2Return[y] = [] 
        // x 축
        for(let x=0; x<width*2-1; x++){
            // 위아래랑 옆으로 선 두가지로 나눔
            if (x%2===0){
                array2Return[y][x] = makeLine("|", `${y}-${x}`)
            } else {
                // 가로선을 넣을지말지 판단
                if (getRandomNumber(1,10)>=7){
                    array2Return[y][x] = makeLine("-", `${y}-${x}`)
                } else {
                    array2Return[y][x] = makeLine(" ", `${y}-${x}`)
                }
            }
        }
    }
    array2Return[height] = [] 
    for(let x=0; x<width*2-1; x++){
        if (x%2===0){
            array2Return[height][x] = makeLine("|", `${height}-${x}`)
        } else {
            array2Return[height][x] = makeLine(" ", `${height}-${x}`)
        }
    }
    return array2Return
}

function drawLadder(){
    document.getElementById('ladder-result').innerHTML=""

    const nameList = document.getElementsByName('name')
    const nameRow = document.createElement('div')
    nameRow.className="row"
    nameList.forEach((name,index)=>{
        const nameCol = document.createElement('div')
        nameCol.className = "ladder name"
        nameCol.innerHTML = name.value
        nameCol.onclick=()=>pathFinder(index===0?index:(index*2))
        nameRow.appendChild(nameCol)
    })

    const targetList = document.getElementsByName('target')
    const targetRow = document.createElement('div')
    targetRow.className="row"
    targetList.forEach((target)=>{
        const nameCol = document.createElement('div')
        nameCol.className = "ladder"
        nameCol.innerHTML = target.value
        targetRow.appendChild(nameCol)
    })
    
    var outerDiv = document.createElement('div')
    outerDiv.appendChild(nameRow)
    const height = ladderArray.length
    for(let y=0; y<height; y++){
        const row = document.createElement('div')
        row.className="row"
        ladderArray[y].forEach((div)=>{
            div.classList.remove('active')
            row.appendChild(div)
        })
        outerDiv.appendChild(row)
    }
    outerDiv.appendChild(targetRow)
    document.getElementById('ladder-result').appendChild(outerDiv)
}

window.onload=function(){
    var ok=document.getElementById("ok");
    
    var start=document.getElementById("start");
    
    ok.onclick=function(){
        const settings = document.getElementById('settings')
        settings.style.visibility="visible";
        num=document.getElementById("num").value;
        var show="<table border id='input'>";
        show+=`<tr>
            <th>no</th>
            <th>이름</th>
            <th>항목</th>
        </tr>`
        for(var i=0; i<num; i++){
            show+=`<tr>
                <td>${(i+1)}</td>
                <td>
                    <input type='text' name='name'>
                </td>
                <td>
                    <input type='text' name='target'>
                </td>
            </tr>`
        }
        show+="</table>";
        
        document.getElementById("setting-table").innerHTML=show;			
    }

    start.onclick=function(){
        const nameList = document.getElementsByName('name')
        ladderArray = makeLadderArray(nameList.length)
        setTimeout(()=>{
            drawLadder()
        }, 500)
    }
}

function pathFinder(nameIndex){
    drawLadder()
    setTimeout(()=>{
        let startX = nameIndex
        for(let y=0;y<ladderArray.length;y++){
            console.log(`${y}-${startX}`)
            const div = document.getElementById(`${y}-${startX}`)
            div.className+=' active'
            if(ladderArray[y][startX+1]&&ladderArray[y][startX+1].className=="horizontal ladder"){
                const div = document.getElementById(`${y}-${startX+1}`)
                div.className+=' active'
                startX=startX+2
            }else if(ladderArray[y][startX-1]&&ladderArray[y][startX-1].className=="horizontal ladder"){
                while (ladderArray[y][startX-1]&&ladderArray[y][startX-1].className=="horizontal ladder"){
                    const div = document.getElementById(`${y}-${startX-1}`)
                    div.className+=' active'
                    startX=startX-2
                }
            }else{
                wasMovedRight=false
            }
        }
    }, 500)
    
}

   
function chResult(){
    var tr = document.getElementsByTagName("tr");
    var i = parseInt(num)+2;
    var j = parseInt(this.id);
    var inter = null;
    var finish=tr[i].childNodes[j].innerHTML;

    tr[i].childNodes[j].innerHTML=3;
    inter=setInterval(function(){
    if(tr[i].childNodes[j-1]&&tr[i].childNodes[j-1].innerHTML=="ㅡ"){
        j=j-2;
    }
    else if(tr[i].childNodes[j+1]&&tr[i].childNodes[j+1].innerHTML=="ㅡ"){
        j=j+2;

    }
        finish=tr[++i].childNodes[j].innerHTML;
        tr[i].childNodes[j].innerHTML=3;
        if(finish!="|" && finish!="ㅡ"){
            alert(finish);
            clearInterval(inter);
        }
    },100);
}