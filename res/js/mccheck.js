function q(a, b) {
    $.ajax({
        url: rq,
        type: "GET",
        dataType: "json",
        data: { ip: a, players: !0 },
    })
        .done(function (a) {
            console.log("success"), console.log(a), b(a);
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () { });
}

function setclass(a, b) {
    a.removeClass(allclasses), a.addClass(classes[b]), a.html("");
}

function settext(a, b) {
    a.removeClass(allclasses), a.html(b);
}

function display(a) {
    var b = $("#numplayers"),
        c = $("#version"),
        d = $("#online"),
        e = $("#updated"),
        f = $("#players");
    (a.online = "success" === a.status),
        settext(e, moment.unix(a.last_updated).calendar()),
        setclass(d, a.online),
        a.online
            ? (settext(b, a.players.now),
                settext(c, a.server.name),
                a.players.sample
                    ? settext(
                        f,
                        a.players.sample
                            .map(function (a) {
                                return a.name;
                            })
                            .join(", ")
                    )
                    : settext(f, ""))
            : (setclass(b, error), setclass(c, error), setclass(f, error));
}

var rq = "https://mcapi.us/server/status",
    error = "unknown",
    classes = { error: "fa-question", false: "fa-times", true: "fa-check" },
    allclasses = "";

for (i in classes) allclasses += " " + classes[i];

$(document).ready(function () {
    q("agregar ip", display);
});
