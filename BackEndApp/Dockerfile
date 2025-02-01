# Etapa de Build (compilação e publicação)
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo de projeto e restaurar as dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar todos os arquivos e publicar a aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa de Execução (Imagem Base)
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Copiar a aplicação publicada para o contêiner
COPY --from=build /app/out .

# Definir o comando que será executado ao iniciar o contêiner
ENTRYPOINT ["dotnet", "BackendApp.dll"]
