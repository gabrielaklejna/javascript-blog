'use strict';
  const titleClickHandler = function(event){
    const clickedElement = this;

    console.log('Link was clicked!');
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let link of activeLinks) {
      link.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
  
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for(let article of activeArticles) {
      article.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href'); //#article-1
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(href);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  console.log();
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  titleList = document.querySelector(optTitleListSelector).innerHTML = '';

  /* for each article */
  const articles = titleList.querySelector('.post');
   for (let article of articles){
    article.titleList.remove(optTitleListSelector); 
    /* get the article id */
    const articleId = '.id';
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* typo wyszukuje post-title i innerHTML moze go modykifowac  *

    /* get the title from the title element */
    articleTitle.titleList.add(optTitleSelector);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log();
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

function generateTags(){
  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();