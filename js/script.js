{
  ("use strict");
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector("#template-article-link").innerHTML
    ),
    artTagLink: Handlebars.compile(
      document.querySelector("#template-tag-link").innerHTML
    ),
    authorLink: Handlebars.compile(
      document.querySelector("#template-author-link").innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector("#template-tag-cloud-link").innerHTML
    ),
    tagAuthorLink: Handlebars.compile(
      document.querySelector("#template-author-cloud-link").innerHTML
    ),
  };

  const opt = {
    articleSelector: ".post",
    titleSelector: ".post-title",
    titleListSelector: ".titles",
    articleTagsSelector: ".post-tags .list",
    articleAuthorSelector: ".post-author",
    cloudClassCount: "5",
    cloudClassPrefix: "tag-size-",
    authorsListSelector: ".authors.list",
    tagsListSelector: ".tags.list",
  };

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

  function generateTitleLinks(customSelector = "") {
    // '' means defualt value
    console.log("generateTitleLinks works!");
    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    function clearMessages() {
      titleList.innerHTML = "";
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(
      opt.articleSelector + customSelector
    );
    console.log("customSelector: ", customSelector);
    let html = "";
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute("id");
      console.log("articleId: ", articleId);
      /* find the title element */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      /* get the title from the title element */
      console.log("articleTitle: ", articleTitle);
      /* create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
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

  function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };
    for (let tag in tags) {
      console.log(tag + " is used " + tags[tag] + " times");
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      } else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const classNumber = Math.floor(
      ((count - params.min) / (params.max - params.min)) * opt.cloudClassCount +
        1
    );
    return opt.cloudClassPrefix + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log("articles: ", articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagWrapper = article.querySelector(opt.articleTagsSelector);
      /* make html variable with empty string */
      let html = "";
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");
      console.log("articleTags: ", articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(" ");
      console.log("articleTagsArray: ", articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log("tag: ", tag);
        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>&nbsp";
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.artTagLink(linkHTMLData);
        console.log("linkHTML: ", linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML; /* insert link */
        console.log("html: ", html);
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;
      console.log("tagWrapper: ", tagWrapper);
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log("tagsParams:", tagsParams);
    //let allTagsHTML = "";
    const allTagsData = { tags: [] };
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML =
        "<li><a class=" +
        calculateTagClass(allTags[tag], tagsParams) +
        ' href="#tag-' +
        tag +
        '">' +
        tag +
        "</a></li>&nbsp";
      console.log("tagLinkHTML:", tagLinkHTML);
      //allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    } /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log("allTagsData:", allTagsData);
        
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log("href: ", href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace("#tag-", "");
    console.log("tag: ", tag);
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log("tagLinks: ", tagLinks);
    /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks) {
      /* remove class active */
      tagLink.classList.remove("active");
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant (clicked element) */
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log("foundTagLinks: ", foundTagLinks);
    /* START LOOP: for each found tag link */
    for (let foundTagLink of foundTagLinks) {
      /* add class active */
      foundTagLink.classList.add("active");
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector (tag) as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]'); //it shows title links with selected tag
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const linksToTags = document.querySelectorAll(".list-horizontal a");
    /* START LOOP: for each link */
    for (let linkToTag of linksToTags) {
      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener("click", tagClickHandler);
      /* END LOOP: for each link */
    }
    const linksToTags2 = document.querySelectorAll(".tags a");
    /* START LOOP: for each link */
    for (let linkToTag2 of linksToTags2) {
      /* add tagClickHandler as event listener for that link */
      linkToTag2.addEventListener("click", tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function calculateAuthorsParams(authors) {
    const params = { max: 0, min: 999999 };
    for (let author in authors) {
      console.log(author + " is used " + authors[author] + " times");
      if (authors[author] > params.max) {
        params.max = authors[author];
      } else if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }
    return params;
  }

  function calculateAuthorClass(count, params) {
    const classNumber = Math.floor(
      ((count - params.min) / (params.max - params.min)) * opt.cloudClassCount +
        1
    );
    return opt.cloudClassPrefix + classNumber;
  }

  function generateAuthors() {
    /* [NEW] create a new variable with an empty array */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log("articles: ", articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      /* make html variable with empty string */
      let html = "";
      /* get author from data-author attribute */
      const author = article.getAttribute("data-author");
      console.log("author: ", author);
      /* generate HTML of the link */
      //const linkHTML = '<a href="#author-' + author +  '"><span>' + author +  "</span></a>";
      const linkHTMLData = { id: author, title: author };
      const linkHTML = templates.authorLink(linkHTMLData);
      console.log("linkHTML: ", linkHTML);
      html = html + linkHTML; /* insert link */
      console.log("html: ", html);
      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[author]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      authorWrapper.innerHTML = html;
      console.log("authorWrapper: ", authorWrapper);
    } //END LOOP: for every article.
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(opt.authorsListSelector);
    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log("authorsParams:", authorsParams);
    //let allAuthorsHTML = "";
    const allAuthorsData = { authors: [] };

    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML =
        "<li><a class=" +
        calculateAuthorClass(allAuthors[author], authorsParams) +
        ' href="#author-' +
        author +
        '">' +
        author +
        "</a></li>&nbsp";
      console.log("authorLinkHTML:", authorLinkHTML);
      //allAuthorsHTML += authorLinkHTML;
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorsParams),
      });
    } /* [NEW] END LOOP: for each author in allAuthors: */
    /*[NEW] add HTML from allAuthorsHTML to authorList */
    //authorList.innerHTML = allAuthorsHTML;
    authorList.innerHTML = templates.tagAuthorLink(allAuthorsData);
    console.log("allAuthorsData:", allAuthorsData);
  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log("href: ", href);
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace("#author-", "");
    console.log("author: ", author);
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log("authorLinks: ", authorLinks);
    /* START LOOP: for each active tag link */
    for (let authorLink of authorLinks) {
      /* remove class active */
      authorLink.classList.remove("active");
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant (clicked element) */
    const foundAuthorLinks = document.querySelectorAll(
      'a[href="' + href + '"]'
    );
    console.log("foundAuthorLinks: ", foundAuthorLinks);
    /* START LOOP: for each found tag link */
    for (let foundAuthorLink of foundAuthorLinks) {
      /* add class active */
      foundAuthorLink.classList.add("active");
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector (author) as argument */
    generateTitleLinks('[data-author="' + author + '"]'); //it shows title links with selected author
  }

  function addClickListenersToAuthors() {
    /* find all links to tags */
    const linksToAuthor = document.querySelectorAll(".post-author a");
    /* START LOOP: for each link */
    for (let linkToAuthor of linksToAuthor) {
      /* add authorClickHandler as event listener for that link */
      linkToAuthor.addEventListener("click", authorClickHandler);
      /* END LOOP: for each link */
    }
    const linksToAuthor2 = document.querySelectorAll(".authors a");
    /* START LOOP: for each link */
    for (let linkToAuthor2 of linksToAuthor2) {
      /* add authorClickHandler as event listener for that link */
      linkToAuthor2.addEventListener("click", authorClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
  
}
