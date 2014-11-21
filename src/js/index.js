$(document).ready(function() {
  $('.slider[name="market-cap"]').slider({
    formatter: function(value) {
      return '$' + abbreviate(exp(value[0]), 0) + ' to ' + '$' + abbreviate(exp(value[1]), 0);
    }
  });

  $('.slider[name="sp-performance"]').slider({
    formatter: function(value) {
      return value[0] + 'th %tile to ' + value[1] + 'th %tile';
    }
  });

  function exp(value) {
    return Math.pow(value, 6);
  }

  function abbreviate(number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t" ];

    for (var i=abbrev.length-1; i>=0; i--) {
      var size = Math.pow(10,(i+1)*3);

      if(size <= number) {
         number = Math.round(number*decPlaces/size)/decPlaces;

         if((number == 1000) && (i < abbrev.length - 1)) {
           number = 1;
           i++;
         }

         number += abbrev[i];
         break;
      }
    }

    return number;
  }

  /* Nav Pills */
  $.getJSON('//54.187.190.186/api/metrics', function(metrics) {
    _.pairs(metrics).forEach(function(metric) {
      var name = metric[0],
          values = metric[1],
          tickers = values[0]._source.data,
          pill = $('<li>' +
                     '<a href=\"#\">' + name + '<span class=\"badge\">' + tickers.length + '</span></a>' +
                   '</li>');
      $('.nav-pills').append(pill);

      pill.click(function() {
        $('#results').empty();

        tickers.forEach(function(item) {
          var name   = item.key,
              twenty = item.twenty_day.px_last.value,
              fifty  = item.fifty_day.px_last.value;

          $('#results').append( '<div class=\"panel panel-info\">' + 
                                  '<div class=\"panel-heading\">' +
                                    item.key +
                                  '</div>' +
                                  '<div class=\"panel-body\">' +
                                    '20 Day: ' + twenty +
                                    '<br>' +
                                    '50 Day: ' + fifty +
                                    '<div class=\"open-in\">' +
                                      '<h3 data-symbol=\"' + name + '\">Open in Yahoo</h3>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>');
        });

        event.preventDefault();
        $('#query .nav-pills li').removeClass('active');
        $(this).addClass('active');
      });
    });

    $('.nav-pills li:first-child').addClass('active');
  });

  $(document).on('click', 'h3', function(event) {
    var name = $(event.target).data('symbol').split(' US Equity')[0];

    if (name) {
      window.open('//finance.yahoo.com/q?s=' + name.replace('/', '-').toUpperCase());
    }
  });
});
