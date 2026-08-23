# 贡献指南

感谢贡献。请先创建 Issue 说明要修复的问题或新增的语言，再提交 Pull Request。

## 提交前检查

```bash
python -m py_compile python/*.py
node --check nodejs/chat-completion.mjs
node --check nodejs/streaming.mjs
(cd java && mvn -q -DskipTests compile)
bash -n curl/chat-completion.sh
bash -n curl/streaming.sh
```

请用全新虚拟环境或临时目录按对应 README 运行一次。提交内容不得包含 `.env`、真实 API Key、支付信息、用户数据或生产日志。模型名称、价格和可用性以实时文档为准，不要在示例中宣称无法验证的 SLA 或官方关系。
