// kalkulator.js - Perhitungan dari html Kalkulator Nilai
// Nama: Ni Nyoman Sutriani | NIM: 202432037

// Fungsi 1: Hitung Nilai Akhir (Tugas 30%, UTS 30%, UAS 40%)
function hitungNilaiAkhir(tugas, uts, uas) {
  return parseFloat(((tugas * 0.3) + (uts * 0.3) + (uas * 0.4)).toFixed(2));
}

// Fungsi 2: Tentukan Grade (A>=80, B>=70, C>=60, D>=50, E=lainnya)
function tentukanGrade(nilai) {
  if (nilai >= 80) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 60) return 'C';
  if (nilai >= 50) return 'D';
  return 'E';
}

// Fungsi 3: Validasi Input (tidak boleh kosong, bukan angka, atau di luar 0-100)
function validasiInput(nilai, nama) {
  if (nilai === '') return `Nilai ${nama} tidak boleh kosong.`;
  const num = Number(nilai);
  if (isNaN(num)) return `Nilai ${nama} harus berupa angka.`;
  if (num < 0 || num > 100) return `Nilai ${nama} harus berada dalam rentang 0–100.`;
  return null;
}

// Button Elements
const btnHitung       = document.getElementById('btnHitung');
const inputTugas      = document.getElementById('inputTugas');
const inputUTS        = document.getElementById('inputUTS');
const inputUAS        = document.getElementById('inputUAS');
const errorMsg        = document.getElementById('errorMsg');
const errorText       = document.getElementById('errorText');
const hasilSection    = document.getElementById('hasilSection');
const hasilAngka      = document.getElementById('hasilAngka');
const gradeBadge      = document.getElementById('gradeBadge');
const hasilPlaceholder = document.getElementById('hasilPlaceholder');


window.addEventListener('load', function() {
    const banner = document.getElementById('welcomeBanner');
    
    if (banner) {
        // 1. Munculkan elemen ke dalam alur dokumen
        banner.classList.add('muncul');
        
        // 2. Beri jeda sangat singkat agar browser merender display:block sebelum memulai transisi opacity
        setTimeout(() => {
            banner.classList.add('animasi-masuk');
        }, 50);
        
        // 3. Hilangkan otomatis setelah 4 detik (4000 ms)
        setTimeout(() => {
            banner.classList.remove('animasi-masuk'); // Mulai fade-out
            
            // Hapus ruangnya dari halaman setelah animasi fade-out selesai
            setTimeout(() => {
                banner.classList.remove('muncul');
            }, 500); 
        }, 4000);
    }
});

// Event Listener Tombol Hitung
btnHitung.addEventListener('click', function () {
  const rawTugas = inputTugas.value.trim();
  const rawUTS   = inputUTS.value.trim();
  const rawUAS   = inputUAS.value.trim();

  console.log('[DEBUG] Input mentah:', { tugas: rawTugas, uts: rawUTS, uas: rawUAS });

  const error = validasiInput(rawTugas, 'Tugas') || validasiInput(rawUTS, 'UTS') || validasiInput(rawUAS, 'UAS');

  if (error) {
    errorText.textContent = error;
    errorMsg.classList.add('show');
    hasilSection.classList.remove('show');
    hasilPlaceholder.style.display = 'block';
    return;
  }

  errorMsg.classList.remove('show');

  const nilaiAkhir = hitungNilaiAkhir(Number(rawTugas), Number(rawUTS), Number(rawUAS));
  const grade      = tentukanGrade(nilaiAkhir);

  console.log('[DEBUG] Hasil:', { nilaiAkhir, grade });

  hasilAngka.textContent = nilaiAkhir;
  gradeBadge.className   = `grade-badge grade-${grade}`;
  gradeBadge.textContent = grade;

  hasilPlaceholder.style.display = 'none';
  hasilSection.classList.add('show');
});
