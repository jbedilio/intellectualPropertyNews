$('#scrape').on('click', () =>{
    event.preventDefault();
    $.post('/article/scrape', (req, res) => {
        if(err){
            console.log('err: ', err);
        }
    });
    location.reload();
});