using AuthAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMvc();
builder.Services.AddSession(configurator =>
{
    configurator.IdleTimeout = TimeSpan.FromHours(1);
});

builder.Services.AddCors((options) =>
{
    options.AddPolicy(name: "AngularApp", (policy) =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    });
});


builder.Services.AddSingleton<MongoDbService>();

var app = builder.Build();

app.UseCors(policyName:"AngularApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseSession();

app.MapControllers();

app.Run();
