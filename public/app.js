$('#scrape').on('click', (event) => {
    event.preventDefault();
    $.post('/article/scrape', (req, res) => {
        console.log(res);
    })
    .then((data) => {
        location.reload();
    });
});

$('#deleteUnsaved').on('click', (event) => {
    event.preventDefault();
    $.post('/article/delete/unsaved', (req, res) => {
        console.log(res);
    })
    .done((data) => {
        location.reload();
    });
});

$('#deleteAll').on('click', (event) => {
    event.preventDefault();
    $.post('/article/delete/all', (req, res) => {
        console.log(res);
    })
    .done((data) => {
        location.reload();
    });
});

// var $note = "";
// $(document).on('submit', '#submit', function(event) {
//     event.preventDefault();
//     var thisId = $(this).attr('value');
//         // entry.body = $(this).get('textarea[name=body]').val(),
//         // entryurl = $note.attr('action');
//     $.post('/article/note/' + thisId, function(req, res) {
//         console.log(res);
//     })
//     // .done(function(data) {
//     //     console.log(data);
//     //     $('#note').empty();
//     // });
// });

// $('#submit').on('submit', (event) => {
//     event.preventDefault();
//     // $note = $('#note').text().trim();
//     $.post('/article/note/:id', (req, res) => {
//         $note.save(function(err, doc) {
//             if(err){
//                 console.log('err: ', err);
//             } else {
//                 console.log('saved note to id: ', req.params.id);
//             }
//         });
//         res.redirect('/');
//     });
// });

// $('#save').on('click', () => {
//     event.preventDefault();
//     $.post('/article/save/:id', (req, res) => {
//         if
//     })

// })