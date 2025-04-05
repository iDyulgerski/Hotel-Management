using hotelManagement.DTOs;
using hotelManagement.models;
using hotelManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace hotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        // Log In Endpoint
        [HttpPost("log-in")]
        public async Task<IActionResult> LogIn([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                var user = await _userService.LogInAsync(userLoginDto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPut("resign/{id}")]
        public async Task<IActionResult> ResignUser(int id)
        {
            try
            {
                await _userService.ResignUserAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("User not found.");
            }
        }

        [HttpPut("hire-again/{id}")]
        public async Task<IActionResult> HireAgainUser(int id)
        {
            try
            {
                await _userService.HireAgainUserAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound("User not found.");
            }
        }


        // POST: api/User/create-user
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] UserCreationDto userDto)
        {
            try
            {
                var user = await _userService.CreateUserAsync(userDto);
                return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            // Check if user exists
            var existingUser = await _userService.GetUserByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            // Update user in the database using service
            var updatedUser = await _userService.UpdateUserAsync(id, user);

            if (updatedUser == null)
            {
                return StatusCode(500, "An error occurred while updating the user.");
            }

            return Ok(updatedUser);
        }
    }
}
