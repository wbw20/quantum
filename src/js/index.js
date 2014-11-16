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
    var metrics = {"high_performance_underfollowed":[{"_index":"stockmachine","_type":"metric","_id":"AP8xAkxoT568h88t8_Vy5g","_score":null,"_source":{"name":"high_performance_underfollowed","date":1416164727000,"data":[]},"sort":[1416164727000]}],"compare_averages":[{"_index":"stockmachine","_type":"metric","_id":"cCX5EOKETvSX_8NrNxOI-Q","_score":null,"_source":{"name":"compare_averages","date":1416164727000,"data":[{"key":"GOOGL US Equity","doc_count":229,"twenty_day":{"doc_count":0,"px_last":{"value":null},"avg_volume":{"value":null}},"fifty_day":{"doc_count":0,"px_last":{"value":null}}},{"key":"AAPL US Equity","doc_count":219,"twenty_day":{"doc_count":0,"px_last":{"value":null},"avg_volume":{"value":null}},"fifty_day":{"doc_count":0,"px_last":{"value":null}}},{"key":"MSFT US Equity","doc_count":212,"twenty_day":{"doc_count":0,"px_last":{"value":null},"avg_volume":{"value":null}},"fifty_day":{"doc_count":0,"px_last":{"value":null}}},{"key":"BRK/B US Equity","doc_count":115,"twenty_day":{"doc_count":0,"px_last":{"value":null},"avg_volume":{"value":null}},"fifty_day":{"doc_count":0,"px_last":{"value":null}}}]},"sort":[1416164727000]}]};
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

          $('#results').append('<div class=\"panel panel-info\"><div class=\"panel-heading\">' + item.key + '</div><div class=\"panel-body\">20 Day: ' + twenty + '<br>50 Day: ' + fifty + '</div></div>');
        });

        event.preventDefault();
        $('#query .nav-pills li').removeClass('active');
        $(this).addClass('active');
      });
    });

    $('.nav-pills li:first-child').addClass('active');
  // });
});
