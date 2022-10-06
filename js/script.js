'use strict';

const articleLinkTemplate = document.querySelector('#template-article-link').innerHTML;
const tplArticleLink = Handlebars.compile(articleLinkTemplate);

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
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optAuthorsSelector = 'post-author' ,
  optAuthorsListSelector = 'author-name';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; 

    /* create HTML of the link */
    const linkHTML = tplArticleLink({ articleId: articleId, articleTitle: articleTitle });

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
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      const linkHTML = tplArticleLink({articleTags:articleTags, articleTagsArray:articleTagsArray});

      /* add generated code to html variable */
      html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;
        }
        else {
          allTags[tag]++;

        }

    /* END LOOP: for each tag */
    }

    tagsWrapper.innerHTML = html;
  }
  
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      let className = "";

      if (allTags[tag] < 2) {
        className = "tag-size-1";
      } 
      else if (allTags[tag] < 4) {
        className = "tag-size-2";
      }
      else if (allTags[tag] < 6) {
        className = "tag-size-3";
      }
      else if (allTags[tag] < 7) {
        className = "tag-size-4"; 
      } else {
        className = "tag-size-5";
      }

     /* [NEW] generate code of a link and add it to allTagsHTML */
     allTagsHTML += '<li><a class="' + className + '" href="#tag-' + tag  + '"><span>' + tag + ' (' + allTags[tag] + ')</span></a></li>';
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');  //#tag-cat

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", ""); //#tag-cat -> cat

  /* find all tag links with class active */
  const linksActive = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(const link of linksActive) {
    link.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const relatedLinks = document.querySelectorAll('a[href="'+ href +']"');
  for(const link of relatedLinks) {
    link.classList.add('active');
  }

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]')

  /* START LOOP: for each link */
  for(const link of links) {
    link.addEventListener("click", tagClickHandler);
  }
  
}

generateTags();
addClickListenersToTags();


function generateAuthors(){

  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
     const authorsWrapper = article.querySelector(optAuthorsSelector);
    let html = '';
    const authors = article.getAttribute('data-authors');
    const authorsArray = authors.split(' '); 
    for(let author of authorsArray){
      const linkHTML = tplArticleLink({ authors:authors, authorsArray:authorsArray });
      html = html + linkHTML;
        if(!allAuthors[author]) {
          allAuthors[author] = 1;
        }
        else {
          allAuthors[author]++;
        }
    }
    authorsWrapper.innerHTML = html;
  }
    const authorsList = document.querySelector(optAuthorsListSelector);
    let allAuthorsHTML = '';
    for(let author in allAuthors){
      let className = "";
      allAuthorsHTML += '<li><a class="' + className + '.author-name' + author  + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li>';
    }
    authorList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');  
  const tag = href.replace("#author-", ""); 
  const linksActive = document.querySelectorAll('a.active[href^="#author-"]');
  for(const link of linksActive) {
    link.classList.remove('active');
  }
  const relatedLinks = document.querySelectorAll('a[href="'+ href +']"');
  for(const link of relatedLinks) {
    link.classList.add('active');
  }
  generateTitleLinks('[data-authors~="' + author + '"]');
}

function addClickListenersToAuthors(){
  const links = document.querySelectorAll('a[href^="#author-"]')
  for(const link of links) {
    link.addEventListener("click", authorClickHandler);
  }
}

generateAuthors();
addClickListenersToAuthors();