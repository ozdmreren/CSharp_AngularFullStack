using Amazon.SecurityToken.Model;
using AuthAPI.Models.Entities;
using AuthAPI.Models.ViewModels;
using AuthAPI.Services;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using ProductAPI.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<User> _userCollection;
        private readonly SymmetricSecurityKey _key;
        public UserController(MongoDbService mongoDbService,IConfiguration configuration)
        {
            _mongoDbService = mongoDbService;
            _configuration = configuration;
            _userCollection = _mongoDbService.GetCollection<User>();
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
        }
        [HttpPost("register")]
        public async Task<IActionResult> CreateUserController(CreateUserVM model)
        {
            User newUser = new User()
            {
                Username = model.Username,
                Email = model.Email,
                CreatedDate = DateTime.UtcNow,
                UserType = Enums.UserType.USER,
            };

             User user = await(await _userCollection.FindAsync((filter) => filter.Email == newUser.Email)).FirstOrDefaultAsync();

            if (user is not null)
            {
                return BadRequest("This email already used");
            }

            //SecureString class'ı kullanılabilir
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
            newUser.HashedPassword = hashedPassword;
            await _userCollection.InsertOneAsync(newUser);
            return Ok(newUser);
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginController(LoginUserVM model)
        {
            User? user = await(await _userCollection.FindAsync((filter) => filter.Email == model.Email)).FirstOrDefaultAsync();
            bool comparedPassword = BCrypt.Net.BCrypt.Verify(model.Password, user.HashedPassword);
            if (user is null)
            {
                return BadRequest(error: "There is no such a user");
            }
            if (comparedPassword)
            {
                string token = CreateToken(model);
                return Ok(token);
            }
            return BadRequest("Invalid email or password");
        }

        [HttpGet("currentUser/{id}")]
        public async Task<IActionResult> GetUserController(string id)
        {
            User? user = await(await _userCollection.FindAsync((filter) => filter.Id == id)).FirstOrDefaultAsync();
            if(user is null)
            {
                return BadRequest(error: "User not found");
            }
            return Ok(user);
        }

        [HttpPost("token")]
        public async Task<IActionResult> ConfirmToken([FromBody]Token token)
        {
            if(token is null)
            {
                return StatusCode(statusCode: 0);
            }
            var claims = DecodeToken(token.tokenName);
            foreach (var claim in claims.Claims)
            {
                Console.WriteLine(claim);
            }
            string emailClaim = claims.Claims.FirstOrDefault().Value;
            User? user = await(await _userCollection.FindAsync((filter) => filter.Email == emailClaim)).FirstOrDefaultAsync();
            if (user is null)
            {
                return BadRequest(error: "User not found");
            }
            CreateUserVM model = new CreateUserVM()
            {
                Username = user.Username,
                Email = user.Email,
                Password = "12345"
            };
            return Ok(model);
        }

        private string CreateToken(LoginUserVM model)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email,model.Email),
                new Claim(ClaimTypes.Hash,model.Password)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private ClaimsPrincipal DecodeToken(string token)
        {
            var handler = new JwtSecurityTokenHandler().ValidateToken(token, validationParameters: new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validated);

            return handler;
        }
    }
}
