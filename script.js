getData_seq = new XMLHttpRequest();

getData_seq.onreadystatechange = showData;
getData_seq.open('GET', 'Seq_9.21.csv.json');
getData_seq.send();

let seqData;
let seqExt;

function showData() {
  if (getData_seq.readyState === XMLHttpRequest.DONE) {
    if (getData_seq.status !== 200) {
      alert(getData_seq.responseText);
      return;
    }
    seqData = JSON.parse(getData_seq.responseText);
    let seq_921 = document.querySelector('#seq_921');
    Object.keys(seqData[0]).forEach(function(label){
      const option = document.createElement('option');
      option.innerHTML = label;
      seq_921.appendChild(option);
    });

  }
}

getData_ext = new XMLHttpRequest();

getData_ext.onreadystatechange = showData_ext;
getData_ext.open('GET', 'Extractions_9.21.csv.json');
getData_ext.send();

function showData_ext() {
  if (getData_ext.readyState === XMLHttpRequest.DONE) {
    if (getData_ext.status !== 200) {
      alert(getData_ext.responseText);
      return;
    }
    seqExt = JSON.parse(getData_ext.responseText);
    let seq_921 = document.querySelector('#ext_921');
    Object.keys(seqExt[0]).forEach(function(label){
      const option = document.createElement('option');
      option.innerHTML = label;
      ext_921.appendChild(option);
    });

  }
}


document.querySelector('#first_button').addEventListener('click', function(){
  let seq_dict = {};
  seqData.forEach(function(row){seq_dict[row.BNet_UI] = row});
  Object.keys(seq_dict).forEach(function(key){
    //console.log(key);
    //console.log(seq_dict[key])
    })
  let ext_dict = {};
  seqData.forEach(function(row){ext_dict[row.BNet_UI] = row});
  
  let combined_dict = {};
  Object.keys(ext_dict).forEach(function(key){
    combined_dict[key] = Object.assign(ext_dict[key], seq_dict[key]);
  })
  
   Object.keys(combined_dict).forEach(function(key){
    console.log(key);
    console.log(combined_dict[key])
    })
   
   
})

