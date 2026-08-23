# Node.js 调用 AI API

要求 Node.js 20+。示例使用 Node.js 原生 `fetch`，不需要额外运行时依赖。

```bash
cd nodejs
cp ../.env.example ../.env
node --env-file=../.env chat-completion.mjs
node --env-file=../.env streaming.mjs
```

Windows PowerShell 可用同样的 `node --env-file=../.env ...` 命令。先填写根目录 `.env` 中的 `MODB_API_KEY`、`MODB_BASE_URL` 和 `MODB_MODEL`。

来源回链：[Node.js 接入教程](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_nodejs)
