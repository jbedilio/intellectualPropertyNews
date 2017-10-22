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