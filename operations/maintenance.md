# 开源项目维护机制

本仓库的示例代码依赖服务端实时返回的模型列表和兼容协议。维护重点是保持示例可运行、文档不漂移、依赖可追踪，并在每次 Release 中留下可复核的环境记录。

## 责任和节奏

| 周期 | 必做事项 | 产出 |
| --- | --- | --- |
| 每个 PR | 运行语法/编译检查，确认无敏感信息和坏链接 | PR 模板中的验证表 |
| 每周 | 查看 Dependabot、运行文档链接检查、抽查 `/models` | 依赖 PR、Issue 或维护记录 |
| 每月 | 使用测试账号完成四种语言的最小请求，复核 UTM 和 README 回链 | 月度验证记录 |
| 每次 Release | 固定环境矩阵验证，记录模型、时间、系统和结果 | Release notes 验证段落 |

## 依赖升级

Dependabot 每周检查 `python/requirements.txt`、`nodejs/package.json`、`java/pom.xml` 和 GitHub Actions。维护者合并前应：

1. 查看上游变更日志和最低运行时要求。
2. 在 CI 中运行现有检查；涉及 SDK 主版本时，额外完成一次真实最小请求。
3. 更新对应 README 的安装命令或版本说明，并在 PR 中写明兼容性影响。
4. 不为了升级依赖而把 Key、模型名或生产配置写入代码。

## 模型列表更新

模型名称以服务端为准，不在仓库维护容易过期的价格或完整模型清单。发现模型变更时：

```bash
curl --fail-with-body --max-time 30 "$MODB_BASE_URL/models" \
  -H "Authorization: Bearer $MODB_API_KEY"
```

维护者将已验证的模型、日期、协议和语言示例写入 Release notes；模型不可用时先更新文档和素材，再发布代码。模型更新 Issue 使用 `.github/ISSUE_TEMPLATE/model-update.yml`，必须提供来源和验证环境。

## Release 验证矩阵

每次发布至少验证以下环境。真实请求使用临时测试账号和短提示词，日志只保留状态码、耗时和脱敏 Request ID。

| 语言 | 最低环境 | 推荐验证环境 | 命令 |
| --- | --- | --- | --- |
| Python | 3.10 | 3.12 | `python chat_completion.py` |
| Node.js | 20 | 20、22 | `node --env-file=../.env chat-completion.mjs` |
| Java | JDK 17 | JDK 17、21 | `mvn -q compile exec:java` |
| curl | 8 | 8 | `./chat-completion.sh` |

Release notes 应包含：版本号、commit、验证日期（UTC）、操作系统、运行时版本、测试模型、非流式/流式结果、是否更新文档链接，以及未执行项目的原因。不要在 Release notes 粘贴 Key、完整响应或用户数据。

## 文档和示例检查

- PR 和每周维护工作流检查 Markdown 外部链接；链接失效先修正文档或开 Issue，不要静默删除入口。
- `ci.yml` 和每周工作流验证 Python 编译、Node 语法、Java 编译和 shell 语法；这些检查不需要凭据。
- 每月人工按 README 在干净环境安装依赖并运行一次真实最小请求。服务端不可用时记录为“未执行”，不能写成通过。
- 变更 Base URL、模型字段、错误处理或流式协议时，同时更新语言 README、抖音脚本和外部 UTM 链路矩阵的对应说明。
