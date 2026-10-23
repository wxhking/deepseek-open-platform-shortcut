# DeepSeek 开放平台快捷入口

一个轻量的 Chrome Manifest V3 扩展，为 DeepSeek 网页端添加通往 DeepSeek 开放平台的快捷入口。

[English](#english)

## 功能

- 在 `chat.deepseek.com` 左下角账户菜单中，在“下载手机应用”上方添加独立的“开放平台”菜单项。
- 点击新菜单项打开 `https://platform.deepseek.com/`。
- 点击侧栏左上角 DeepSeek 标志也打开 `https://platform.deepseek.com/`。
- 保留“下载手机应用”等其他账户菜单项的原有功能。
- <img width="252" height="256" alt="image" src="https://github.com/user-attachments/assets/62644d44-bfaf-4f0e-ad75-b4945cf81cd0" />


## 安装

1. 从 [Releases](../../releases) 下载 ZIP 并解压，或克隆本仓库。
2. 在 Chrome 打开 `chrome://extensions`，开启“开发者模式”。
3. 选择“加载已解压的扩展程序”，并选择包含 `manifest.json` 的项目目录。
4. 打开或刷新 [DeepSeek 网页端](https://chat.deepseek.com/)，点击左下角账户头像查看菜单。

更新时，在扩展管理页点击扩展卡片上的刷新按钮，然后刷新 DeepSeek 网页端。

## 权限与隐私

扩展仅匹配 `https://chat.deepseek.com/*`，没有申请额外的 Chrome 权限，不收集或发送数据。脚本只在页面上添加菜单入口、处理其导航，并为 DeepSeek 标志设置导航目标。

## 开发与检查

扩展没有构建步骤或第三方运行时依赖。修改后可在 `chrome://extensions` 重新加载，并在 DeepSeek 网页端手动检查账户菜单与链接行为。

## 许可

本项目采用 MIT License，见 [LICENSE](LICENSE)。

## English

A lightweight Chrome Manifest V3 extension that adds shortcuts to the DeepSeek Open Platform.

### Features

- Adds a separate “开放平台” (Open Platform) item above “下载手机应用” (Download mobile app) in the account menu on `chat.deepseek.com`.
- The new menu item opens `https://platform.deepseek.com/`.
- The DeepSeek mark at the top of the sidebar also opens the platform.
- Other account menu items retain their existing behavior.
- <img width="252" height="256" alt="image" src="https://github.com/user-attachments/assets/a271c700-f068-41fe-9ef1-2788315da37d" />


### Install

1. Download and extract a ZIP from [Releases](../../releases), or clone this repository.
2. Open `chrome://extensions` and enable Developer mode.
3. Select **Load unpacked** and choose the project directory containing `manifest.json`.
4. Open or refresh [DeepSeek](https://chat.deepseek.com/) and use the account avatar menu.

To update, reload the extension on the extensions page and refresh DeepSeek.

### Permissions and privacy

The extension matches only `https://chat.deepseek.com/*`, requests no additional Chrome permissions, and does not collect or transmit data. Its content script adds the menu shortcut and routes the specified clicks.

### License

MIT. See [LICENSE](LICENSE).
