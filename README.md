# TrojanAI

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![GSSoC 25](https://img.shields.io/badge/GSSoC-25-orange.svg)

<div align="center">

## **🤖 TrojanAI is a VSCode extension that serves as an open-source clone of GitHub Copilot, equipped with AI agents that autonomously create, edit, and delete files in your workspace. 🚀**

</div>

**Project Admin:** Rajib Salui

---

## 🤝 **Contributing to GSSoC 2025**

<div align="center">

![GSSoC 2025](https://img.shields.io/badge/GirlScript%20Summer%20of%20Code-2025-orange?style=for-the-badge&logo=girlscript)

**🎉 We're excited to be part of GSSoC 2025! 🎉**

</div>

### 🌟 **Why Contribute?**

- 🏆 **Gain Experience** - Work on real-world projects
- 🤝 **Build Network** - Connect with amazing developers
- 📈 **Enhance Skills** - Learn from code reviews and feedback
- 🎯 **Make Impact** - Contribute to open-source ecosystem
- 🏅 **Earn Recognition** - Get featured in our contributors list

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Development](#development)  
- [Architecture](#architecture)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

## About

TrojanAI is designed as an open-source clone of GitHub Copilot, enabling fully autonomous code generation, refactoring, and workspace management through customizable AI agents.

## Features

- 🚀 **Autonomous Code Generation**: Create boilerplate and feature code based on natural language prompts.  
- ✂️ **Intelligent Refactoring**: Edit and optimize existing code with minimal input.  
- 🗑️ **Workspace Management**: Delete or archive files intelligently according to configuration.  
- 🤖 **Customizable Agents**: Configure multiple AI agents with their own roles and permissions.  

## Prerequisites

- Visual Studio Code v1.60 or higher  
- Node.js v14 or higher  
- npm or yarn  
- Gemini API key (or other provider credentials)  

## Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/yourusername/TrojanAI.git
   cd TrojanAI
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build the extension**:  
   ```bash
   npm run build
   ```

4. **Launch in VSCode**:  
   Press `F5` in VSCode to open a new Extension Development Host window.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Run `TrojanAI: Start Session` to activate the agents.
3. Provide a prompt, e.g., "Add unit tests for user authentication module".
4. Watch as TrojanAI edits, creates, or deletes files to fulfill your request.

## Development

To contribute or extend TrojanAI:

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**, ensuring that new code is covered by tests.

3. **Run the test suite**:
   ```bash
   npm test
   ```

4. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Add your message"
   git push origin feature/your-feature
   ```

5. **Open a Pull Request** on GitHub and describe your changes.

## Architecture

TrojanAI is structured around a core agent manager that dispatches tasks to individual AI agents. Each agent:

- Receives a parsed intent from the user prompt.
- Determines target files or directories.
- Uses OpenAI (or compatible) API to generate or modify content.
- Applies changes via VSCode's WorkspaceEdit API.

**Key modules:**

- `src/extension.ts`: Entry point registering commands.
- `src/agentManager.ts`: Dispatches and coordinates agents.
- `src/agents/`: Individual agent implementations.
- `src/utils/`: Helpers for file parsing and diff computation.

## Folder Structure

```
TrojanAI/
├── src/
│   ├── agents/
│   │   ├── createAgent.ts
│   │   ├── editAgent.ts
│   │   └── deleteAgent.ts
│   ├── utils/
│   │   └── fileUtils.ts
│   ├── agentManager.ts
│   └── extension.ts
├── test/
├── package.json
├── tsconfig.json
├── README.md
└── .vscode/
    └── launch.json
```

## Contributing

Contributions are welcome! Please read our Code of Conduct and Contributing Guidelines before submitting a pull request.

## License

This project is licensed under the MIT License. See LICENSE for details.
