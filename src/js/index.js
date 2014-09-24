$(document).ready(function() {
  $('#query .btn').click(function(event) {
    event.preventDefault();

    ['ZEN', 'AAPL', 'NYT', 'USB', 'TSLA'].forEach(function(item) {
      $('#results').append('<div class=\"panel\">' + item + '</div>')
    });
  });
});
