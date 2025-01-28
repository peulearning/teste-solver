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

builder.Services.AddControllers();

builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();

var app = builder.Build();
app.MapControllers();
app.Run();
