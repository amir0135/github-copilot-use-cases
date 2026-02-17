# Enterprise-Approved MCP Servers

The following MCP servers are recommended for enterprise use based on their security posture, maintenance status, and organizational backing.

## Microsoft Official MCP Servers

| Server | Description | Use Cases |
|--------|-------------|-----------|
| **Azure MCP** | Official Microsoft Azure integration | Resource management, deployment, monitoring |
| **Azure DevOps MCP** | Azure DevOps services integration | Pipelines, repos, work items, wikis, test plans |
| **Playwright MCP** | Browser automation and testing | Web testing, UI automation, screenshots |
| **Pylance MCP** | Python language intelligence | Code analysis, refactoring, environment management |

## GitHub Official MCP Servers

| Server | Description | Use Cases |
|--------|-------------|-----------|
| **GitHub MCP** | Official GitHub integration | Repository management, issues, PRs, actions |

## Anthropic Reference Implementations

These servers are maintained by Anthropic as reference implementations with high security standards:

| Server | Description | Security Notes |
|--------|-------------|----------------|
| **Filesystem** | Local file system access | Configurable path restrictions |
| **PostgreSQL** | Database connectivity | Read-only by default, parameterized queries |
| **SQLite** | Lightweight database access | Local database operations |
| **Git** | Git repository operations | Version control integration |
| **Fetch** | HTTP/HTTPS requests | URL allow-listing supported |
| **Memory** | Knowledge graph storage | In-memory, no persistence by default |

---

## Enterprise Security Recommendations

### Before Deploying Any MCP Server

1. **Audit the Source Code** - Review the server implementation for security vulnerabilities
2. **Verify Publisher Identity** - Only use servers from verified organizations
3. **Check Maintenance Status** - Ensure active maintenance and security updates
4. **Review Permissions** - Understand what resources the server can access
5. **Enable Logging** - Configure audit logging for compliance
6. **Network Isolation** - Run MCP servers in isolated network segments when possible

### Security Checklist

- [ ] Server is from a verified publisher (Microsoft, Anthropic, GitHub)
- [ ] Source code is publicly auditable
- [ ] Regular security updates are published
- [ ] Follows principle of least privilege
- [ ] Supports authentication/authorization
- [ ] Provides audit logging capabilities
- [ ] Has documented security practices
- [ ] Passed internal security review

---

## MCP Servers to Avoid in Enterprise

⚠️ **Exercise caution with:**

- Unverified community servers without security audits
- Servers requesting excessive permissions
- Servers without active maintenance (>6 months no updates)
- Servers that store credentials in plain text
- Servers without proper input validation

---

## Configuration Best Practices

```json
{
  "mcpServers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp-server"],
      "env": {
        "AZURE_TENANT_ID": "${env:AZURE_TENANT_ID}",
        "AZURE_CLIENT_ID": "${env:AZURE_CLIENT_ID}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/approved/paths/only"]
    }
  }
}
```

> **Note:** Always use environment variables for sensitive configuration. Never hardcode credentials in MCP server configurations.

---

## Resources

- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [Model Context Protocol Specification](https://modelcontextprotocol.io)
- VS Code: Extensions → Search `@mcp`
