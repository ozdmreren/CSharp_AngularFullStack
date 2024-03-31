
using MassTransit;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ProductAPI.Models.Entities;
using ProductAPI.Models.ViewModels;
using ProductAPI.Services;
using Shared;
using Shared.Events;

namespace ProductAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options => options.AddPolicy(name: "AngularApp", policy =>
            {
                policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
            }));

            builder.Services.AddSingleton<MongoDbService>();

            builder.Services.AddMassTransit(configurator =>
            {
                configurator.UsingRabbitMq((context, _configurator) =>
                {
                    _configurator.Host(builder.Configuration["RabbitMQ"]);
                });
            });

            var app = builder.Build();

            app.UseCors(policyName: "AngularApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapPost("/admin/product/post", async(MongoDbService mongoDbService,[FromBody]CreateProductVM model) =>
            {
                try
                {
                    Console.WriteLine("sAAA");
                    Product product = new Product()
                    {
                        InStock = model.InStock,
                        ProductBrand = model.ProductBrand,
                        ProductName = model.ProductName,
                        ProductDescription = model.ProductDescription,
                        ProductCategory = model.ProductCategory,
                        ProductPrice = model.ProductPrice,
                        Images = [.. model.Images]//Images.ToList();
                    };
                    await mongoDbService.CreateProductAsync(product);
                    return Results.Ok(200);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return Results.BadRequest(400);
                }
            });

            app.MapGet("/admin/product/get", async(MongoDbService mongoDbService) =>
            {
                return await mongoDbService.GetProductsAsync();
            });

            app.MapDelete("/admin/product/delete/{productId}", async (MongoDbService mongoDbService,string productId) =>
            {
                try
                {
                    Console.WriteLine(productId + "sAAA");
                    IMongoCollection<Product> productCollection = mongoDbService.GetCollections<Product>();
                    await productCollection.FindOneAndDeleteAsync(proc => proc.ProductId == productId);
                    Console.WriteLine("Product successfully deleted !");
                    return Results.Ok(200);
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return Results.BadRequest(new object[] { 400, ex.Message });
                }
            });

            app.MapPut("admin/product/put", async(MongoDbService mongoDbService, [FromBody]Product updatedProduct) =>
            {
                try
                {
                    Console.WriteLine(updatedProduct.ProductId+" "+updatedProduct.ProductName+" "+updatedProduct.ProductCategory+" "+updatedProduct.ProductDescription);
                    IMongoCollection<Product> productCollection = mongoDbService.GetCollections<Product>();
                    await productCollection.FindOneAndReplaceAsync((filter) => filter.ProductId == updatedProduct.ProductId, updatedProduct);
                    Console.WriteLine("Product successfully replaced !");
                    return Results.Ok(201);
                }catch(Exception ex)
                {
                    Console.WriteLine($"{ex.Message}");
                    return Results.BadRequest(400);
                }
            });

            app.Run();
        }
    }
}
