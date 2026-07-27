// ============================================================
//  QUẢN LÝ VẬT TƯ BOM — Desktop wrapper (Electron)
// ============================================================
//  App này KHÔNG chạy code React cục bộ — nó chỉ mở đúng trang
//  web đã deploy trên Vercel bên trong 1 cửa sổ desktop riêng,
//  không có thanh địa chỉ / tab trình duyệt, giống 1 app thật.
//
//  ⚠️ SỬA DÒNG APP_URL BÊN DƯỚI thành đúng địa chỉ web thật của bạn
//  trước khi build (ví dụ: https://kimlong-jfco.vercel.app)
// ============================================================
const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const APP_URL = "https://linhkienminibus-jfco.vercel.app"; // ✅ URL thật

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 380,
    minHeight: 600,
    title: "Quản Lý Vật Tư BOM",
    backgroundColor: "#0f172a",
    icon: path.join(__dirname, "icon.ico"), // 👈 logo Kim Long Motor làm icon cửa sổ/taskbar
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true, // ẩn menu File/Edit/View mặc định của Electron
  });

  win.loadURL(APP_URL);

  // Mở link ngoài (nếu có) bằng trình duyệt mặc định thay vì trong app
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Bỏ hẳn menu bar cho gọn (không còn File/Edit/View/Window/Help)
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
