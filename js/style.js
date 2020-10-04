function WeatherInfoOpen(id) {
  let url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=2d50492bdaa0012c29358eabad71add1&lang=kr`;

  $.getJSON(url, function (data) {
    let CityName = data.name;
    let main = data.main;
    let wind = data.wind;
    let weather = data.weather;
    let fixedValue = 273.15;
    let temp = parseInt(main.temp - fixedValue);
    let feelsLike = parseInt(main.feels_like - fixedValue);
    let tempMin = parseInt(main.temp_min - fixedValue);
    let tempMax = parseInt(main.temp_max - fixedValue);
    let clouds = data.clouds.all;
    let windDir = `${DegconConversionDir(wind.deg)} ${Math.round(
      wind.speed
    )}㎧`;
    let description = weather[0].description;
    let icon = weather[0].icon;
    let iconUrl = `http://alseml2.dothome.co.kr/images/${icon}.gif`;

    $(".eather_imge img").attr("src", iconUrl);

    $(".mini_weather h4").html(Translation(data.name));
    $(".mini_weather__Temperature").html(`${temp}&deg;`);
    $(".mini_weather__column:first span:first").html(windDir);
    $(".mini_weather__column:last span:first").html(`습도: ${main.humidity}%`);
    $(".eather_imge span").html(description);

    $(".unit_time-weather:first > span").html(`${temp}`);
    $(".unit_time-weather:nth-child(2) > span").html(`${feelsLike}`);
    $(".unit_time-weather:nth-child(3) > span").html(`${tempMin}`);
    $(".unit_time-weather:nth-child(4) > span").html(`${tempMax}`);
    $(".unit_time-weather:last > span").html(`${clouds}`);

    initMap(data.coord, CityName);
  });
}

function CityInfoChange() {
  // 서울 1835847 도쿄 1850144 워싱턴 2634715 베이징 1816670 앙카라 323784
  $(".add_btns .btn").on("click", function () {
    WeatherInfoOpen($(this).val());
  });
}

function FadeIn() {
  $(".mini_weather h4").stop().css("opacity", "0");
  $(".mini_weather__Temperature").stop().css("opacity", "0");
  $(".mini_weather__info").stop().css("opacity", "0");

  $(".unit_time-weather > span").stop().css("opacity", "0");
  $(".eather_imge img").stop().css("opacity", "0");

  let times = 300;
  $(".mini_weather h4").animate({ opacity: "1" }, times, function () {
    $(".mini_weather__Temperature").animate(
      { opacity: "1" },
      times,
      function () {
        $(".mini_weather__info").animate({ opacity: "1" });
      }
    );
  });

  $(".unit_time-weather:first > span")
    .stop()
    .animate({ opacity: "1" }, times, () => {
      $(".unit_time-weather:nth-Child(2) > span").animate(
        { opacity: "1" },
        times,
        () => {
          $(".unit_time-weather:nth-Child(3) > span").animate(
            { opacity: "1" },
            times,
            () => {
              $(".unit_time-weather:nth-Child(4) > span").animate(
                { opacity: "1" },
                times,
                () => {
                  $(".unit_time-weather:last span").animate(
                    { opacity: "1" },
                    times,
                    () => {
                      $(".eather_imge img").animate({ opacity: "1" });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
}

function Translation(id) {
  let CityName = id;

  $(".add_btns .btn").each(function () {
    FadeIn();

    switch (id) {
      case "Seoul":
        CityName = "서울";
        break;
      case "Tokyo":
        CityName = "도쿄";
        break;
      case "Washington":
        CityName = "워싱턴";
        break;
      case "Beijing":
        CityName = "베이징";
        break;
      case "Ankara Province":
        CityName = "앙카라";
        break;
    }

    return CityName;
  });

  return CityName;
}

function DegconConversionDir(deg) {
  let Dir = "";
  if (deg > 337.5 || deg <= 22.5) {
    Dir = "북풍";
  } else if (deg > 22.5 && deg <= 67.5) {
    Dir = "북동풍";
  } else if (deg > 67.5 && deg <= 112.5) {
    Dir = "동풍";
  } else if (deg > 112.5 && deg <= 157.5) {
    Dir = "남동풍";
  } else if (deg > 157.5 && deg <= 202.5) {
    Dir = " 남풍";
  } else if (deg > 202.5 && deg <= 247.5) {
    Dir = "남서풍";
  } else if (deg > 247.5 && deg <= 292.5) {
    Dir = "서풍";
  } else if (deg > 292.5 && deg <= 337.5) {
    Dir = "북서풍";
  }

  return Dir;
}

function initMap(Pos, name) {
  let MapElement = document.getElementById("map");

  let MyPos = {
    lat: Pos.lat,
    lng: Pos.lon,
  };

  let MapOptions = {
    center: MyPos,
    zoom: 10,
    minZoom: 4,
    maxZoom: 10,
  };

  let map = new google.maps.Map(MapElement, MapOptions);
  let infoWindow = new google.maps.InfoWindow({ content: name });

  let MarKerInfo = {
    map: map,
    position: MyPos,
  };

  let Marker = new google.maps.Marker(MarKerInfo);

  google.maps.event.addListener(Marker, "click", (e) =>
    infoWindow.open(map, Marker)
  );
}
const CityId = "1835847";
WeatherInfoOpen(CityId);
CityInfoChange();
