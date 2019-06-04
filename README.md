## Cell-Counting-Tool
Ai powered web app to automatically count cells on a cell mask microscopy image - Tensorflow.js
<br>

Live Web App: http://cellcount.test.woza.work/

<br>

Cell counting drives research. Everything from answering basic biological questions to clinical trials depend on it. Yet the process is still manual, tedious and time consuming. 

This is a prototype for an online tool that can automatically count the cells on a cell microscopy mask image. Because this app requires mask images this isn't a solution that can be deployed in practice. This model is also a bit unstable. However, this project does demonstrate the process for building and deploying an online cell counting tool. I built this while testing some ideas. I wasn't planning to deploy it online. However, I learned a lot of valuable lessons during this project so I decided to deploy it and publish the code in order to capture those lessons. 


The process used to build and train the model is described in this Kaggle kernel:
https://www.kaggle.com/vbookshelf/simple-cell-counter-with-web-interface

The dataset used for the training can be found here:<br>
https://www.kaggle.com/vbookshelf/synthetic-cell-images-and-masks-bbbc005-v1

All javascript, html and css files used to create the web app are available in this repo.
