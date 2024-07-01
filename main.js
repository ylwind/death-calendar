$(document).ready(function () {

    function loadLocal() {
        var birth = localStorage.birth;
        var death_age = localStorage.death_age;
        if (birth) {
            $("#birth_input").val(birth);
        }
        if (death_age) {
            $("#death_age").val(death_age);
        }
    }

    function refresh() {
        var zodiac = ["🐒","🐔","🐶","🐷","🐭","🐂","🐯","🐰","🐲","🐍","🐴","🐑"];
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var birth_str = $("#birth_input").val();
        var death_age = parseInt($("#death_age").val());
        localStorage.birth = birth_str;
        localStorage.death_age = death_age;

        if (death_age <= 0) {
            death_age = 1;
        }

        var birth = new Date(birth_str);
        var birth_year = birth.getFullYear();
        var start_year = Math.floor(birth_year / 10) * 10 - 20;
        var dead_year = birth_year + death_age;
        var end_year = Math.floor(dead_year / 10) * 10 + 20;
        var table = document.getElementById("year_table");
        table.innerHTML = "";

        for (var decade = start_year / 10; decade <= end_year / 10; decade++) {
            var newRow = table.insertRow();
            for (var i = 0; i < 10; i++) {
                var year = decade * 10 + i;
                var age = year - birth_year;
                var toDea = dead_year - year;
                var cell = newRow.insertCell();
                var yearDesc = "<div class='year_class'>" + year + "</div>";
                var ageIcon = "";

                if (age >= 0 && toDea >= 0) {
                    if (toDea == 0 || age == 0) {
                        ageIcon = "🏥";
                    } else if (age / death_age <= 2 / 60) {
                        ageIcon = "👶🏻";
                    } else if (age / death_age <= 12 / 60) {
                        ageIcon = "👦🏻";
                    } else if (age / death_age <= 20 / 60) {
                        ageIcon = "🙍🏻";
                    } else if (age / death_age <= 45 / 60) {
                        ageIcon = "🧔🏻";
                    } else {
                        ageIcon = "👴🏻";
                    }
                }

                var ageDesc = "<div><span class='age_icon'>" + ageIcon + "</span><br /><span class='age_span'>age:" + age + "</span></div>";
                var toDeaDesc = "<div>to dea:" + toDea + "</div>";

                if (currentYear == year) {
                    yearDesc = "<div class='year_class curr_year'>" + year + "</div>";
                }

                if (age < 0) {
                    ageDesc = "<div>before born:" + (-age) + "</div>";
                    toDeaDesc = "<div>to dea: - </div>";
                }

                if (toDea < 0) {
                    ageDesc = "<div>age: - </div>";
                    toDeaDesc = "<div>🪦dead:" + (-toDea) + "</div>";
                }

                // if (age == 0 || toDea == 0) {
                    yearDesc = "<div><span class='zodiac_span'>" + zodiac[year % 12] + "</span><span class='year_class'>" + year + "</span></div>";
                // }

                cell.innerHTML = yearDesc + ageDesc + toDeaDesc;

                if (age < 0) {
                    cell.className += (cell.className ? " " : "") + "alive-before";
                } else if (toDea >= 0) {
                    cell.className += (cell.className ? " " : "") + "alive";
                } else {
                    cell.className += (cell.className ? " " : "") + "alive-after";
                }

                if (currentYear == year) {
                    cell.className += (cell.className ? " " : "") + "curr_year";
                }
            }
        }
    }

    loadLocal();
    refresh();

    $("#submit").click(function () {
        refresh();
    });
});
