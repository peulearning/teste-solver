using Microsoft.EntityFrameworkCore;
using BackendApp.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using BackendApp.Repositories;
using BackendApp.Services;

var builder = WebApplication.CreateBuilder(args);




// Adicionando DbContext com MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Adicionando serviços e repositórios
builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();

builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IItemService, ItemService>();


// Adicionando CORS para permitir qualquer origem, método e cabeçalho
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin() // Permitir qualquer origem
               .AllowAnyMethod() // Permitir qualquer método
               .AllowAnyHeader()); // Permitir qualquer cabeçalho
});

// Adicionando controllers
builder.Services.AddControllers();

var app = builder.Build();

// Configurando o pipeline de requisição
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Habilitando CORS para todas as requisições
app.UseCors("AllowAll");

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
