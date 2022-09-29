'use strict';
  const titleClickHandler = function(event){
    event.preventDefault();
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
  
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* typo wyszukuje post-title i innerHTML moze go modykifowac  *

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log();
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {

    /* find tags wrapper */
     const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
     
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); //design tutorials -> ["design", "tutorials"];

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
  
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag  + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

    /* END LOOP: for each tag */
    }

    tagsWrapper.innerHTML = html;
  }
}


generateTags();