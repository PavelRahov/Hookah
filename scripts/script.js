'use strict';

$(document).ready(function () {
    //Слайдер для блока с мастерами
    $(function () {
        let mastersSlider = $(".masters__slider");
        mastersSlider.owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            autoHeight: false,
            dots: true,
            nav: true,
            navText: [
                '<span class="arrow-owl arrow-left"><img src="images/previous.png" alt="prev"></span>',
                '<span class="arrow-owl arrow-right"><img src="images/next.png" alt="next"></span>'
            ],
            responsive: {
                320: {
                    items: 1,
                    nav: false,
                },
                768: {
                    items: 2
                },

                1140: {
                    items: 2,
                },

                1228: {
                    items: 3,
                }
            },
        });
    });


    /*$('.masters__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1111,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 725,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]
    });*/



    // magnific
    $('.interior__photo-zoom').magnificPopup({
        type: 'image'
    });


    // Валидация
    let btnOrder = $('#btnOrder');
    let inputName = $('input').eq(0);
    let inputPhone = $('input').eq(1);



    let loader = $('#loader');
    let successFirst = $('.successFirst').hide();

    btnOrder.click(function () {
        let hasError = false;
        let url = 'https://testologia.site/checkout';

        $('.inp-valid-err').hide(); // Перед началом валидации скрываем эл-т.
        $('input').css('border-color', 'rgb(98, 36, 223)');

        if (!inputName.val()) {
            inputName.next().show();
            inputName.css('border-color', 'red');
            hasError = true;
        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            inputPhone.css('border-color', 'red');
            hasError = true;
        }

        // Если все элементы формы валидны - отправлять POST запрос
        if (!hasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: url,
                data: {name: inputName.val(), phone: inputPhone.val(),}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        // console.log(message);
                        $('.successZero').hide();
                        $('.successFirst').show();
                    } else {
                        alert("Возникла ошибка при бронировании, позвоните нам и забронируйте стол");
                    }
                });
        }
        ;

    });



    // Слайдер для блока stocks
    var $stocksSlider = $(".stocks__variant");

    $(window).resize(function () {
        moveStocksSlider();
    });

    function moveStocksSlider() {
        if ($stocksSlider.data("owlCarousel") !== "undefined") {
            if (window.matchMedia("(max-width: 374px)").matches) {
                CreateStocksSlider();
            } else {
                deleteStocksSlider();
            }
        }
    }

    moveStocksSlider();

    function CreateStocksSlider() {
        $stocksSlider.addClass("owl-carousel").owlCarousel({
            items: 2,
            margin: 30,
            loop: true,
            nav: false,
            dots: true,
            dotsEach: true,
            responsive: {
                320: {
                    items: 1,
                },
            },
        });
    }

    function deleteStocksSlider() {
        $stocksSlider.trigger("destroy.owl.carousel").removeClass("owl-carousel");
    }



    // Слайдер для блока interior
    var $interiorSlider = $(".interior__photos-box");

    $(window).resize(function () {
        moveInteriorSlider();
    });

    function moveInteriorSlider() {
        if ($interiorSlider.data("owlCarousel") !== "undefined") {
            if (window.matchMedia("(max-width: 767px)").matches) {
                createInteriorSlider();
            } else {
                deleteInteriorSlider();
            }
        }
    }

    moveInteriorSlider();

    function createInteriorSlider() {
        $interiorSlider.addClass("owl-carousel").owlCarousel({
            items: 2,
            margin: 30,
            loop: true,
            nav: false,
            dots: true,
            dotsEach: true,
            responsive: {
                320: {
                    items: 1,
                },
                767: {
                    items: 2
                }
            },
        });
    }

    function deleteInteriorSlider() {
        $interiorSlider.trigger("destroy.owl.carousel").removeClass("owl-carousel");
    }

});


window.onload = function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();


    // Burger menu
    let burger = document.getElementById('burger');
    let burgerNavigation = document.getElementById('burger-navigation');
    let burgerNavigationClose = document.getElementById('burger-close');
    let navigationMenu = document.querySelectorAll('.menu-item a');


    burger.onclick = function (e) {
        burgerNavigation.classList.add('navigation-active');
        burgerNavigationClose.classList.add('navigation-active');

    };

    function closeNavMenu() {
        burgerNavigation.classList.remove('navigation-active');
        burgerNavigationClose.classList.remove('navigation-active');
    }

    burgerNavigationClose.onclick = closeNavMenu;

    for (let i = 0; i < navigationMenu.length; i++) {
        navigationMenu[i].onclick = closeNavMenu;
    }



    // Скрол к форме бронирования по клику на кнопку
    let order = document.getElementById('order');
    document.getElementsByClassName('btn')[0].onclick = function () {
        order.scrollIntoView({behavior: "smooth"});
    };

    document.getElementsByClassName('btn')[2].onclick = function () {
        order.scrollIntoView({behavior: "smooth"});
    };


    // Навигация по меню
    let hookahs = document.getElementById('hookahs'),
        snacks = document.getElementById('snacks'),
        teaCoctail = document.getElementById('teaCoctail'),
        bar = document.getElementById('bar');

    let listItems = document.querySelectorAll('.list-item a');
    let menuCards = document.querySelectorAll('.menu__cards');

    // Функция обработчик при клике на пункты меню блока .menu
    function menuItems(e) {
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].classList.contains('active')) {
                listItems[i].classList.remove('active');
            }
        }
        e.target.classList.add('active');
        e.stopPropagation();


        // Проверка на класс .active  для отображения карточек меню
        if (bar.classList.contains('active')) {
            for (let i = 0; i < menuCards.length; i++) {
                menuCards[i].classList.remove('show');
                menuCards[i].classList.add('notShow');
            }
            document.getElementById('cardsBar').classList.remove('notShow');

        } else if (hookahs.classList.contains('active')) {
            for (let i = 0; i < menuCards.length; i++) {
                menuCards[i].classList.remove('show');
                menuCards[i].classList.add('notShow');
            }
            document.getElementById('cardsHookahs').classList.remove('notShow');

        } else if (teaCoctail.classList.contains('active')) {
            for (let i = 0; i < menuCards.length; i++) {
                menuCards[i].classList.remove('show');
                menuCards[i].classList.add('notShow');
            }
            document.getElementById('cardsTeaСocktail').classList.remove('notShow');

        } else if (snacks.classList.contains('active')) {
            for (let i = 0; i < menuCards.length; i++) {
                menuCards[i].classList.remove('show');
                menuCards[i].classList.add('notShow');
            }
            document.getElementById('cardsSnacks').classList.remove('notShow');
        }
    };

    bar.onclick = menuItems;
    hookahs.onclick = menuItems;
    teaCoctail.onclick = menuItems;
    snacks.onclick = menuItems;


};