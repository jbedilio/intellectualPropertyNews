$('#scrape').on('click', () => {
    $.post('/article/scrape', (err, req, res) => {
        if(err){
            console.log('err: ', err);
        }
        res.redirect('/');
    });
});

$('#submit').on('click', () => {
    event.preventDefault();
    $.post('/article/note/:id', (err, req, res) => {
        if(err){
            console.log('err: ', err);
        }
        res.redirect('/');
    });
});