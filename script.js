const citys = [
  {
    arbicName: "مكة المكرمة",
    isoName: "Makkah al Mukarramah",
  },
  {
    arbicName: "المدينة المنورة",
    isoName: "Al Madīnah al Munawwarah",
  },
  {
    arbicName: "الشرقية",
    isoName: "Ash Sharqīyah",
  },
  {
    arbicName: "الرياض",
    isoName: "Ar Riyāḑ",
  },
];
ShowTheCity("Ash Sharqīyah", "الشرقية");
let select = document.querySelector(".selectCite");

citys.forEach((city) => {
  let option = document.createElement("option");
  option.value = city.isoName;
  option.textContent = city.arbicName;
  select.appendChild(option);
});

select.addEventListener("change", () => {
  ShowTheCity(select.value, select.options[select.selectedIndex].textContent);
});

function ShowTheCity(city, arabicName) {
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: {
        country: "SA",
        city: city,
      },
    })
    .then(function (response) {
      const date = response.data.data.date.readable;
      const day = response.data.data.date.hijri.weekday.ar;
      timesPrayer = response.data.data.timings;

      // get date
      document.querySelector(".date p").innerHTML = `  ${day} ${date}`;
      document.querySelector(".city h1").innerHTML = arabicName;

      // get Time
      const arayTimeFromApi = [
        timesPrayer.Fajr,
        timesPrayer.Sunrise,
        timesPrayer.Dhuhr,
        timesPrayer.Asr,
        timesPrayer.Maghrib,
        timesPrayer.Isha,
      ];

      let timeDiv = document.querySelectorAll(".time p");
      timeDiv.forEach((time, index) => {
        time.innerHTML = arayTimeFromApi[index];
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
// ShowTheCity(city.isoName);
