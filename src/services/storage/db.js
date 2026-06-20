const DB_NAME = "expense-tracker";
const DB_VERSION = 1;

let dbPromise;

export function initDb() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        const db = request.result;
        // Schema upgrades are version-gated here so future migrations can add
        // stores/indexes without rewriting existing local user data.
        if (!db.objectStoreNames.contains("categories")) {
          const categories = db.createObjectStore("categories", { keyPath: "id" });
          categories.createIndex("normalizedName", "normalizedName", { unique: true });
          categories.createIndex("isArchived", "isArchived", { unique: false });
        }

        if (!db.objectStoreNames.contains("expenses")) {
          const expenses = db.createObjectStore("expenses", { keyPath: "id" });
          expenses.createIndex("spentAt", "spentAt", { unique: false });
          expenses.createIndex("categoryId", "categoryId", { unique: false });
        }
      };
    });
  }

  return dbPromise;
}

export async function withStore(storeName, mode, operation) {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = operation(store);

    tx.onerror = () => reject(tx.error);
    tx.oncomplete = () => resolve(result);
  });
}

export function getRequestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}