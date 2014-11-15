Promises
========

Basic code for displaying native promises

tl;dr return a Promise object from every async method 

A Promise Object in compatible/polyfilled browsers can be called like so:

  return new Promise(function(accept,reject){
        if (condition)
          accept()
        else 
          reject()
    });
