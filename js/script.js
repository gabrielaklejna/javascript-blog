'use strict';
  const titleClickHandler = function(event){
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* remove class 'active' from all article links  */
   const activeLinks = document.querySelectorAll('.titles a.active')
   for( let link of activeLinks){
    link.classList.remove('active');
   }
    /* add class 'active' to the clicked link */
   clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('post.active');
    for(let article of activeArticles) {
     article.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
   const href = clickedElement.getAttribute('href');
    /* find the correct article using the selector (value of 'href' attribute) */
   const targetArticle = document.querySelector('href');
    /* add class 'active' to the correct article */
   targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }