{
  ("use strict");

  const titleClickHandler = function (event) {
    console.log("Link was clicked!");
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }
    /*[DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    clickedElement.classList.add("active");
    console.log("clickedElement:", clickedElement);
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }
    /*[DONE]  get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log("articleSelector: ", articleSelector);
    /*[DONE]  find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log("targetArticle: ", targetArticle);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add("active");
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list",
    optArticleAuthorSelector = ".post-author";

  function generateTitleLinks(customSelector = '') {   // '' means defualt value
    console.log("generateTitleLinks works!");
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages() {
      titleList.innerHTML = "";
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log("customSelector: ", customSelector);
    let html = "";
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute("id");
      console.log("articleId: ", articleId);
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */
      console.log("articleTitle: ", articleTitle);
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log("linkHTML: ", linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;
      console.log("html: ", html);
    }
    titleList.innerHTML = html;
    /* links with listeners*/
    const links = document.querySelectorAll(".titles a");
    console.log("links: ", links);
    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }

  generateTitleLinks(); //no argument, so it shows all title links



  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector); 
    console.log("articles: ", articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");
      console.log("articleTags: ", articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log("articleTagsArray: ", articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log("tag: ", tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>&nbsp"; 
        console.log("linkHTML: ", linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML; /* insert link */
        console.log("html: ", html);
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagWrapper.innerHTML = html;
        console.log("tagWrapper: ", tagWrapper);
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log("href: ", href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log("tag: ", tag);
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log("tagLinks: ", tagLinks);
    /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
      /* remove class active */
      tagLink.classList.remove("active");
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant (clicked element) */
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log("foundTagLinks: ", foundTagLinks);
    /* START LOOP: for each found tag link */
    for(let foundTagLink of foundTagLinks){
      /* add class active */
      foundTagLink.classList.add("active");
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector (tag) as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]'); //it shows title links with selected tag
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".list-horizontal a");
    /* START LOOP: for each link */
    for (let linkToTag of linksToTags) {
      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector); 
    console.log("articles: ", articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const author = article.getAttribute("data-author");
    console.log("author: ", author);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + author + '"><span>' + author + "</span></a></li>"; 
    console.log("linkHTML: ", linkHTML);
    html = html + linkHTML; /* insert link */
    console.log("html: ", html);
    authorWrapper.innerHTML = html;
    console.log("authorWrapper: ", authorWrapper);
    } //END LOOP: for every article.
  }
  
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log("href: ", href);
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log("author: ", author);
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log("authorLinks: ", authorLinks);
    /* START LOOP: for each active tag link */
    for(let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove("active");
    /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant (clicked element) */
    const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log("foundAuthorLinks: ", foundAuthorLinks);
    /* START LOOP: for each found tag link */
    for(let foundAuthorLink of foundAuthorLinks){
      /* add class active */
      foundAuthorLink.classList.add("active");
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector (author) as argument */
    generateTitleLinks('[data-author="' + author + '"]'); //it shows title links with selected author
  }
  
  function addClickListenersToAuthors(){
    /* find all links to tags */
    const linksToAuthor = document.querySelectorAll(".post-author a");
    /* START LOOP: for each link */
    for (let linkToAuthor of linksToAuthor) {
      /* add tagClickHandler as event listener for that link */
      linkToAuthor.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();
  
}
