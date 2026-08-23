# curl 测试 API Key

要求 curl 8+。先在根目录 `.env` 中填写 `MODB_API_KEY`、`MODB_BASE_URL` 和 `MODB_MODEL`。

macOS/Linux/WSL：

```bash
set -a && source ../.env && set +a
./chat-completion.sh
```

Windows PowerShell：

```powershell
Get-Content ..\.env | ForEach-Object {
  if ($_ -match '^(?<name>[^#=]+)=(?<value>.*)$') { [Environment]::SetEnvironmentVariable($Matches.name, $Matches.value) }
}
.\chat-completion.ps1
```

脚本使用 `--fail-with-body`、连接超时和总超时；返回非 2xx 时会直接失败。

需要观察 SSE 流式输出时，在 macOS/Linux/WSL 中运行：

```bash
./streaming.sh
```

来源回链：[curl 接入教程](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_curl)
