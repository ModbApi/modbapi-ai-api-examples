# Python 调用 AI API

要求 Python 3.10+。

```bash
cd python
python -m venv .venv
source .venv/bin/activate       # Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cp ../.env.example ../.env
```

在根目录 `.env` 中填写 `MODB_API_KEY`、`MODB_BASE_URL` 和服务支持的 `MODB_MODEL`，然后运行：

```bash
python chat_completion.py
python streaming.py
```

示例使用 OpenAI 官方 Python SDK 的兼容接口；Key 只从环境变量读取。

来源回链：[Python 接入教程](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_python)
