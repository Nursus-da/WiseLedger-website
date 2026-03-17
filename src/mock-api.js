const STORAGE_KEY = "kakeibofin-transactions";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSavedTransactions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTransactions(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const KakeiboAPI = {
  async getTransactions() {
    await delay(300);
    return getSavedTransactions();
  },
  async addTransaction(transaction) {
    await delay(300);
    const all = getSavedTransactions();
    const id = Date.now();
    const next = [...all, { id, ...transaction }];
    saveTransactions(next);
    return { id, ...transaction };
  },
  async deleteTransaction(id) {
    await delay(300);
    const next = getSavedTransactions().filter((item) => item.id !== id);
    saveTransactions(next);
    return true;
  },
};

// Inisialisasi sample jika kosong
if (getSavedTransactions().length === 0) {
  saveTransactions([
    {
      id: 1,
      type: "expense",
      category: "Kebutuhan",
      description: "Beli stok bahan baku",
      amount: 420000,
      date: "2026-03-01",
    },
    {
      id: 2,
      type: "income",
      category: "Penjualan",
      description: "Omzet marketplace",
      amount: 1200000,
      date: "2026-03-02",
    },
  ]);
}
