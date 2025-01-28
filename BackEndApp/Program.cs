using Microsoft.EntityFrameworkCore;
using BackendApp.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;  // Adicione esta linha para o ServerVersion

var builder = WebApplication.CreateBuilder(args);

// Adicionando DbContext com MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

var app = builder.Build();
app.MapControllers();
app.Run();
