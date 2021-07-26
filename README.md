## Vite

Web 开发构建工具，快速构建。

```bash
npm init @vitejs/app ${projectName}
cd ${projectName}
npm install
```

启动热部署，部署在`localhost:3000`

```bash
npm run dev
```



### 问题

<a href="https://blog.csdn.net/qq_41499782/article/details/116118683">博客链接</a>

**报错**

```javascript
events.js:288
      throw er; // Unhandled 'error' event

Error: spawn E:\前端学习note\Vuenote\Vue3\project\demo0\node_modules\esbuild\esbuild.exe 
ENOENT
```

**原因**

找不到文件 `esbuild/esbuild.exe` 

**解决**

```bash
node ./node_modules/esbuild/install.js
```



