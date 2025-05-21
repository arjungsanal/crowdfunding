<div align="center">

# 🌟 CrestFunding - Decentralized Crowdfunding Platform

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.x-363636)](https://soliditylang.org/)

A blockchain-based crowdfunding platform enabling transparent and decentralized fundraising campaigns.

🔗 [Live Demo](https://crestfunding.vercel.app) • [Features](#features) • [Prerequisites](#prerequisites) • [Setup](#local-development-setup) • [Contributing](#contributing)

</div>

---

## 🚀 Features

- ✨ Create and manage fundraising campaigns
- 🔐 Secure authentication system
- 👑 Admin dashboard for campaign approval
- 📊 Real-time campaign tracking
- ⛓️ Blockchain-based transparent transactions
- 📱 Responsive design for all devices

## 🛠️ Technologies Used

<details>
<summary>Frontend Stack</summary>

- **Next.js 14** - React framework for production
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling
- **Shadcn UI** - For UI components
- **Context API** - For state management
</details>

<details>
<summary>Backend & Blockchain Stack</summary>

- **Thirdweb** - For smart contract deployment and management
- **Solidity** - For smart contract development
- **Supabase** - For database and authentication
- **Ethers.js** - For blockchain interactions
- **Sepolia Testnet** - Ethereum test network
</details>

## 📋 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MetaMask wallet extension
- Git

## 🚀 Local Development Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd crowdfunding
npm install

# Install blockchain dependencies
cd blockchain
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Blockchain Configuration (Sepolia Testnet)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_infura_project_id

# Thirdweb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
NEXT_PUBLIC_THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
```

### 3. Launch Application

1. Connect MetaMask to Sepolia testnet
2. Get test ETH from:
   - [Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
3. Start development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` 🎉

## 📜 Smart Contract

Our `CrestFunding.sol` contract is deployed on Ethereum Sepolia testnet via Thirdweb, featuring:

- 📝 Campaign creation
- 💰 Contribution management
- 🏦 Withdrawal mechanisms
- 📊 Campaign status tracking

### Contract Interaction

View the contract on:
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- Thirdweb dashboard

Requirements:
1. MetaMask connected to Sepolia
2. Sepolia ETH in wallet
3. Use dApp interface for interactions

## 🤝 Contributing

Contributions welcome! See our [Contributing Guidelines](CONTRIBUTING.md).

## 📄 License

[GNU Affero General Public License v3.0](LICENSE) - Making the world more open, one contribution at a time.

---

<div align="center">
Made with ❤️ by the CrestFunding Team
</div>