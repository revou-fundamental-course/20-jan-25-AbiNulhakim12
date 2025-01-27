document.addEventListener("DOMContentLoaded", function () {
  const hitungButton = document.querySelector(".Bg-Biru");
  const resetButton = document.querySelector(".Bg-Hitam");
  const beratBadanInput = document.getElementById("berat-badan-input");
  const usiaInput = document.getElementById("usia-input");
  const tinggiBadanInput = document.getElementById("tinggi-badan-input");
  const hasilBmiSpan = document.getElementById("Hasil-bmi");
  const resultTitle = document.getElementById("result-title");
  const resultDesc = document.getElementById("result-desc");
  const riskList = document.getElementById("list-risk");

  const BMI_CATEGORIES = {
    UNDERWEIGHT: "Kekurangan Berat Badan",
    NORMAL: "Normal",
    OVERWEIGHT: "Berat Badan Lebih",
    OBESITY: "Obesitas",
  };

  function getDiseases(status) {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
      return [
        "Kekurangan gizi",
        "Gangguan pertumbuhan",
        "Sistem kekebalan tubuh lemah",
        "Gangguan kesuburan",
      ];
    } else if (status === BMI_CATEGORIES.NORMAL) {
      return ["Tidak ada"];
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
      return [
        "Diabetes Tipe 2",
        "Serangan Jantung",
        "Hipertensi",
        "Gastroesophageal Reflux Disease",
        "Osteoarthritis",
        "Kanker",
        "Kolesterol Tinggi",
      ];
    } else if (status === BMI_CATEGORIES.OBESITY) {
      return [
        "Penyakit Jantung",
        "Stroke",
        "Kanker",
        "Masalah Pencernaan",
        "Sleep Apnea",
        "Osteoarthritis",
      ];
    }
    return [];
  }

  function updateRiskList(status) {
    const diseases = getDiseases(status);
    riskList.innerHTML = "";
    diseases.forEach((disease) => {
      const listItem = document.createElement("li");
      listItem.innerText = disease;
      riskList.appendChild(listItem);
    });
  }

  function hitungBMI() {
    const berat = parseFloat(beratBadanInput.value);
    const tinggiCm = parseFloat(tinggiBadanInput.value);
    const tinggiM = tinggiCm / 100;

    if (isNaN(berat) || isNaN(tinggiM) || tinggiM <= 0) {
      alert("Harap masukkan data yang valid!");
      return;
    }

    const bmi = (berat / (tinggiM * tinggiM)).toFixed(1);
    hasilBmiSpan.textContent = bmi;

    let status;
    if (bmi < 18.5) {
      status = BMI_CATEGORIES.UNDERWEIGHT;
      resultTitle.textContent = status;
      resultDesc.textContent = "Anda berada di bawah berat badan ideal.";
    } else if (bmi < 24.9) {
      status = BMI_CATEGORIES.NORMAL;
      resultTitle.textContent = status;
      resultDesc.textContent = "Anda memiliki berat badan ideal.";
    } else if (bmi < 29.9) {
      status = BMI_CATEGORIES.OVERWEIGHT;
      resultTitle.textContent = status;
      resultDesc.textContent = "Anda memiliki berat badan berlebih.";
    } else {
      status = BMI_CATEGORIES.OBESITY;
      resultTitle.textContent = status;
      resultDesc.textContent = "Anda berada pada kategori obesitas.";
    }

    // Update risk list based on BMI status
    updateRiskList(status);
  }

  function resetForm() {
    beratBadanInput.value = "";
    usiaInput.value = "";
    tinggiBadanInput.value = "";
    hasilBmiSpan.textContent = "0";
    resultTitle.textContent = "";
    resultDesc.textContent = "";
    riskList.innerHTML = ""; // Clear the risk list
  }

  hitungButton.addEventListener("click", function (event) {
    event.preventDefault();
    hitungBMI();
  });

  resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm();
  });
});
