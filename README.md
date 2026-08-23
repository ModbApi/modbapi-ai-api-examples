# Modb API AI API Examples

可运行的 Python、Node.js、Java 和 curl 示例，演示如何调用 OpenAI 兼容的 AI API。示例仓库本身可以独立使用：你可以替换 `MODB_BASE_URL` 和 `MODB_API_KEY`，接入任何兼容 OpenAI Chat Completions 协议的服务。

目标是让你在 5 分钟内完成一次真实请求，而不是把 README 做成广告页。

## 30 秒开始

要求：一个可用的 API Key、一个服务支持的模型名称，以及 Python 3.10+、Node.js 20+、JDK 17+ 或 curl 8+ 中的任意一种环境。

```bash
git clone https://github.com/QuantumNous/modbapi-ai-api-examples.git
cd modbapi-ai-api-examples
cp .env.example .env
```

编辑 `.env`，填写真实的 `MODB_API_KEY` 和模型名。不要把 `.env` 提交到 Git。

如果使用 Modb API，可以从[快速开始文档](https://help.modbapi.com/quick-start/?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_root)注册、创建 Key，并查看模型列表。也可以直接查看[抖音专属接入页](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_root)。

## 示例目录

| 目录 | 环境 | 入口 |
| --- | --- | --- |
| [`python/`](./python/) | Python 3.10+、OpenAI SDK | [Python 教程](./python/README.md) |
| [`nodejs/`](./nodejs/) | Node.js 20+、原生 fetch | [Node.js 教程](./nodejs/README.md) |
| [`java/`](./java/) | JDK 17+、Maven | [Java 教程](./java/README.md) |
| [`curl/`](./curl/) | curl 8+、Bash 或 PowerShell | [curl 教程](./curl/README.md) |

所有示例都从环境变量读取配置，默认请求非流式响应；Python、Node.js 和 curl 额外提供流式示例。

## 接口约定

```text
Base URL: https://modbapi.com/v1
Endpoint: POST /chat/completions
认证: Authorization: Bearer $MODB_API_KEY
```

模型名称以服务端的模型列表为准：

```bash
curl --fail-with-body --max-time 30 "$MODB_BASE_URL/models" \\
  -H "Authorization: Bearer $MODB_API_KEY"
```

不要在脚本中写死模型、Key、额度或价格。模型和计费规则会变化，请以实时文档和控制台为准。

## 常见错误

| 状态 | 常见原因 | 排查 |
| --- | --- | --- |
| `401` | Key 缺失、前缀错误或已失效 | 检查 `Authorization: Bearer ...`，确认 Key 未包含多余空格，并在控制台重新生成 |
| `429` | 速率限制、额度不足或上游繁忙 | 降低并发，检查余额和 Key 配额，按 `Retry-After` 等待后重试 |
| `400` | 请求字段或模型名不正确 | 先调用 `/models`，确认 `model`、`messages` 和 JSON 格式 |
| `404` | Base URL 重复包含 `/v1` 或路径错误 | Base URL 只保留到 `/v1`，不要再拼接 `/v1/v1` |
| 超时 | 网络、上游响应时间或客户端超时过短 | 使用示例中的超时设置，记录 Request ID 后再联系服务方 |

## 安全边界

- 只提交 `.env.example`，不要提交 API Key、支付信息、用户数据或生产日志。
- 示例设置了有限的 `max_tokens` 和请求超时；生产环境应根据业务增加重试退避、审计和成本控制。
- 不要在 Issue 或截图中公开完整 Key、Cookie、Request ID 对应的敏感内容或用户提示词。
- 需要排障时，请提供语言版本、HTTP 状态码、脱敏后的错误信息和最小复现步骤。

## 文档和反馈

- [Modb API 帮助中心](https://help.modbapi.com/?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_root)
- [API 接入落地页](https://modbapi.com/douyin?utm_source=github&utm_medium=organic&utm_campaign=opensource_examples&utm_content=readme_root)
- [贡献指南](./CONTRIBUTING.md)
- [安全披露](./SECURITY.md)

## 许可证

示例代码以 MIT License 发布，详见 [`LICENSE`](./LICENSE)。第三方 SDK 仍遵循其各自许可证。
