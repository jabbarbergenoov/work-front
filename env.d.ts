/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    // Добавь сюда другие переменные, если нужно
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
