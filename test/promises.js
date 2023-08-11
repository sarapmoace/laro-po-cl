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

/* ------------ PROMISES ------------ */
readFilePromises(`${__dirname}/../dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`)
    return axios.get(`https:dog.ceo/api/breed/${data}/images/random`)
  }).then(res => {
    console.log(res.data.message)
    return writeFilePromises('dog-img.txt', res.data.message)
  }).then(() => {
    console.log(`Random image save to file`)
  }).catch(err => {
    console.log(err.message)
  });
