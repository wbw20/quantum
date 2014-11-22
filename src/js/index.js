$(document).ready(function() {
  var cache = {};

  function fetch(cb) {
    $.getJSON('//54.187.190.186/api/metrics', function(metrics) {
      _.pairs(metrics).forEach(function(metric) {
        var obj = metric[1][0]._source;
        cache[obj.name] = {
          data: obj.data
        }
      });

      cb(cache);
    });
  }

  function numShowing() {
    return $('#results .panel').length;
  }

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

  function populate(metric) {
    var name = metric[0],
        tickers = metric[1].data,
        pill = $('<li>' +
                   '<a href=\"#\" data-name=\"' + name + '\">' + name.replace(/_/g, ' ') + '<span class=\"badge\">' + tickers.length + '</span></a>' +
                 '</li>');
    $('.nav-pills').append(pill);

    pill.click(function(event) {
      $('#results').empty();
      display(metric[1], 10);

      event.preventDefault();
      $('#query .nav-pills li').removeClass('active');
      $(event.target).closest('li').addClass('active');
    });

    $('.nav-pills li:first-child').addClass('active');
  }

  function display(metric, amount) {
    var count = numShowing(),
        total = metric.data.length,
        max   = count + amount;

    for (var i = count; count < max && count < total; count++) {
      var item   = metric.data[count],
          name   = item.key,
          twenty = item.twenty_day.px_last.value,
          fifty  = item.fifty_day.px_last.value;

      addResult(name, '20 Day: ' + twenty +
                      '<br>' +
                      '50 Day: ' + fifty +
                      '<div class=\"open-in\">' +
                        '<h3 data-symbol=\"' + name + '\">Open in Yahoo</h3>' +
                      '</div>');
    }
  }

  function addResult(title, body) {
    $('#results').append( '<div class=\"panel panel-info\">' +
                            '<div class=\"panel-heading\">' +
                              title +
                            '</div>' +
                            '<div class=\"panel-body\">' +
                              body +
                            '</div>' +
                          '</div>');
  }

  fetch(function(results) {
    var pairs = _.pairs(results);

    pairs.forEach(populate);
    $('#results').empty();
    display(pairs[0][1], 10);
  });

  $(document).on('click', 'h3', function(event) {
    var name = $(event.target).data('symbol').split(' US Equity')[0];

    if (name) {
      window.open('//finance.yahoo.com/q?s=' + name.replace('/', '-').toUpperCase());
    }
  });

  $(window).scroll(function () {
    var theWindow = $(this);
    var theContainer = $('body');
    var tweak = 10;

    if ( theWindow.scrollTop() >= theContainer.height() - theWindow.height() - tweak ) {
      var metric = cache[$('li.active a').data('name')];

      if (metric) {
        display(metric, 10);
      }
    }
  });
});
