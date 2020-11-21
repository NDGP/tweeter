
// tweet html filled by data from Data-files

const createTweetElement = (tweetData) => {
  return `<article>
<header>
  <div class="header-span">
  <span class="avatar-name">
  <img class="small-avatar" src="${tweetData.user.avatars}"> 
  <span>${tweetData.user.name}</span>
  </span>
    <span class="email-in-tweets">${tweetData.user.handle}</span>
  </div>
</header>
  <div class="tweet-box">
      <span class="the-tweet">${tweetData.content.text}</span>
  </div>
<footer class="tweet-footer">
  <span>${tweetData.created_at}</span>
  <span>save like share</span>
</footer>
</article>`
}

// functions to render tweet, err message, and handle XSS

const renderTweets = (tweets) => {
  let $tweet;
  for (let tweetData in tweets) {
    $tweet = createTweetElement(tweets[tweetData]);
    $('#tweets-section').prepend($tweet);
  }
}

const errorMsg = (message) => {
  $(".section-new-tweet").prepend(`<div id="error-prompt"><p>${message}</p></div>`);
};

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// when page has loaded 

$(document).ready(() => {

  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

  const $tweetForm = $("#tweet-form");

  // action after a submition of tweet is made and error handling if bad inputs 


  loadTweets()
  $tweetForm.on("submit", (event) => {
    event.preventDefault();

    let tweetLength = $('#tweet-text').val().length;
    console.log($('#tweet-text').val().length);

    if (!tweetLength) {
      errorMsg('nothing writen, please add text');
      return;
    } else if (tweetLength > 140) {
      errorMsg('Tweet must be 140 characters or less');
      return;
    }

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: {
        text: escape($('#tweet-text').val())
      },
    }).then(() => {
      loadTweets();
    });
    $('#tweet-text').val("");
    $('#error-prompt').remove();
  });

  loadTweets();

});
