const fs = require('fs')

let files = fs.readdirSync('folder');

//star_1.svg 형태여야 한다.
const fillZero = (width, str) => {
  return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}


let duplicatedListFile = fs.readFileSync('list.txt', {encoding: 'utf-8'})

let duplicated = duplicatedListFile.trim()


duplicated = duplicatedListFile.split('\n').map(v => {
  return v.trim()
})

// console.log(duplicated)

let duplicatedMap = {}
duplicated.forEach(file => {
  duplicatedMap[file]=true;
})


files.forEach(file => {
  let [filename, ext] = file.split('.');

  const [shape, filenumber] = filename.split('_')
  filename = `shape.${shape}.${fillZero(3, filenumber)}.${ext}`
  console.log(filename)

  if(duplicatedMap[filename]){
  }else{
    fs.copyFile('./folder/' + file ,'./result/' + filename, function(err){
    if(err) console.log('something wrong was happened')
    else console.log('copy file succeed');
    })
    duplicatedListFile += filename + "\n";
  }
})

let mainListFile = ""
duplicatedListFile.trim().split('\n').map(v => {
  mainListFile += "shape/" + v + "\n"; 
})

fs.writeFile('new.txt', duplicatedListFile, (err)=> {
  if(err) {
    console.error(err);
  }
})

fs.writeFile('main.new.txt', mainListFile, (err) => {
  if(err) {
    console.error(err)
  }
})

