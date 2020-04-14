{
  ('use strict');

  const titleClickHandler = function (event) { /*titleClickHandler shows article by clicking link*/
    console.log('Link was clicked!');     
    /*[DONE] remove class 'active' from all article links; class 'active' shows articles or titles */
    const activeLinks = document.querySelectorAll('.titles a.active'); // finds links with 'active' class.
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    event.preventDefault(); // code doesn`t guide to page`s element. 'event' as handler.
    const clickedElement = this; //"this" changes meaning.
    clickedElement.classList.add('active');  // to one (clicked) element only.
    console.log('clickedElement:', clickedElement);
    const activeArticles = document.querySelectorAll('.posts article.active');  /* remove class 'active' from all articles */
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');  /* get 'href' attribute from the clicked link */
    console.log('articleSelector: ', articleSelector);
    const targetArticle = document.querySelector(articleSelector); /* find the correct article using the selector (value of 'href' attribute) we`re searching for 1 element.*/
    console.log('targetArticle: ', targetArticle);
    targetArticle.classList.add('active');  /* add class 'active' to the correct article */
  };
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  function generateTitleLinks() {
    console.log('generateTitleLinks works!');
    const titleList = document.querySelector(optTitleListSelector);  /* remove contents of titleList in left column */
    function clearMessages() {
      titleList.innerHTML = '';
    }
    clearMessages();
    const articles = document.querySelectorAll(optArticleSelector);  /* for each article */
    let html = ''; /*create empty variable */
    for (let article of articles) {
      const articleId = article.getAttribute('id');  /* get the article id */
      console.log('articleId: ', articleId);
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;  /* find the title element */
      console.log('articleTitle: ', articleTitle);  /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';  /* create HTML of the link */
      console.log('linkHTML: ', linkHTML);
      html = html + linkHTML;    /* insert link into titleList */
      console.log('html: ', html);
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');   /* links with listeners*/
    console.log('links: ', links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}
