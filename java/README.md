# Java 调用 AI API

要求 JDK 17+ 和 Maven 3.9+。示例只使用 JDK 内置 `java.net.http.HttpClient`，不依赖第三方 HTTP SDK。

```bash
cd java
cp ../.env.example ../.env
set -a && source ../.env && set +a       # Windows 请在 PowerShell 中设置同名环境变量
mvn -q compile exec:java
```

程序会打印 HTTP 状态码和响应 JSON。生产环境请使用 JSON 库解析响应、记录脱敏后的 Request ID，并为重试设置指数退避。

来源回链：[Java 接入教程](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_java)
