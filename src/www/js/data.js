function includeHtml(url, selector, addType) {
    //
    var html = $.ajax({
        url: url,
        dataType: 'text',
        async: false
    }).responseText;
    //
    if (addType === "append") {
        $(selector).append(html);
    } else if (addType === "prepend") {
        $(selector).prepend(html);
    } else if (addType === "after") {
        $(selector).after(html);
    } else if (addType === "before") {
        $(selector).before(html);
    } else {
        $(selector).append(html);
    }
}

function loadTemplate(url) {
    //
    var html = $.ajax({
        url: url,
        type: "GET",
        dataType: 'html',
        async: false
    }).responseText;
    //
    return html;
}

function showInfoModal(title, infoMsg, size) {
    var modalObj = $.parseHTML(loadTemplate("templates/modal_info.html"));
    $(modalObj).find(".modal-title").text(title);
    $(modalObj).find(".modal-body").text(infoMsg);
    //
    if (size === 'sm') {
        $(modalObj).find(".modal-dialog").addClass("modal-sm");
    } else if (size === 'lg') {
        $(modalObj).find(".modal-dialog").addClass("modal-lg");
    }
    //
    if (exists("#modal-info")) {
        $("#modal-info").remove();
        $("body").append(modalObj);
    } else {
        $("body").append(modalObj);
    }

    $('#modal-info').modal();
}


$("html").on('click', '#modal-yes-btn', function () {
    MODAL_CONFIRM = 2;
    $(CONFIRM_MODAL_OBJ).text('–');
	$(CONFIRM_MODAL_OBJ).addClass('crossed');
    placePoint();
    setHighlightScore(CONFIRM_MODAL_OBJ);
});

var CONFIRM_MODAL_OBJ;

function showConfirmModal(title, infoMsg, size, obj, type) {
    //
    CONFIRM_MODAL_OBJ = obj;
    //
    var modalObj = $.parseHTML(loadTemplate("templates/modal_confirm.html"));
    $(modalObj).find(".modal-title").text(title);
    $(modalObj).find(".modal-body").text(infoMsg);
    //
    if (size === 'sm') {
        $(modalObj).find(".modal-dialog").addClass("modal-sm");
    } else if (size === 'lg') {
        $(modalObj).find(".modal-dialog").addClass("modal-lg");
    }
    //available-types: 'warning','error',
    $(modalObj).find(".modal-header").addClass(type);
    //
    //
    if (exists("#modal_confirm")) {
        $("#modal_confirm").remove();
        $("body").append(modalObj);
    } else {
        $("body").append(modalObj);
    }
    //
    $('#modal-confirm').modal();
    //
}



function showRulesModal(title,size) {
    //
    var modalObj = $.parseHTML(loadTemplate("templates/modal_rules.html"));
    $(modalObj).find(".modal-title").text(title);
    //
    if (size === 'sm') {
        $(modalObj).find(".modal-dialog").addClass("modal-sm");
    } else if (size === 'lg') {
        $(modalObj).find(".modal-dialog").addClass("modal-lg");
    }
    //
    if (exists("#modal-rules")) {
        $("#modal-rules").remove();
        $("#gamearea").append(modalObj);
    } else {
        $("#gamearea").append(modalObj);
    }
    //
    $('#modal-rules').modal();
}


function exists(selector) {
    if ($(selector).length) {
        return true;
    } else {
        return false;
    }
}
