$(document).ready(function () {/* jQuery toggle layout */
    $('#btnToggle').click(function () {
        if ($(this).hasClass('on')) {
            $('#main .col-md-6').addClass('col-md-4').removeClass('col-md-6');
            $(this).removeClass('on');
        } else {
            $('#main .col-md-4').addClass('col-md-6').removeClass('col-md-4');
            $(this).addClass('on');
        }
    });
});

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

$(".answerWrite input[type=submit]").click(addAnswer)

function addAnswer(e) {
    e.preventDefault();
    var queryString = $("form[name=answer]").serialize();

    $.ajax({
        type: 'post',
        url: '/api/qna/addAnswer',
        data: queryString,
        dataType: 'json',
        error: onError,
        success: onSuccess
    });
}

function onSuccess(json, status) {
    var answerTemplate = $('#answerTemplate').html();
    var template = answerTemplate.format(json.answer.writer, new Date(json.answer.createdDate), json.answer.contents, json.answer.answerId, json.answer.answerId);
    $(".qna-comment-slipp-articles").prepend(template);
}

function onError(xhr, status) {
    alert("error");
}

$(".qna-comment").on("click", ".form-delete", deleteAnswer);

function deleteAnswer(e) {
    e.preventDefault();

    var deleteBtn = $(this);
    var queryString = deleteBtn.closest("form").serialize();

    $.ajax({
        type: 'post',
        url: "/api/qna/deleteAnswer",
        data: queryString,
        dataType: 'json',
        error: function (xhr, status) {
            alert("error");
        },
        success: function (json, status) {
            if (json.result.status) {
                deleteBtn.closest('article').remove();
            }
        }
    });
}