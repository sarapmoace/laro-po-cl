const fs = require('fs')
const axios = require('axios')

const readFilePromises = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file')      
      resolve(data);
    })
  })
} 

const writeFilePromises = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('could not write the file')      
      resolve('success');
    });
  });
};

/* ------------ ASYNC AWAIT ------------ */
const getDogPic = async () => {
  try{ /* Code will try to execute this code here */
    const data = await readFilePromises(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await axios.get(`https://dog.ceo/api/breed/${data}/images/random`)
    console.log(res.data.message)

    await writeFilePromises('dog-img.txt', res.data.message)
    console.log(`Random image save to file`)
  }catch (err){ /* If try fails it will execute code insde catch */
    console.log(err)
  }
}
getDogPic()

const getCatPicWithText = async () => {
  try{
    const res = await axios.get(`https://api.thecatapi.com/v1/images/search`)
    console.log(res.data[0].url)

    await writeFilePromises('cat-img.txt', res.data[0].url)
    console.log(`Random image save to file`)
  }catch(err){
    console.log(err)
  }
}

getCatPicWithText()
