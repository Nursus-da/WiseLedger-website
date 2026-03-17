import { KakeiboAPI } from "./mock-api.js";

const loginBtn = document.getElementById("loginBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const registerBtn = document.getElementById("registerBtn");
const transactionSummary = document.getElementById("transactionSummary");

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function showAlert(message) {
  window.alert(message);
}

function renderTransactions(transactions) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  transactionSummary.innerHTML = `
    <h3>Ringkasan Transaksi</h3>
    <p>Total Pemasukan: Rp ${income.toLocaleString("id-ID")}</p>
    <p>Total Pengeluaran: Rp ${expense.toLocaleString("id-ID")}</p>
    <p>Saldo: Rp ${(income - expense).toLocaleString("id-ID")}</p>
    <h4>Catatan Terbaru</h4>
    <ul>${transactions
      .slice(-4)
      .reverse()
      .map(
        (t) =>
          `<li>${t.date} - ${t.category} - Rp ${t.amount.toLocaleString("id-ID")}</li>`,
      )
      .join("")}</ul>
  `;
}

async function loadTransactions() {
  const tx = await KakeiboAPI.getTransactions();
  renderTransactions(tx);
}

loginBtn.addEventListener("click", () =>
  showAlert(
    "Tombol Login WiseLedger diklik. Fitur autentikasi akan ditambahkan di backend.",
  ),
);
getStartedBtn.addEventListener("click", () =>
  showAlert("Arahkan ke registrasi/fitur onboarding WiseLedger."),
);
registerBtn.addEventListener("click", () =>
  showAlert("Arahkan ke form pendaftaran WiseLedger."),
);

const loginBtnMobile = document.getElementById("loginBtnMobile");
if (loginBtnMobile) {
  loginBtnMobile.addEventListener("click", () =>
    showAlert(
      "Tombol Login WiseLedger diklik. Fitur autentikasi akan ditambahkan di backend.",
    ),
  );
}

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  navToggle.classList.toggle("open");
});

[...navLinks.querySelectorAll("a")].forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      navToggle.classList.remove("open");
    }
  });
});

loadTransactions();

// Contoh penggunaan API mock: (Masih prototype) menambahkan transaksi baru saat pengguna membuka halaman
KakeiboAPI.addTransaction({
  type: "expense",
  category: "Keinginan",
  description: "Kopi & branding",
  amount: 68000,
  date: new Date().toISOString().slice(0, 10),
}).then(loadTransactions);
