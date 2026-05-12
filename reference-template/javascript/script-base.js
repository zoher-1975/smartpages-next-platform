/**
 * script-base.js — ZoFeb core JS adapted for merchant experience layer
 * Removed: card masking, CVV validation (payment features not in merchant flow)
 * Platform: WhatsApp-First Social Commerce SaaS — Phase 1
 */

/*--------------------------- Page Loader --------------------------------*/
$(function () {
    setTimeout(() => {
        $('.page-loader').fadeOut('slow');
    }, 800);
});
/*---------------------------- Onboarding Screen ----------------------------*/
$(document).on("click", ".skip_btn_1", function () {
    $("#first").removeClass("active");
    $(".first_slide").removeClass("active");

    $("#second").addClass("active");
    $(".second_slide").addClass("active");
});

$(document).on("click", ".skip_btn_2", function () {
    $("#second").removeClass("active");
    $(".second_slide").removeClass("active");

    $("#third").addClass("active");
    $(".third_slide").addClass("active");
});

/*------------------------- New Password hide show button --------------------------*/
$(document).on("click", ".eye-off", function () {
    const input = $(this).siblings("input");
    const isPassword = input.attr("type") === "password";

    input.attr("type", isPassword ? "text" : "password");
    $(this).attr("src", isPassword ? "assets/images/svg/eye.svg" : "assets/images/svg/eye-off.svg");
});

/*------------------------------ Sticky Header -----------------------------*/
$(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();

    if (scrollPosition >= 20) {
        $("#top-header, #top-navbar").addClass("fixed");
        $(".Amigo_img_main").css("padding-top", "70px");
    } else {
        $("#top-header, #top-navbar").removeClass("fixed");
        $(".Amigo_img_main").css("padding-top", "0");
    }
});
/*---------------------------- Confirm OTP Input filed  ------------------------------*/
function validateInput(input) {
    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > 1) {
        input.value = input.value.charAt(0);
    }

    if (input.value !== "") {
        input.classList.add("filled");

        const nextInput = input.nextElementSibling;
        if (nextInput && nextInput.tagName === "INPUT") {
            nextInput.focus();
        }
    } else {
        input.classList.remove("filled");
    }
}

// jQuery delegated event binding
$(document).on('input', '.otp-input', function () {
    validateInput(this);
});

/*-----------------------------  Personal Info Photo Upload -------------------------*/
$(document).on("DOMContentLoaded", function () {
    const readURL = (input) => {
        if (input.files && input.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $(".profile-pic").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    $(document).on("change", ".file-upload", function () {
        readURL(this);
    });

    $(document).on("click", ".upload-button", function () {
        $(".file-upload").click();
    });
});

/*------------------------ Personal Info Tab Buttons --------------------------*/
$(document).ready(function () {
    function toggleSection(targetSection) {
        $(".toggle-btn-per-info").removeClass("active");
        $("section").removeClass("active");

        const $targetElement = $(`.${targetSection}`);
        const $targetButton = $(`.toggle-btn-per-info[data-section="${targetSection}"]`);

        $targetElement.addClass("active");
        $targetButton.addClass("active");
    }

    // Delegated click handler
    $(document).on("click", function (event) {
        const $button = $(event.target).closest(".toggle-btn-per-info");
        const $arrow = $(event.target).closest(".per-arrow-btn");

        if ($button.length) {
            const targetSection = $button.data("section");
            toggleSection(targetSection);
        }

        if ($arrow.length) {
            event.preventDefault();
            const targetSection = $arrow.data("section");
            toggleSection(targetSection);
        }
    });
});


/*------------- Personal info open Pop-Up page redirect ---------------------*/
$(document).on("click", ".print-continue-btn", function () {
    $(".loader2").fadeIn().delay(3000).fadeOut();

    setTimeout(() => {
        window.location.href = "create-new-pin.html";
    }, 2000);
});

/*------------- Shop Slider Home Screen ---------------------*/
$(document).ready(function () {
    $('.shop-card').slick({
        infinity: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        speed: 1000,
    });
});
/*------------- Categories Slider Home Screen ---------------------*/
$(document).ready(function () {
    $('.categories-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: false,
        arrows: false,
        dots: false,
        speed: 1000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    autoplay: false,
                    arrows: false,
                    variableWidth: true,
                }
            }
        ]
    });
});
/*------------- Featured Slider Home Screen ---------------------*/
$(document).ready(function () {
    $('.featured-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: false,
        arrows: false,
        dots: false,
        speed: 1000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    })
});
/*------------- Brand logo Slider Home Screen ---------------------*/
$(document).ready(function () {
    $('.brand-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: false,
        arrows: false,
        dots: false,
        speed: 1000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    autoplay: false,
                    arrows: false,
                    variableWidth: true,
                }
            }
        ]
    })
});
/*------------- Best Sellers Home Screen ---------------------*/
$(document).ready(function () {
    $('.best-sellers-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: false,
        arrows: false,
        dots: false,
        speed: 1000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    autoplay: false,
                    arrows: false,
                    variableWidth: true,
                }
            }
        ]
    })
});
/*------------- Like Heart ---------------------*/
$(document).on("click", ".heart-icon", function () {
    $(this).toggleClass("filled");
});

/*------------------------------------- Tabs -------------------------------------*/
$(document).on("click", ".tab-btn-main a", function (e) {
    e.preventDefault();

    const tabId = $(this).data("tab");
    if (!tabId) return; // Prevent errors if data-tab is missing

    $(".tab-btn-main a, .Tabcondent").removeClass("tab-active");
    $(this).addClass("tab-active");
    $("#" + tabId).addClass("tab-active");
});

/*--------------------------------- Click On Search Page Redirct -------------------------------------*/
$(document).on("click", "#searchInput", function () {
    window.location.href = "search.html";
});

/*---------------------------------Filter Range  -------------------------------------*/
$(document).ready(function () {
    const $minSlider = $("#min-slider");
    const $maxSlider = $("#max-slider");
    const $minPrice = $("#min-price");
    const $maxPrice = $("#max-price");
    const $slider = $(".slider");

    if (!$minSlider.length || !$maxSlider.length || !$minPrice.length || !$maxPrice.length || !$slider.length) return;

    function updateSlider() {
        const minVal = parseInt($minSlider.val(), 10);
        const maxVal = parseInt($maxSlider.val(), 10);

        if (minVal > maxVal) {
            $minSlider.val(maxVal);
        }
        $minPrice.text(`$${$minSlider.val()}`);

        if (maxVal < minVal) {
            $maxSlider.val(minVal);
        }
        $maxPrice.text(`$${$maxSlider.val()}`);

        const leftPosition = (parseInt($minSlider.val(), 10) / 100) * 100;
        const rightPosition = (parseInt($maxSlider.val(), 10) / 100) * 100;

        $slider.css("--left", `${leftPosition}%`);
        $slider.css("--right", `${rightPosition}%`);

        $minPrice.css("left", `${leftPosition}%`);
        $maxPrice.css("left", `${rightPosition}%`);
    }

    $minSlider.on("input", updateSlider);
    $maxSlider.on("input", updateSlider);

    updateSlider();
});

/*---------------------------------Filter screen top Button -------------------------------------*/
$(document).on("click", ".filter-sales-btn, .size-btn", function () {
    $(".filter-sales-btn, .size-btn").removeClass("active");
    $(this).addClass("active");
});

/*--------------------------------- Single Item Slider -------------------------------------*/
$(document).ready(function () {
    $('.single-product-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        dots: false,
        speed: 1000,
        prevArrow: '<button type="button" class="single-slick-arrow slick-prev"><img src="assets/images/svg/left-black-arrow.svg" alt="left-black-arrow"></button>',
        nextArrow: '<button type="button" class="single-slick-arrow slick-next"><img src="assets/images/svg/right-half-arrow-black.svg" alt="right-half-arrow"></button>',
    })
});
/*--------------------------------- Incre Decre -------------------------------------*/
$(document).ready(function () {
    let value = 1;

    // Increment/Decrement buttons
    $(document).on("click", "#decrement", function () {
        if (value > 1) {
            value--;
            $("#value").text(value);
        }
    });

    $(document).on("click", "#increment", function () {
        value++;
        $("#value").text(value);
    });

    // Update Text In Card
    window.updateLokiBox = function (lokiBoxId, inputField) {
        const $lokiBox = $("#" + lokiBoxId);
        if (!$lokiBox.length || !inputField) return;

        $lokiBox.text($(inputField).val().trim());
    };

    // Mask Card Number (16-digit format)
    window.maskNumber = function () {
        const $inputElement = $("#cardNumber");
        const $outputElement = $("#lokiCardNumber");

        if (!$inputElement.length || !$outputElement.length) return;

        let inputNumber = $inputElement.val().trim();
        let digitsOnly = inputNumber.replace(/\D/g, "");

        let maskedPart = digitsOnly.slice(0, 12).replace(/\d/g, "*");
        let lastPart = digitsOnly.slice(12);

        let maskedNumber = maskedPart.replace(/(.{4})/g, "$1 ").trim();
        if (lastPart) maskedNumber += " " + lastPart;

        $outputElement.text(maskedNumber);
    };

    // Validate CVV (Only 3 digits)
    window.validateInputcvv = function (inputField) {
        let value = $(inputField).val().replace(/\D/g, "").slice(0, 3);
        $(inputField).val(value);
        $("#lokiCVV").text(value);
    };
});

/*-------------------------------------Faq Section-------------------------------------*/
$(document).ready(function () {
    $("body").on("click", function (event) {
        const $header = $(event.target).closest(".accordion-header");
        const $subHeader = $(event.target).closest(".sub-accordion-header");

        // === Main Accordion ===
        if ($header.length) {
            const $content = $header.next(".accordion-content");
            const $icon = $header.find(".icon");

            // Close all other accordions
            $(".accordion-content").not($content).each(function () {
                $(this).removeClass("open")
                    .prev(".accordion-header").removeClass("active")
                    .find(".icon").removeClass("rotate");
            });

            // Toggle current
            $content.toggleClass("open");
            $header.toggleClass("active");
            $icon.toggleClass("rotate");
        }

        // === Sub-Accordion ===
        if ($subHeader.length) {
            const $content = $subHeader.next(".sub-accordion-content");
            const $icon = $subHeader.find(".icon");
            const $parentAccordion = $subHeader.closest(".accordion-content");

            // Close other sub-accordions in the same parent
            $parentAccordion.find(".sub-accordion-content").not($content).each(function () {
                $(this).removeClass("open")
                    .prev(".sub-accordion-header").removeClass("active")
                    .find(".icon").removeClass("rotate");
            });

            // Toggle current
            $content.toggleClass("open");
            $subHeader.toggleClass("active");
            $icon.toggleClass("rotate");
        }
    });
});


/*-------------------------------------Add Home Screen Pop Up Screen-------------------------------------*/
$(document).ready(function () {
    setTimeout(() => {
        $("#bkgOverlay, #delayedPopup").fadeIn(400);
    }, 4800);

    $("#btnClose").on("click", function (e) {
        e.preventDefault();
        HideDialog();
    });

    function HideDialog() {
        $("#bkgOverlay, #delayedPopup").fadeOut(400);
    }
});
