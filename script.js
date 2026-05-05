const url = "https://script.google.com/macros/s/AKfycbxTOjTpLaDrGAHeWEmtTEFj2mFiAEBHT4NI8ecaL1Ej5jsKEh_9Oenm6QZlvuP3Stfo/exec";

const bahan = [
"ayam","tahu","tulang","saus_tiram","minyak_wijen","tepung_tapioka",
"gula","garam","kaldu_bubuk","lada_bubuk","telur","kecap_asin",
"kulit_lumpia","kulit_pangsit","tepung_terigu","air_mineral",
"minyak_goreng","daun_bawang","kencur","cabe_merah","cabe_besar",
"cabe_merah_keriting","bawang_merah","bawang_putih",
"kemasan_brownies_s","kemasan_brownies_m","kemasan_mika",
"kemasan_paper_bowl","garpu_mini","sendok_bebek","plastik_tikus",
"plastik_klip","cup_saus","saus_bangkok","saus_keju",
"saus_hot_lava","chili_oil","bubuk_keju","bubuk_krimer",
"piping_bag","sarung_tangan","plastik_kresek",
"sabun_cuci_piring","trashbag"
];

// =======================
// SWITCH FORM
// =======================

function showForm(type){
  const container = document.getElementById("form-container");
  container.innerHTML = "";

  bahan.forEach(item => {
    let div = document.createElement("div");
    div.className = "item";

    if(type === "pengadaan"){
      div.innerHTML = `
        <label>${item}</label>
        <input type="number" id="${item}_qty" placeholder="Qty">
        <input type="number" id="${item}_harga" placeholder="Harga">
      `;
    } else {
      div.innerHTML = `
        <label>${item}</label>
        <input type="number" id="${item}" placeholder="Qty">
      `;
    }

    container.appendChild(div);
  });

  let btn = document.createElement("button");
  btn.innerText = "Simpan";

  if(type === "pengadaan"){
    btn.onclick = kirimPengadaan;
  } else {
    btn.onclick = kirimPenggunaan;
  }

  container.appendChild(btn);
}


// =======================
// SEARCH
// =======================

document.getElementById("search").addEventListener("keyup", function(){
  let keyword = this.value.toLowerCase();
  let items = document.querySelectorAll(".item");

  items.forEach(item => {
    let text = item.innerText.toLowerCase();
    item.style.display = text.includes(keyword) ? "flex" : "none";
  });
});


// =======================
// SUBMIT
// =======================

function kirimPengadaan(){

let data = { sheet: "Pengadaan Bahan" };

bahan.forEach(item => {
  data[item+"_qty"] = document.getElementById(item+"_qty")?.value || 0;
  data[item+"_harga"] = document.getElementById(item+"_harga")?.value || 0;
});

fetch(url, {
method: "POST",
body: new URLSearchParams(data)
})
.then(res => res.text())
.then(res => alert(res))
.catch(err => alert("Error: " + err));
}

function kirimPenggunaan(){

let data = { sheet: "Penggunaan Bahan" };

bahan.forEach(item => {
  data[item] = document.getElementById(item)?.value || 0;
});

fetch(url, {
method: "POST",
body: new URLSearchParams(data)
})
.then(res => res.text())
.then(res => alert(res))
.catch(err => alert("Error: " + err));
}


// default load
showForm("pengadaan");