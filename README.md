# Workflow 项目说明

本仓库（workflow）包含一个基于 React + Vite 的前端示例应用（子项目位于 `fitness/`），用于展示一个“健身 / 接待 / 参观 / 测评 / 训练 / 奖励”流程图和对应的详情页面。该项目同时演示了将 Markdown 内容转换为 JSON 并在页面中按模块渲染的工作流。

---

**主要内容**

- 子项目路径：`fitness/`。
- 使用框架：React + Vite（开发服务器）；图表使用 `@xyflow/react`（React Flow 风格的可视化库）。
- 演示功能：流程图页面（FlowChart），接待子流程（ReceptionFlow）以及基于 reception 内容生成的详情页（DetailPage）。
- 提供将 `reception.md` 转为 `reception.json` 的 Python 脚本：`src/pages/reception/md_to_json.py`。

---

**快速开始（前提：已安装 Node.js 与 Python）**

1. 进入子项目目录

```powershell
cd d:\documents\job_file\workflow\fitness
```

2. 安装依赖

```powershell
npm install
```

3. 启动开发服务器

```powershell
npm run dev
```

注意：Windows PowerShell 可能会因执行策略阻止 `npm` 脚本（例如 `npm.ps1`）运行。如果出现类似“无法加载文件 ... 因为在此系统上禁止运行脚本”的错误，请在管理员权限的 PowerShell 中运行：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

或在命令提示符（cmd.exe）中运行 `npm run dev`。

4. 在浏览器中打开由 Vite 给出的本地地址（默认通常是 `http://localhost:5173`）。

---

**如何把 Markdown 转成 JSON**

项目里包含一个示例脚本：

- 脚本位置：`src/pages/reception/md_to_json.py`
- 输入文件：`src/pages/reception/reception.md`
- 输出文件：`src/pages/reception/reception.json`

运行方式（示例）：

```powershell
# 在 fitness 目录下执行
python src/pages/reception/md_to_json.py
# 或者指定解释器路径，例如
C:/Python314/python.exe src/pages/reception/md_to_json.py
```

脚本执行后会在同目录生成 `reception.json`，前端的 `DetailPage` 组件会读取该 json 并渲染每个节点对应的详情页。

---

**路由与页面映射（关键路由）**

- `/` — 主流程图（`FlowChart`）
- `/reception` — 接待一级页面（`pages/reception/Reception.jsx`）
- `/reception/flow` — 接待流程图（`pages/reception/ReceptionFlow.jsx`）
- `/reception/detail/:slug` — 通用详情页（`pages/reception/DetailPage.jsx`），`slug` 示例：`appointment`, `welcome`, `valet`, `registration`, `consultation`, `tour`
- 其它模块：`/tour`, `/assessment`, `/training`, `/reward`

---

**重要文件/目录说明**

- `fitness/src/components/` — 存放主流程和通用组件（如 `FlowChart.jsx`）
- `fitness/src/pages/` — 所有页面按模块拆分的目录（如 `reception/`, `tour/`, `assessment/`, `training/`, `reward/`）
- `fitness/src/pages/reception/` — 接待模块：包含 `ReceptionFlow.jsx`, `ReceptionFlow.css`, `DetailPage.jsx`, `AppointmentArrival.jsx`, `reception.md`, `reception.json`, `md_to_json.py` 等
- `fitness/package.json` — 项目依赖与脚本

---

**开发提示**

- 如果修改 `reception.md`，请重新运行 `md_to_json.py` 生成新的 `reception.json`，以便前端读取更新后的内容。
- 若前端路由或组件名称发生改动，请同时更新 `src/App.jsx` 中的导入与路由配置。
- 如果使用 VS Code，保存文件后 Vite 会自动热加载（HMR），出现导入错误时可尝试重启 dev server。

---

**常见问题**

- 问：点击接待模块没有跳转/出现模块导入错误？
  - 答：请确认 `App.jsx` 中导入的路径指向新的模块目录（例如 `./pages/reception/index` 或具体文件），并确认 `pages/reception/index.js` 正确导出所需组件。

- 问：PowerShell 报 `无法加载文件 ... npm.ps1`？
  - 答：见上面“快速开始”关于执行策略的说明，或在 cmd 中运行 `npm run dev`。

---

**Git 分支管理与合并流程**

为保证多人协作安全与可追溯，建议在本项目采用轻量的分支规范与 Pull Request 流程。下面是推荐的实践与常用命令：

- **主要分支**:
  - `main`：生产就绪分支，仅合并通过评审与 CI 的变更；对外部署或发布使用此分支。
  - `develop`（可选）：日常集成分支，短期内多人协作合并到此分支，再发起 release 到 `main`。（如果团队偏好 Trunk-based，可省略 `develop`，直接基于 `main` 做 feature 分支并经 PR 合并）

- **分支命名**:
  - 功能分支：`feature/<issue>-short-desc`，例如 `feature/reception-detail-page`。
  - 修复分支：`fix/<issue>-short-desc` 或 `bugfix/...`。
  - 热修复（生产紧急修复）：`hotfix/<short-desc>`。
  - 发布分支（可选）：`release/<version>`。

- **PR（Pull Request）流程**:
  1. 在本地基于 `main`（或 `develop`）创建分支并完成开发与本地测试。
  2. 提交到远程分支并打开 PR，PR 描述包含变更目的、截图（如 UI 变更）、回归风险与测试步骤。
  3. 至少 1 位同组开发进行代码审查：语义合理、无明显逻辑缺陷、样式一致、无未处理的 console.log/debug。
  4. CI（如果有）通过后合并。合并策略建议：`Squash and merge`（保留清晰的主分支历史）或 `Merge commit`（保留所有提交历史），团队内部达成一致即可。
  5. 合并后删除远程分支。

- **合并与变基建议**:
  - 若分支较短且不与他人频繁冲突，使用 `rebase`（保持线性历史）可以清理提交：

    ```bash
    git checkout feature/my-feature
    git fetch origin
    git rebase origin/main
    # 解决冲突并 git rebase --continue
    git push --force-with-lease
    ```

  - 若多人协作且希望保留完整历史，可直接使用 `merge`：

    ```bash
    git checkout main
    git pull
    git merge --no-ff feature/my-feature
    git push origin main
    ```

- **常用 git 命令示例**:

  - 创建并推送分支

    ```bash
    git checkout -b feature/reception-detail
    git add .
    git commit -m "feat(reception): add detail page and routing"
    git push -u origin feature/reception-detail
    ```

  - 同步远程变更到本地分支（推荐在提交前执行）

    ```bash
    git fetch origin
    git rebase origin/main
    ```

  - 修复合并冲突（示例）

    ```bash
    # 发生冲突后，编辑冲突的文件，保存并：
    git add <conflicted-file>
    git rebase --continue   # 若在 rebase 中
    # 或
    git commit               # 若在 merge 中
    ```

  - 回滚一个错误的合并（谨慎使用）

    ```bash
    # 创建一个新的 commit，用以撤销某次合并
    git revert -m 1 <merge-commit-hash>
    git push origin main
    ```

- **代码审查清单（建议）**:
  - 功能实现是否满足需求？
  - 是否包含多余的调试代码或 console 日志？
  - 是否有潜在的性能问题或安全隐患？
  - 是否遵循项目代码风格（ESLint / Prettier）？
  - 是否包含必要的测试或手动测试步骤？

- **保护分支（建议在远程仓库设置）**:
  - 强制通过 PR 才能合并到 `main`（禁止直接 push）。
  - 必须通过 CI（若配置）与代码审查（至少 1 位审核者）。

---


**联系方式与下一步**

如需我把 README 内容调整为更详细的部署步骤（Docker、生产构建），或把 README 放入 `fitness/` 子项目而非 workflow 根目录，请告诉我，我可以继续修改。

