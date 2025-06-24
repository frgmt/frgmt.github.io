(function ($) {
    'use strict';

    // --------- ユーティリティ ---------
    const isMobile = {
        Android: () => /Android/i.test(navigator.userAgent),
        BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
        iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
        Opera: () => /Opera Mini/i.test(navigator.userAgent),
        Windows: () => /IEMobile/i.test(navigator.userAgent),
        any: function () {
            return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
        }
    };

    // --------- 画面フルハイト ---------
    function setFullHeight() {
        if (!isMobile.any()) {
            const $el = $('.js-fullheight');
            const resize = () => $el.css('height', $(window).height());
            resize();
            $(window).off('resize.fullheight').on('resize.fullheight', resize);
        }
    }

    // --------- アニメーション ---------
    function setupContentWayPoint() {
        let i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        const $el = $(this);
                        setTimeout(function () {
                            const effect = $el.data('animate-effect');
                            const effectClass = effect ? effect + ' animated' : 'fadeInUp animated';
                            $el.addClass(effectClass).removeClass('item-animate');
                        }, k * 200);
                    });
                }, 100);
            }
        }, { offset: '85%' });
    }

    // --------- ハンバーガーメニュー ---------
    function setupBurgerMenu() {
        $('.js-nav-toggle').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('body').toggleClass('offcanvason');
        });
    }

    // --------- メニュー外クリック/スクロール ---------
    function setupMenuOutsideClick() {
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#aside, .js-nav-toggle').length) {
                $('body').removeClass('offcanvason');
                $('.js-nav-toggle').removeClass('active');
            }
        });
        $(window).on('scroll', function () {
            $('body').removeClass('offcanvason');
            $('.js-nav-toggle').removeClass('active');
        });
    }

    // --------- スライダー ---------
    function setupSlider() {
        if ($.fn.flexslider) {
            $('.hero .flexslider').flexslider({
                animation: "fade",
                slideshow: false,
                directionNav: true,
                start: animateSliderText,
                before: animateSliderText
            });
        }
        function animateSliderText() {
            setTimeout(function () {
                $('.slider-text').removeClass('animated fadeInUp');
                $('.flex-active-slide .slider-text').addClass('animated fadeInUp');
            }, 500);
        }
    }

    // --------- Sticky ---------
    function setupSticky() {
        const setSticky = () => {
            const h = $('.image-content').outerHeight();
            $('.sticky-parent').css('height', h);
            if ($(window).width() <= 992) {
                $("#sticky_item").trigger("sticky_kit:detach");
            } else {
                $('.sticky-parent').removeClass('stick-detach');
                $("#sticky_item").trigger("sticky_kit:detach").trigger("sticky_kit:unstick").stick_in_parent();
            }
        };
        setSticky();
        $(window).off('resize.sticky').on('resize.sticky', setSticky);
    }

    // --------- スムーススクロール ---------
    function setupSmoothScroll() {
        $('a[href*="#"]').not('[href="#"],[href="#0"]').on('click', function (e) {
            const pathnameMatch = location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '');
            const hostnameMatch = location.hostname === this.hostname;
            if (pathnameMatch && hostnameMatch) {
                const $target = $(this.hash.length ? this.hash : '[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $target.offset().top
                    }, 1000, function () {
                        $target.attr('tabindex', '-1').focus();
                    });
                }
            }
        });
    }

    // --------- Toolbar Button Active切替 (jQueryで統一) ---------
    function setupToolbarButtons() {
        $(".toolbar .btn").on('click', function () {
            $(this).toggleClass("active");
        });
    }

    // --------- CAPTCHA ---------
    function randomString(length) {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function drawCaptcha($canvas, captchaText) {
        const canvas = $canvas[0];
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ノイズ
        for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
        ctx.font = "26px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (let i = 0; i < captchaText.length; i++) {
            ctx.save();
            const x = 20 + i * 20 + Math.random() * 4;
            const y = 20 + Math.random() * 8;
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillStyle = `rgb(${80 + Math.random() * 120},${80 + Math.random() * 120},${80 + Math.random() * 120})`;
            ctx.fillText(captchaText[i], 0, 0);
            ctx.restore();
        }
    }

    // --------- Contact Form ---------
    function setupContactForm() {
        const $form = $('.contact__form');
        const $message = $('.contact__msg');
        let currentCaptcha = "";

        function showMsg(text, success = true) {
            $message
                .fadeIn()
                .removeClass('alert-danger alert-success')
                .addClass(success ? 'alert-success' : 'alert-danger')
                .text(text);
            setTimeout(() => $message.fadeOut(), 2000);
            if(success) $form.find('input:not([type="submit"]), textarea').val('');
        }

        function refreshCaptcha() {
            currentCaptcha = randomString(5);
            drawCaptcha($("#captcha"), currentCaptcha);
        }

        refreshCaptcha();
        // CAPTCHA 再生成ボタン例
        $("#captcha-refresh").on('click', refreshCaptcha);

        $form.on('submit', function (e) {
            e.preventDefault();
            const userCaptcha = $("#recaptcha").val().trim().toUpperCase();
            if (userCaptcha !== currentCaptcha) {
                showMsg("Captcha is incorrect. Please try again.", false);
                refreshCaptcha();
                return;
            }
            // Ajax送信
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(resp => showMsg(resp, true))
            .fail(xhr => showMsg(xhr.responseText || "送信完了しました。暫くお待ち下さい。", true));
        });
    }

    // --------- 初期化 ---------
    $(function () {
        setFullHeight();
        setupContentWayPoint();
        setupBurgerMenu();
        setupMenuOutsideClick();
        setupSlider();
        setupSticky();
        setupSmoothScroll();
        setupToolbarButtons();
        setupContactForm();
    });

})(jQuery);
