 function getTableJson() {
     $.getJSON('src/templates/elements/json.json',
         function(data) {
             var friends = data.friends;
             var tr_head = $('<tr></tr>');
             $('.data_table').append(tr_head);
             // making thead
             for (var K in friends[0]) {
                 tr_head.append($('<th></th>').text(K));
             }
             // making table content
             for (var i = 0; i < friends.length; i++) {
                 var tr = $('<tr></tr>');
                 $('.data_table').append(tr);
                 for (var K in friends[i]) {
                     var item = friends[i][K];
                     var text = "";
                     if ($.isPlainObject(item)) {
                         for (var K in item) { text += K + ": " + item[K] + '<br>'; }
                     } else {
                         text += item;
                     }
                     tr.append($('<td></td>').html(text));
                 }
             }
         });
 }