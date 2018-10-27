let seqData;
let extData;
let tisData;

let tax_dict_all = {};
let tax_dict_valid = {};
let filteredTaxa = [];
let tax_array = [];
let final_dic_clean = {};
let filteredkeys = [];


//import tissue file

getData_tis = new XMLHttpRequest();
getData_tis.onreadystatechange = showData_tis;
getData_tis.open('GET', 'Tissues_10.9.csv.json');
getData_tis.send();

function showData_tis() {
  if (getData_tis.readyState === XMLHttpRequest.DONE) {
    if (getData_tis.status !== 200) {
      alert(getData_tis.responseText);
      return;
    }
    tisData = JSON.parse(getData_tis.responseText);
    let tis_921 = document.querySelector('#tis_921');
    Object.keys(tisData[0]).forEach(function(label){
      const option = document.createElement('option');
      option.innerHTML = label;
      tis_921.appendChild(option);
    });

  }
}


//import seq file

getData_seq = new XMLHttpRequest();
getData_seq.onreadystatechange = showData;
getData_seq.open('GET', 'Sequenced_10.9.csv.json');
getData_seq.send();


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

//import extractions file

getData_ext = new XMLHttpRequest();
getData_ext.onreadystatechange = showData_ext;
getData_ext.open('GET', 'Extracts_10.9.csv.json');
getData_ext.send();

function showData_ext() {
  if (getData_ext.readyState === XMLHttpRequest.DONE) {
    if (getData_ext.status !== 200) {
      alert(getData_ext.responseText);
      return;
    }
    extData = JSON.parse(getData_ext.responseText);
    let ext_921 = document.querySelector('#ext_921');
    Object.keys(extData[0]).forEach(function(label){
      const option = document.createElement('option');
      option.innerHTML = label;
      ext_921.appendChild(option);
    });
  }
}

//import taxonomy info

getData_tax = new XMLHttpRequest();
getData_tax.onreadystatechange = showData_tax;
getData_tax.open('GET', 'ButterflyNet2.csv.json');
getData_tax.send();

function showData_tax() {
  if (getData_tax.readyState === XMLHttpRequest.DONE) {
    if (getData_tax.status !== 200) {
      alert(getData_tax.responseText);
      return;
    }
    taxData = JSON.parse(getData_tax.responseText);

  }
}


//filter function

//tax_dict_valid

function filtertax(search_term) {
    search_term = search_term.toLowerCase()
    return Object.keys(final_dic_clean).filter(function (taxon) {
      return taxon.toLowerCase().indexOf(search_term) > -1})
}

//search attachment

document.querySelector('#taxa-search').addEventListener('keyup', function(event){
  filteredkeys = filtertax(event.target.value)
  //console.log(event.target.value)
  console.log(filteredkeys)
  
})



//console.log(tax_dict_valid)

//do things with button

document.querySelector('#first_button').addEventListener('click', function(){
  //combine tax into list of lists
  
    taxData.forEach(function(row){if (row.Synonyms != null) {
    tax_array.push(row.ValidName.split(", ").concat(row.Synonyms.split(", ")))
    } else {
      tax_array.push(row.ValidName.split(", "))
    }
    });
  
  count = 0;
  tax_array.forEach(row => {
    row.forEach(name => {
      tax_dict_all[name] = count
      });
    count += 1
    });
  
//  console.log(tax_dict_all)
  
  count = 0;
  tax_array.forEach(row => {
      tax_dict_valid[count] = row[0]
    count += 1
    });
    
  //make a dic where all names are keys and IDs are values - done
  //make a dic where only valid names (not syn) are keys and IDs are values - done
  
  // need a dic of everything with key being valid_name - fields being ones chosen
  // then can loop through dic and find IDs for each name and put into new dic with IDs as key and fields as values
  // then loop through and pull out valid names
  
  // combine tis and ext files
  
 // add idenitifiers to column headers
  tisData_iden = tisData;
  tisData = JSON.parse(getData_tis.responseText);
  tisData_iden.forEach(row => {
    Object.keys(row).forEach(key => {
      row[key.concat("_tis")] = row[key];
      delete row[key];
      })
    });

  
  extData_iden = extData;
  extData = JSON.parse(getData_ext.responseText);
  extData_iden.forEach(row => {
  Object.keys(row).forEach(key => {
    row[key.concat("_ext")] = row[key];
    delete row[key];
    })
  });
  
  seqData_iden = seqData;
  seqData = JSON.parse(getData_seq.responseText);
  seqData_iden.forEach(row => {
  Object.keys(row).forEach(key => {
    row[key.concat("_seq")] = row[key];
    delete row[key];
    })
  });
  
    
  
  //making a dictionary here - makes a list as the values so can have multiple entries per ID
  //makes dictionary with IDs as keys
  let tis_dict = {};
  tisData_iden.forEach(function(row){
    if(tis_dict[row.SampleID_tis] == null) {
      rec = []
      rec.push(row)
      tis_dict[row.SampleID_tis] = rec
      } else {
        rec = tis_dict[row.SampleID_tis]
        rec.push(row)
        tis_dict[row.SampleID_tis] = rec
        }});
  

  let ext_dict = {};
  extData_iden.forEach(function(row){
    if(ext_dict[row.ID_ext] == null) {
      rec = []
      rec.push(row)
      ext_dict[row.ID_ext] = rec
      } else {
        rec = ext_dict[row.ID_ext]
        rec.push(row)
        ext_dict[row.ID_ext] = rec
        }
        });
  
  
  let seq_dict = {};
  seqData_iden.forEach(function(row){
    if(seq_dict[row.BNet_UI_seq] == null) {
      rec = []
      rec.push(row)
      seq_dict[row.BNet_UI_seq] = rec
      } else {
        rec = seq_dict[row.BNet_UI_seq]
        rec.push(row)
        seq_dict[row.BNet_UI_seq] = rec
        }});
  



  
  
  //gets list of selected fields
  const tis921 = document.getElementById("tis_921");
  const tis_fields = Array.from(tis921).filter(opt => opt.selected).map(opt => opt.value);
  const ext921 = document.getElementById("ext_921");
  const ext_fields = Array.from(ext921).filter(opt => opt.selected).map(opt => opt.value);
  const seq921 = document.getElementById("seq_921");
  const seq_fields = Array.from(seq921).filter(opt => opt.selected).map(opt => opt.value);

  //add identifiers to chosen fields
  count = 0
  tis_fields.forEach(field => {
    tis_fields[count] = field.concat("_tis")
    count += 1
  });
  
  count = 0
  ext_fields.forEach(field => {
    ext_fields[count] = field.concat("_ext")
    count += 1
  });
  
  count = 0
  seq_fields.forEach(field => {
    seq_fields[count] = field.concat("_seq")
    count += 1
  });

  
  //makes a set of all selected fields
  let allFields = new Set(tis_fields.concat(ext_fields, seq_fields));
  
  //list of all the keys
  let allKeys = Object.keys(tis_dict);
  allKeys = allKeys.concat(Object.keys(ext_dict));
  
  //console.log(allKeys.length)
  //creates a blank record with all fields
  const defaultRec = {};

  Object.keys(tisData_iden[0]).forEach(key => defaultRec[key] = '');
  Object.keys(extData_iden[0]).forEach(key => defaultRec[key] = '');

 
 
 // creates combined dic with all fields
 /////////////////////idk why im missing 3000 keys

  let combined_dict = {};
  
  allKeys.forEach(key => {
    full_rec = []
    if (tis_dict[key] != undefined && ext_dict[key] != undefined) {
      tis_dict[key].forEach(tis_rec => {
        ext_dict[key].forEach(ext_rec => {
          full_rec.push(Object.assign({}, defaultRec, tis_rec, ext_rec))
          })
        })
    }
    
    if (tis_dict[key] == undefined && ext_dict[key] != undefined) {
      ext_dict[key].forEach(ext_rec => {
        full_rec.push(Object.assign({}, defaultRec, ext_rec))
        })
    }
    
    if (tis_dict[key] != undefined && ext_dict[key] == undefined) {
      tis_dict[key].forEach(tis_rec => {
          full_rec.push(Object.assign({}, defaultRec, tis_rec))
        })
    }
    
    combined_dict[key] = full_rec
  });
  
  
  
  //console.log(allKeys.length)
  //console.log(Object.keys(combined_dict).length)
   
  
//switches so BNet IDs are keys
//losing those without IDs (both in tis and ext)
//losing those without BnetIDs (both in ext and seq)
//losing those without IDs and Bnets (ext)
//IDs not matching b/c case sensetive
//LEP- vs "LEP " in tissues

  let tis_ext_dict = {};
//  
  Object.keys(combined_dict).forEach(key => {
    combined_dict[key].forEach(comb_rec => {
    bnet_key = comb_rec.BNetUI_ext;
    if(tis_ext_dict[bnet_key] == null) {
      rec = []
      rec.push(comb_rec)
      tis_ext_dict[bnet_key] = rec
      } else {
        rec = tis_ext_dict[bnet_key]
        rec.push(comb_rec)
        tis_ext_dict[bnet_key] = rec
      }
    });
  });


  //list of all the Bnet IDs
  let allBKeys = Object.keys(tis_ext_dict);
  allBKeys = allBKeys.concat(Object.keys(seq_dict));
  
  //creates a blank record with all fields

  Object.keys(seqData_iden[0]).forEach(key => defaultRec[key] = '');

//combine seq into
  let combined_dict_all = {};
  
  allBKeys.forEach(key => {
    full_rec = []
    if (tis_ext_dict[key] != undefined && seq_dict[key] != undefined) {
      tis_ext_dict[key].forEach(tis_ext_rec => {
        seq_dict[key].forEach(seq_rec => {
          full_rec.push(Object.assign({}, defaultRec, tis_ext_rec, seq_rec))
          })
        })
    }
    
    if (tis_ext_dict[key] == undefined && seq_dict[key] != undefined) {
      seq_dict[key].forEach(seq_rec => {
        full_rec.push(Object.assign({}, defaultRec, seq_rec))
        })
    }
    
    if (tis_ext_dict[key] != undefined && seq_dict[key] == undefined) {
      tis_ext_dict[key].forEach(tis_ext_rec => {
          full_rec.push(Object.assign({}, defaultRec, tis_ext_rec))
        })
    }
    
    combined_dict_all[key] = full_rec
  });

//change so key is name

  let final_dict = {};
  let nonmatching_names_tis_ext = {};
  
//  
  Object.keys(combined_dict_all).forEach(key => {
    combined_dict_all[key].forEach(comb_rec => {
       // if the three valid names are not null and are the same
      if (comb_rec.UsrValidName_tis == comb_rec.FullName_ext
          && comb_rec.UsrValidName_tis == comb_rec.FullName_seq
          && comb_rec.UsrValidName_tis != null) {
          name_key = comb_rec.UsrValidName_tis;
          if(final_dict[name_key] == null) {
            rec = []
            rec.push(comb_rec)
            final_dict[name_key] = rec
            } else {
              rec = final_dict[name_key]
              rec.push(comb_rec)
              final_dict[name_key] = rec
              }
      };
      
  // if the tissue name and ext name are the same and seq name is diff
      if (comb_rec.UsrValidName_tis == comb_rec.FullName_ext &&
          comb_rec.UsrValidName_tis != comb_rec.FullName_seq) {
          name_key = comb_rec.UsrValidName_tis;
          if(tis_ext_dict[name_key] == null) {
            rec = []
            rec.push(comb_rec)
            tis_ext_dict[name_key] = rec
            } else {
              rec = tis_ext_dict[name_key]
              rec.push(comb_rec)
              tis_ext_dict[name_key] = rec
              }       
      }
      
  // if the tissue name and seq name are the same and ext name is diff
      if (comb_rec.UsrValidName_tis == comb_rec.FullName_seq &&
          comb_rec.UsrValidName_tis != comb_rec.FullName_ext) {
          name_key = comb_rec.UsrValidName_tis;
          if(tis_ext_dict[name_key] == null) {
            rec = []
            rec.push(comb_rec)
            tis_ext_dict[name_key] = rec
            } else {
              rec = tis_ext_dict[name_key]
              rec.push(comb_rec)
              tis_ext_dict[name_key] = rec
              }       
      }
      
  // if the ext name and seq name are the same and tissue name is diff
      if (comb_rec.FullName_ext == comb_rec.FullName_seq &&
          comb_rec.UsrValidName_tis != comb_rec.FullName_ext) {
          name_key = comb_rec.FullName_ext;
          if(tis_ext_dict[name_key] == null) {
            rec = []
            rec.push(comb_rec)
            tis_ext_dict[name_key] = rec
            } else {
              rec = tis_ext_dict[name_key]
              rec.push(comb_rec)
              tis_ext_dict[name_key] = rec
              }       
      }

  // if all 3 are different (one can be null)
  //    console.log(combined_dict["LEP-67764"].UsrValidName_tis != "" || combined_dict["LEP-67764"].UsrValidName_tis != null)
      if (comb_rec.UsrValidName_tis != comb_rec.FullName_ext
          && comb_rec.UsrValidName_tis != comb_rec.FullName_seq
          && comb_rec.FullName_ext != comb_rec.FullName_seq) {
          name_key = key
          if(nonmatching_names_tis_ext[name_key] == null) {
            rec = []
            rec.push(comb_rec)
            nonmatching_names_tis_ext[name_key] = rec
            } else {
              rec = nonmatching_names_tis_ext[name_key]
              rec.push(comb_rec)
              nonmatching_names_tis_ext[name_key] = rec
              } 
      }
    });
  });
  
  
//  console.log(final_dict)
  
  
// takes out nonspecified fields
//check to see if going through multiple records

   Object.keys(final_dict).forEach(key => {
    const rec = {};
    final_dict[key].forEach(record => {
      Object.keys(record)
        .filter(field => allFields.has(field))
        .forEach(field => rec[field] = record[field]);  
    });
    final_dic_clean[key] = rec;
   });
   
   let final_dict_IDs = {};
   
   
   //checks synonyms in Lamas list - but do we want species not in list?
   Object.keys(final_dic_clean).forEach(key => {
      if (tax_dict_all[key] != undefined){
        final_dict_IDs[tax_dict_all[key]] = final_dic_clean[key]
      } else {
        final_dict_IDs[key] = final_dic_clean[key]
      };
   });
   
   let final_syn_dict = {}

   Object.keys(final_dict_IDs).forEach(key => {
    if (tax_dict_valid[key] != undefined) {
        final_syn_dict[tax_dict_valid[key]] = final_dict_IDs[key]
    } else {
      final_syn_dict[key] = final_dict_IDs[key]
    }
   });
   
   
   //console.log(final_syn_dict)
   
   outtext = "Species"
   allFields.forEach(field => {
    outtext = outtext.concat( ", ", field.split("_")[0])
   });
   outtext = outtext.concat("\n");
   

   
   Object.keys(final_syn_dict).forEach(key => {
    outtext = outtext.concat(key)
    Object.keys(final_syn_dict[key]).forEach(record => {
      outtext = outtext.concat(", ", final_syn_dict[key][record])
    })
    outtext = outtext.concat("\n")
   })
   
   
  var a = document.getElementById("a");
  var file = new Blob([outtext], {type: "text/plain"});
  a.href = URL.createObjectURL(file);
  a.download = "test.csv";
//     
//   
//   Object.keys(combined_dict).forEach(key => {
//    console.log(key)
//    console.log(combined_dict[key])
//   });
})
//
