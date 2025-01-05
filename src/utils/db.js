const DB_NAME = 'lovelog_db';
const DB_VERSION = 1;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // メモリーストア（思い出）の作成
      if (!db.objectStoreNames.contains('memories')) {
        const memoriesStore = db.createObjectStore('memories', { keyPath: 'id', autoIncrement: true });
        memoriesStore.createIndex('date', 'date');
      }

      // 日記ストアの作成
      if (!db.objectStoreNames.contains('diaries')) {
        const diariesStore = db.createObjectStore('diaries', { keyPath: 'id', autoIncrement: true });
        diariesStore.createIndex('date', 'date');
      }

      // 相性チェック結果ストアの作成
      if (!db.objectStoreNames.contains('compatibility')) {
        const compatibilityStore = db.createObjectStore('compatibility', { keyPath: 'id', autoIncrement: true });
        compatibilityStore.createIndex('date', 'date');
      }
    };
  });
};

// データの追加
export const addItem = async (storeName, item) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add({ ...item, createdAt: new Date() });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// データの取得（全件）
export const getAllItems = async (storeName) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// データの更新
export const updateItem = async (storeName, id, updates) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => {
      const item = request.result;
      const updatedItem = { ...item, ...updates, updatedAt: new Date() };
      const updateRequest = store.put(updatedItem);
      
      updateRequest.onsuccess = () => resolve(updateRequest.result);
      updateRequest.onerror = () => reject(updateRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
};

// データの削除
export const deleteItem = async (storeName, id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};