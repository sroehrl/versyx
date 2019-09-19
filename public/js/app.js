const App = {

    setActiveMenuItem: (items) => {
        let path = location.pathname;
        $.each(items, (index, item) => {
            $(item).removeClass('active');
            if ((path.includes($(item).attr('href'))
                && $(item).attr('href') !== "/")
                || ($(item).attr('href') === "/" && path === "/")) {
                $(item).addClass('active')
            }
        })
    },

    post: (url, type, obj, notif) => {
        console.log(obj);
        $d.showLoad();
        $.ajax({
            url: url,
            type: "POST",
            data: obj.serialize(),
            success: () => {
                localStorage.setItem("notify", JSON.stringify(notif));
                window.location = "/";
            }
        });
    },

    notify: (msg, type) => {
        $d.notify({
            msg: msg,
            type: type,
            position: "center"
        })
    }
};

$(() => {
    App.setActiveMenuItem($('.header .menu li a'));
});
