# LightningWasm

**LightningWasm** is a static website built with .NET 9 Blazor WebAssembly.  
It serves as the homepage and download/install portal for [IBLightning](https://github.com/BinaryGalaxy1/IBLightning), a CLI tool for automating trading with Interactive Brokers.

---

## 🚀 Features

- Fast, modern static site powered by Blazor WebAssembly (.NET 9).
- Download and install the IBLightning CLI tool.
- Documentation and getting started guides for IBLightning.
- Deployable to any static web host (Cloudflare Pages, Azure Static Web Apps, GitHub Pages, etc.).


---

## 🛠️ Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)  
  (for local development and building the app)

### Building the App

```bash
# Restore dependencies
dotnet restore

# Build the Blazor WebAssembly app (Release mode recommended for deployment)
dotnet publish -c Release -o build
```

The static files for deployment are output to the `build/wwwroot/` folder.

---

## 🌐 Deployment

### Cloudflare Pages

1. **Push to GitHub**: Ensure your code is in a GitHub repository.
2. **Create a Cloudflare Pages Project**:  
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/) and create a new project.
   - Connect your GitHub repository.
   - **Build command:**  
     ```
     dotnet publish -c Release -o build
     ```
   - **Output directory:**  
     ```
     build/wwwroot
     ```
   - (Optional) Set environment variable:  
     ```
     FrameworkPathOverride=/opt/buildhome/.dotnet/shared/Microsoft.NETCore.App/9.0.0
     ```
   - Deploy!

> **Note:** Cloudflare Pages uses Linux build images. If .NET 9 is not available, you may need to pre-build locally and push the contents of `build/wwwroot` to a separate branch for deployment.

---

### Azure Static Web Apps

1. **Push to GitHub**: Ensure your code is in a GitHub repository.
2. **Create a Static Web App**:  
   - Go to [Azure Portal > Static Web Apps](https://portal.azure.com/).
   - Click "Create", link your repo, and follow the wizard.
   - **Build Presets**:  
     - Choose "Blazor" if prompted.
   - **App location**:  
     ```
     .
     ```
   - **Output location**:  
     ```
     build/wwwroot
     ```
   - **API location**:  
     (leave blank unless using Azure Functions)
   - Azure will auto-generate a workflow file for GitHub Actions.
3. **Review and Create**:  
   Finish the setup. Azure will build and deploy your web app automatically.

---

## 📦 Download IBLightning

Find the latest releases and installation instructions for IBLightning on the [IBLightning GitHub page](https://github.com/BinaryGalaxy1/IBLightning).

---

## 🤝 Contributing

Pull requests and issues are welcome!

---

## 📄 License

MIT
