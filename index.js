const YouTube_URL = 'https://www.googleapis.com/youtube/v3/search';

function displaySearchData(data, status){
  console.log(data);
  let searchTerm = $('.js-query').val();
  $('.results').html(`<p class="searchResultNumber" aria-live="assertive">Search Results for ${searchTerm}: ${data.items.length} videos</p>`);
  data.items.forEach(item => {
    let videoURL = `http://www.youtube.com/watch?v=${item.id.videoId}`;
    let thumbnailURL = item.snippet.thumbnails.medium.url;
    let videoTitle = item.snippet.title;
    let videoDescription = item.snippet.description;
    $('.results').append(`<a href="${videoURL}" title="Link to Youtube for Video Titled, ${videoTitle}"><img src="${thumbnailURL}" class="col-1 col-m-3" alt="${videoDescription}"></a>`);
  });
}

function getAPIData(searchTerm){
  let query = {
    q: searchTerm,
    part: 'snippet',
    key: 'AIzaSyBhE83ZVWzf_-bL1_DS38AUyV4m1Ib5ltw',
    type: 'video',
    maxResults: 6
  };
  $.getJSON(YouTube_URL, query, displaySearchData);
}

function submitFormListener(){
  $('.js-search-bar').submit(function(){
    event.preventDefault();
    $('.results').contents().hide();
    let searchTerm = $(this).find('.js-query').val();
    getAPIData(searchTerm);
  });
}

function pageStart(){
  $(submitFormListener);
}

$(pageStart);