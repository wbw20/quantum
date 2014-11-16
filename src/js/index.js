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
  // $.getJSON('api/metrics', function(metrics) {
    var metrics = {"hot_stocks":[{"_index":"stockmachine","_type":"metric","_id":"hqYMvaYiRxCUBG-uvNwm4A","_score":null,"_source":{"tickers":"[\"ZEN\", \"AAPL\", \"TSLA\", \"IBM\", \"MSFT\"]","date":"1416299856000","name":"hot_stocks"},"sort":[1416299856000]}],"insider_sell_offs":[{"_index":"stockmachine","_type":"metric","_id":"9f8F_-_YRjGiUV0V2O09ZQ","_score":null,"_source":{"tickers":"[\"BAC\", \"NYT\", \"MDMN\"]","date":"1416299856000","name":"insider_sell_offs"},"sort":[1416299856000]}],"bond_vs_equity":[{"_index":"stockmachine","_type":"metric","_id":"5I9q_1jvRu2roaqnYvHeLw","_score":null,"_source":{"tickers":"[\"PWC\", \"USB\", \"FB\", \"AAPL\"]","date":"1516399956000","name":"bond_vs_equity"},"sort":[1516399956000]}]};
    _.pairs(metrics).forEach(function(metric) {
      var name = metric[0],
          values = metric[1],
          pill = $('<li>' +
                     '<a href=\"#\">' + name + '<span class=\"badge\">42</span></a>' +
                   '</li>'),
          tickers = JSON.parse(values[0]._source.tickers);
      $('.nav-pills').append(pill);

      pill.click(function() {
        tickers.forEach(function(item) {
          event.preventDefault();
          $('#results').append('<div class=\"panel panel-info\"><div class=\"panel-heading\">' + item + '</div><div class=\"panel-body\">A really nice stock for ya</div></div>');

          $('#query .nav-pills li').removeClass('active');
          $(this).addClass('active');
        });
      });
    });

    $('.nav-pills li:first-child').addClass('active');
  // });
});
