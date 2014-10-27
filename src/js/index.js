var metrics = {
  '20 Day > 50 Day': 'compareAverages',
  '10% Performance': 'compareAverages',
  'Fake Metric': 'fake'
};

$(document).ready(function() {
  $('#query .nav-pills li').click(function(event) {
    event.preventDefault();

    $('#query .nav-pills li').removeClass('active');
    $(this).addClass('active');

    ['ZEN', 'AAPL', 'NYT', 'USB', 'TSLA'].forEach(function(item) {
      $('#results').append('<div class=\"panel panel-info\"><div class=\"panel-heading\">' + item + '</div><div class=\"panel-body\">Info: \n\nA great stock\nbuy it</div></div>')
    });
  });

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
  _.keys(metrics).forEach(function(metric) {
    $('.nav-pills').appendChild(
      '<li>' +
        '<a href=\"#\">' + metric + '<span class=\"badge\">42</span></a>' +
      '</li>');
  });

  $('.nav-pills li').get(0).addClass('active');
});
