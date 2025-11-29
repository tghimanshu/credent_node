(function ($) {
  /**
   * Initializes custom functionality when the document is ready.
   */
  $(document).ready(() => {
    /**
     * Toggles the hamburger menu and navigation visibility.
     * @param {Event} e - The click event object.
     */
    function hamburger(e) {
      e.preventDefault();
      $(".hamburger i").toggleClass("fa-times", 1000);
      if ($(document).width() <= 678) {
        $("nav .menu").fadeToggle();
        $("nav .menu").css("display") === "block"
          ? $("nav .menu").css("display", "flex")
          : $("nav .menu").css("display", "npne");
      }
    }

    /**
     * Initializes the Owl Carousel for recent posts.
     */
    $(".recent-posts").owlCarousel({
      loop: true,
      autoplay: true,
      pagination: true,
      // responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
        },
      },
    });

    $(".hamburger").click(hamburger);
    $(".menu").click(function (e) {
      e.preventDefault();
      if ($(window).width() <= 678) {
        $(".hamburger i").removeClass("fa-times", 1000);
        $(".menu").fadeOut();
      }
    });

    /**
     * Handles smooth scrolling when clicking on menu items.
     * @param {Event} e - The click event object.
     */
    $(".menu ul li a").click(function (e) {
      window.scrollTo({
        top:
          $(e.target.hash).length &&
          $(e.target.hash).offset().top - $(".tg-nav")[0].clientHeight,
      });
    });

    /**
     * Updates active state of navigation links on scroll.
     */
    $(window).scroll(function () {
      var scrollLink = $(".scroll");
      var scrollbarLocation = $(this).scrollTop();

      scrollLink.each(function () {
        var sectionOffset =
          $(this.hash).length &&
          $(this.hash).offset().top - $(".tg-nav")[0].clientHeight - 4;

        if (sectionOffset <= scrollbarLocation) {
          $(this).parent().addClass("active");
          $(this).parent().siblings().removeClass("active");
        }
      });
    });

    /**
     * Updates navbar style and back-to-top visibility on scroll.
     */
    document.addEventListener("scroll", () => {
      let x = window.scrollY;
      if (x >= 5) {
        document.querySelector(".tg-nav").style.boxShadow =
          "5px 5px 5px rgba(0,0,0,0.2)";
        // document.querySelector(".tg-nav").style.padding = "1rem";
      } else {
        document.querySelector(".tg-nav").style.background = "#fff";
        document.querySelector(".tg-nav").style.boxShadow = "none";
        // document.querySelector(".tg-nav").style.padding = "1.2rem";
      }
      if (x >= 100) {
        // console.log(x);
        document.getElementById("back-to-top").style.visibility = "visible";
      } else {
        document.getElementById("back-to-top").style.visibility = "hidden";
      }
    });
  });

  /* Charts JS */
  let myCal = (12.6 - 5) / 5;
  /**
   * Calculates chart data points.
   * @param {number} first - The starting value.
   * @param {number} last - The ending value.
   * @param {number} years - The number of years/steps.
   * @param {number} step - The current step index.
   * @returns {number} The calculated data point.
   */
  function getCalData(first, last, years, step) {
    return first + ((last - first) / years) * step;
  }
  var leftlineChartData = {
    labels: ["2015", "2016", "2017", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "CAMS",
        borderColor: "#1d66ad",
        backgroundColor: "#1d66ad",
        fill: false,
        data: [
          5,
          getCalData(5, 12.6, 5, 1),
          getCalData(5, 12.6, 5, 2),
          getCalData(5, 12.6, 5, 3),
          getCalData(5, 12.6, 5, 4),
          12.6,
        ],
      },
      {
        label: "BSE-500",
        borderColor: "#a8bd3e",
        backgroundColor: "#a8bd3e",
        fill: false,
        data: [
          5,
          getCalData(5, 6.85, 5, 1),
          getCalData(5, 6.85, 5, 2),
          getCalData(5, 6.85, 5, 3),
          getCalData(5, 6.85, 5, 4),
          6.85,
        ],
      },
    ],
  };
  var rightlineChartData = {
    labels: ["2015", "2016", "2017", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "CAMS",
        borderColor: "#1d66ad",
        backgroundColor: "#1d66ad",
        fill: false,
        data: [
          50,
          getCalData(50, 126, 5, 1),
          getCalData(50, 126, 5, 2),
          getCalData(50, 126, 5, 3),
          getCalData(50, 126, 5, 4),
          126,
        ],
      },
      {
        label: "BSE-500",
        borderColor: "#a8bd3e",
        backgroundColor: "#a8bd3e",
        fill: false,
        data: [
          50,
          getCalData(50, 68.5, 5, 1),
          getCalData(50, 68.5, 5, 2),
          getCalData(50, 68.5, 5, 3),
          getCalData(50, 68.5, 5, 4),
          68.5,
        ],
      },
    ],
  };

  /**
   * Initializes charts when the window loads.
   */
  window.onload = function () {
    var lctx = document.getElementById("leftCanvas").getContext("2d");
    var rctx = document.getElementById("rightCanvas").getContext("2d");
    window.myLine = new Chart(lctx, {
      type: "line",
      data: leftlineChartData,
      options: {
        hoverMode: "index",
        responsive: true,
        title: {
          display: true,
          text: "Scenario 1",
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Amount(In Lakhs)",
            },
            min: 0,
            max: 20,
            ticks: {
              stepSize: 5,
            },
          },
        },
      },
    });
    window.myLine = new Chart(rctx, {
      type: "line",
      data: rightlineChartData,
      options: {
        hoverMode: "index",
        responsive: true,
        title: {
          display: true,
          text: "Scenario 2",
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Amount(In Lakhs)",
            },
            min: 0,
            max: 200,
            ticks: {
              stepSize: 50,
            },
          },
        },
      },
    });
  };

  /**
   * Randomizes chart data (Note: `lineChartData` and `randomScalingFactor` are not defined in this scope).
   */
  $("#randomizeData").click(function () {
    lineChartData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });

    window.myLine.update();
  });
})(jQuery);
